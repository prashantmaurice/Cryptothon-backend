var resp = function (status, error, data) {
  "use strict";
  return {
    success: status,
    error: error,
    data: data
  };
};

exports.r = resp;
