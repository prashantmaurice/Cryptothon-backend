/*
 * Utils module for keeping common functions
 */

var fs = require("fs");

module.exports = {

  /*
   * getFormattedDate for getting date in formate YYYY-MM-DD
   * There is no javascript function to generate in this format
   * There are libraries but dont use those.
   *
   * @params = No Params
   */
  getFormattedDate: function () {
    "use strict";

    var date = new Date(),
      mm = date.getMonth() + 1,
      dd = date.getDate();

    mm = mm < 10 ? "0" + mm : mm;
    dd = dd < 10 ? "0" + dd : dd;

    return [date.getFullYear(), mm, dd].join("");
  },

  /*
   * getLogFile to get proper log file for specfic date.
   * @params dirname, Directory path
   */
  getLogFile: function (dirname) {
    "use strict";

    var formattedDate = this.getFormattedDate(),
      filepath = dirname + "debug.log." + formattedDate;

    // Check file exists
    if (fs.existsSync(filepath)) {
      return filepath; // return if exists
    } else {
      fs.writeFile(filepath, "", function (error) { // Create if not exists
        if (error) {
          throw error;
        }
      });

      return filepath;
    }
  }
};
