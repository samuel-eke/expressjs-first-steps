const { logEvents } = require("./logevents");

const handleError = (err, req, resp, next) => {
  logEvents(`${err.name}: ${err.message}`, "errLogs.txt");
  console.log(err.stack);
  resp.status(500).send("Something broke!");
};

module.exports = handleError;
