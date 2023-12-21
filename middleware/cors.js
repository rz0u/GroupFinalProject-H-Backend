const Cors = require("cors");

module.exports = (app) => {
  // Use CORS to set various security headers
  app.use(Cors());
};
