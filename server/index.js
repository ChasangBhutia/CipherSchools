const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDb = require("./config/db");
const authRoute = require("./routes/authRoute");
const projectRoute = require("./routes/projectRoute");
const fileRoute = require("./routes/fileRoute");
const { responseMiddleware } = require("./middlewares/responseMiddleware");
const isLoggedIn = require("./middlewares/isLoggedIn");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseMiddleware);
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

connectDb();

app.use("/api/users", authRoute);
app.use("/api/projects", isLoggedIn, projectRoute);
app.use("/api/files", isLoggedIn, fileRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
