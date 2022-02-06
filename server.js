const express = require("express");
require("colors");
require("dotenv").config({ path: "./app/config/config.env" });
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./app/db/connectdb");
const adminRoutes = require("./app/routes/admin/adminRoutes");
const { errorHandleMiddleware } = require("./app/middlewares/error-handelr");
const { notFounMiddleware } = require("./app/services/errors/not-found");
// express app
const app = express();

//express configeration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set looger
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//middlewares

//mount routes
app.use("/api/v1/admin/", adminRoutes);
//test server
app.get("/test", (req, res) => {
  return res.status(200).send("<h1>Server is looking Good 🏋️🏋️😊</h1>");
});

// catch 404 and forward to error handler
app.use(notFounMiddleware);

// error handler
app.use(errorHandleMiddleware);

//set up PORT
const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    // database connection
    await connectDB();

    const server = app.listen(
      PORT,
      console.log(`server is runing on PORT : ${PORT}..`.cyan)
    );
    //unhandled promis rejections
    //unhundled promis rejection
    process.on("unhandledRejection", (error, promis) => {
      //close server
      console.log(`ERROR::${error}`);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.log(`ERROR::${error}`.gray);
  }
};

start();
