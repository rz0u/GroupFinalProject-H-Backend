const applyHelmet = require("./helmet");
const applyBodyParser = require("./bodyParser");
const applyCors = require("./cors");
const applyMorgan = require("./morgan");

module.exports = (app) => {
  applyHelmet(app);
  applyBodyParser(app);
  applyCors(app);
  applyMorgan(app);
};
