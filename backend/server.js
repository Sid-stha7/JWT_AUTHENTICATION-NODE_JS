const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const { errorHandler } = require("../middleware/errorMiddleware");
const colors = require("colors");
const connectDB = require("./config/db");

connectDB();
const app = express();

//DB connection

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** since the error handler is middleware we have to use it as middleware so that will replace default 
    express error handler
**/
app.use(errorHandler);

//route
app.use("/api/goals", require("../routes/goalRoutes"));
app.use("/api/users", require("../routes/userRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
