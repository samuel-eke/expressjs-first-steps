const { log } = require("console");
const express = require("express");
const app = express();
const port = 3500 || process.env.PORT;
const path = require("path");
const { logger } = require("./middleware/logevents");
const handleError = require("./middleware/errorHandler");
const cors = require("cors");

//custom middleware logger
// app.use((req, res, next) => {
//   logEvents(
//     `${req.method} \t${req.headers.origin} \t${req.url}`,
//     "loggedEvents.txt"
//   );

//   log(`the url method is ${req.method} the url is ${req.url}`);
//   next();
// });

app.use(logger);

const whitelist = ["https://www.khanacademy.org", "https://www.google.com"];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//built-in middleware to handle urlencoded data, in other words, form data: 'content-type: application/x-www-f
app.use(express.urlencoded({ extended: false })); //this middleware is used for handling form data. to get data when form is submitted

//builtin middleware for json submitted data
app.use(express.json());

//this is for serving static files
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (request, response) => {
  //   response.send("This is an express application"); //this simple line sends out a response to the user string-level

  //   response.sendFile(path.join(__dirname, "views", "index.htm")); //this line sends out a response to the user with pictures and other static content. this is also how to serve with nodejs

  response.sendFile("/views/index.htm", { root: __dirname });
});

app.get("/new-user", (req, resp) => {
  resp.sendFile(path.join(__dirname, "views", "newuser.html"));
});

//to handle redirect of requests
app.get("/not-user(.html)?", (req, resp) => {
  resp.redirect(301, "/new-user"); //301 is status code for indicating that this is a permanent redirect
});

app.get("/*", (req, resp) => {
  resp.status(404).sendFile(path.join(__dirname, "views", "404.html")); //this serves a custom 404 page for url paths that have not been created
});

app.use(handleError);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
