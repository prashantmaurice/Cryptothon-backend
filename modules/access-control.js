module.exports = function (req, res, next) {
  "use strict";

  res.header({

    // Website you wish to allow to connect
    "Access-Control-Allow-Origin": "*",


    // Request methods you wish to allow
    "Access-Control-Allow-Methods":
      "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD",

    // Request headers you wish to allow
    "Access-Control-Allow-Headers":
      "Authorization, Content-Type",

    // Set to true if you need the website to include
    // cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    "Access-Control-Allow-Credentials": true
  });

  if (req.method === "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
};
