"use strict"; // eslint-disable-line

var express = require("express"),
  router = express.Router(),
  request = require("request"); // eslint-disable-line

function getClientToken(callback) {
	var clientTokenAPIOptions = { method: 'POST',
	  url: 'https://sandbox.unocoin.co/oauth/token',
	  headers: {
	  	'authorization': 'Basic ODZJRzU2OTFISTpjOGQ5OTE5My1kNWM4LTQyODMtOTdmYy04Y2MyODU2ZWUxN2I=',
	    'content-type': 'application/json'
	  },
	  body: { grant_type: 'client_credentials', access_lifetime: '10000' },
	  json: true };

	request(clientTokenAPIOptions, function (error, response, body) {
	  if (error){
	  	throw new Error(error);
	  	callback(error);
	  }
	  callback(null, body.access_token);
	});
}

function getUserToken(clientToken, callback) {
	var signInOptions = {
	  	method: 'POST',
		  url: 'https://sandbox.unocoin.co/api/v1/authentication/signin',
		  headers:
		   {
		     'authorization': 'Bearer ' + clientToken,
		     'content-type': 'application/json' },
		  body:
		   { email_id: 'team75@gmail.com',
		     signinpassword: '76v428b2',
		     response_type: 'code',
		     client_id: '86IG5691HI',
		     redirect_uri: 'http://139.59.216.131/cryptothon/',
		     scope: 'all',
		     signinsecpwd: '999999' },
		  json: true };

	request(signInOptions, function (error, response, body) {
		if (error){
			callback(error);
		}

		var codeToken = body.code;

		var options = { method: 'POST',
			url: 'https://sandbox.unocoin.co/oauth/token',
			headers:
			{
			 'authorization': 'Basic ODZJRzU2OTFISTpjOGQ5OTE5My1kNWM4LTQyODMtOTdmYy04Y2MyODU2ZWUxN2I=',
			 'content-type': 'application/json' },
			body:
			{ code: codeToken,
			 redirect_uri: 'http://139.59.216.131/cryptothon/',
			 grant_type: 'authorization_code',
			 access_lifetime: '10000' },
			json: true };

		request(options, function (error, response, body) {
			if (error) {
				callback(error);
			}

			callback(null, body.access_token);
		});

	});
}

function getPrices(token, callback) {
	var options = { method: 'POST',
	url: 'https://sandbox.unocoin.co/api/v1/general/prices',
	headers:
	{'authorization': 'Bearer ' + token,
	 'content-type': 'application/json' } };

	request(options, function (error, response, body) {
		if (error) callback(error);

		callback(null, JSON.parse(body));
	});
}
// get events
router.get("/", (req, res) => {
	getClientToken(function(error, clientToken){
		if (error) throw new Error(error);

		getUserToken(clientToken, function(error, userToken) {
			if (error) throw new Error(error);
			console.log('bro', userToken);
			res.send(userToken);
		});
	});
});

router.get("/addINR/", (req, res) => {
	getClientToken(function(error, clientToken){
		if (error) throw new Error(error);

		getUserToken(clientToken, function(error, userToken) {
			if (error) throw new Error(error);

			var options = { method: 'POST',
				url: 'https://sandbox.unocoin.co/api/v1/wallet/inr_deposit',
				headers:
				{'authorization': 'Bearer ' + userToken,
				 'content-type': 'application/json' },
				body: { inr_amount: '10000' },
				json: true };

			request(options, function (error, response, body) {
				if (error) throw new Error(error);

				res.send(body);
			});
		});
	});
});

router.get("/getAllTransactions/", (req, res) => {
	getClientToken(function(error, clientToken){
		if (error) throw new Error(error);

		getUserToken(clientToken, function(error, userToken) {
			if (error) throw new Error(error);

			var options = { method: 'POST',
				url: 'https://sandbox.unocoin.co/api/v1/wallet/alltransaction',
				headers:
				{'authorization': 'Bearer ' + userToken,
				 'content-type': 'application/json' },
				json: true };

			request(options, function (error, response, body) {
				if (error) throw new Error(error);

				console.log('body', body);
				res.send({'data': body.transactions, 'success': true, 'error': null});
			});

		});

	});
});

router.get("/sendBitCoins/", (req, res) => {
	getClientToken(function(error, clientToken){
		if (error) throw new Error(error);

		getUserToken(clientToken, function(error, userToken) {
			if (error) throw new Error(error);

			var options = { method: 'POST',
				url: 'https://sandbox.unocoin.co/api/v1/wallet/sendingbtc',
				headers:
				{'authorization': 'Bearer ' + userToken,
				 'content-type': 'application/json' },
				 body: { to_address: 'raj.prudhvi5@gmail.com', "btcamount": "0.0023"},
				json: true };

			request(options, function (error, response, body) {
				if (error) throw new Error(error);

				console.log('data', body)
				res.send({'data': body, 'success': true, 'error': null});
			});

		});

	});
})

router.get("/getUserDetails/", (req, res) => {
	getClientToken(function(error, clientToken){
		if (error) throw new Error(error);

		getUserToken(clientToken, function(error, userToken) {
			if (error) throw new Error(error);

			var options = { method: 'POST',
				url: 'https://sandbox.unocoin.co/api/v1/wallet/profiledetails',
				headers:
				{'authorization': 'Bearer ' + userToken,
				 'content-type': 'application/json' },
				json: true };

			request(options, function (error, response, body) {
				if (error) throw new Error(error);

				res.send({'data': body, 'success': true, 'error': null});
			});

		});

	});
});

router.buyBitCoin = function(val, callback) {
	var bitCoinValue = val;

	bitCoinValue = parseFloat(bitCoinValue);
	console.log('val', bitCoinValue);

	getClientToken(function(error, clientToken){
		if (error) throw new Error(error);

		getUserToken(clientToken, function(error, userToken) {
			if (error) throw new Error(error);

			getPrices(userToken, function(error, result) {
				if (error) throw new Error(error);

				var inr = parseInt(result.buybtc) * bitCoinValue;
				var fee = (parseInt(result.buyfees)/100) * inr;
				var tax = (parseInt(result.buytax)/100) * fee;
				var total = inr + fee + tax;

				var options = { method: 'POST',
					url: 'https://sandbox.unocoin.co/api/v1/trading/buyingbtc',
					headers:
					{'authorization': 'Bearer ' + userToken,
					 'content-type': 'application/x-www-form-urlencoded' },
					form:
					{ destination: 'My wallet',
					 inr: inr.toString(),
					 total: total.toString(),
					 btc: bitCoinValue.toString(),
					 fee: fee.toString(),
					 tax: tax.toString(),
					 rate: result.buybtc } };

				request(options, function (error, response, body) {
					if (error) throw new Error(error);

					body = JSON.parse(body);
					if(body.status_code != 200) {
						console.log("here");
						return callback("error", body);
					}

					var transOpt = { method: 'POST',
						url: 'https://sandbox.unocoin.co/api/v1/wallet/alltransaction',
						headers:
						{'authorization': 'Bearer ' + userToken,
						 'content-type': 'application/json' },
						json: true };

					request(transOpt, function (error, response, body) {
						if (error) throw new Error(error);

							callback(null, {'data': body.transactions[0], 'success': true, 'error': null});
						
					});

				});

			})

		});
	});
};

module.exports = router;
