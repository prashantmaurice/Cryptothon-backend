/**
 *
 * This file sets the application level config for different environments.
 *
 * Envs are: test, development and production
 *
 */

var path = require("path"),
  _ = require("lodash"),
  all = {
    common: {

      // Root path of server
      root: path.normalize(__dirname + "/.."),

      baseUrl: "http://localhost:8888",
      downloadDir: __dirname + "/tmp"
    },

    /* Configurations for test environment
     * This will be used fot UT testcase specially for DB testcases
     * so that develop and production DB should not get affected.
     */
    test: {
      env: "test",

      // Server port
      port: 5000,

      // MongoDB connection options
      mongo: {
        uri: "mongodb://localhost/cryptothon",
        options: {
          db: {
            safe: true
          }
        }
      }
    },

    // Configurations for development environment i.e by default
    development: {
      env: "development",

      port: 8888,
      mongo: {
        uri: "mongodb://localhost/cryptothon",
        options: {
          db: {
            safe: true
          }
        }
      },
      logger: {
        logDir: "/var/log/streamingo-server/developer_logs/"
      }
    },

    // Configurations for production environment
    production: {
      env: "production",
      port: 8080,
      mongo: {
        uri: "mongodb://localhost/cryptothon",
        options: {
          db: {
            safe: true
          }
        }
      },
      logger: {
        logDir: "/var/log/streamingo-server/production_logs/"
      }
    }
  };

// Export the config object based on the NODE_ENV
if (process.env.NODE_ENV === "production") {
  module.exports = _.merge(all.common, all.production);
} else if (process.env.NODE_ENV === "test") {
  module.exports = _.merge(all.common, all.test);
} else {
  module.exports = _.merge(all.common, all.development);
}
