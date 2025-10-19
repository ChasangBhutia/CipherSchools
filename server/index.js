const express = require("express");
const connectDb = require("./config/db");
const authRoute = require("./routes/authRoute");
const { responseMiddleware } = require("./middlewares/responseMiddleware");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseMiddleware);

const PORT = process.env.PORT || 3000;

connectDb();

app.use("/api/users", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
