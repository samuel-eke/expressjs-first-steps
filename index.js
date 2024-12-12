const { log } = require("console");
const express = require("express");
const app = express();
const port = 3500 || process.env.PORT;
const path = require("path");
const { logger } = require("./middleware/logevents");
const handleError = require("./middleware/errorHandler");
const cors = require("cors");
const employeeRoutes = require("./routes/api/employees")

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
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public"))); //this line of code, applies the css in the public folder to the routed subdirectory folder as well

app.use("/employees", employeeRoutes);
app.use("/subdir", require("./routes/subdir"));
app.use("/", require("./routes/root"))

app.use(handleError); //custom middleware for handling errors

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
