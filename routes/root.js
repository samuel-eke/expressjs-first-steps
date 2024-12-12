const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (request, response) => {
  //   response.send("This is an express application"); //this simple line sends out a response to the user string-level

  response.sendFile(path.join(__dirname, "..", "views", "index.htm")); //this line sends out a response to the user with pictures and other static content. this is also how to serve with nodejs

  //   response.sendFile("/views/index.htm", { root: __dirname });
});

router.get("/index(.html)?", (req, resp) => {
  resp.sendFile(path.join(__dirname, "..", "views", "index.htm"));
});

router.get("/new-user(.html)?", (req, resp) => {
  resp.sendFile(path.join(__dirname, "..", "views", "newuser.html"));
});

//to handle redirect of requests
router.get("/not-user(.html)?", (req, resp) => {
  resp.redirect(301, "/new-user"); //301 is status code for indicating that this is a permanent redirect
});

router.get("/*", (req, resp) => {
  resp.status(404).sendFile(path.join(__dirname, "..", "views", "404.html")); //this serves a custom 404 page for url paths that have not been created
});

module.exports = router;
