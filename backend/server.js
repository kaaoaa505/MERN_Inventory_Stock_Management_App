require("dotenv").config();

const Express = require("express");
const CookieParser = require("cookie-parser");
const Cors = require("cors");
const Mongoose = require("mongoose");
const path = require("path");

const ProductRoutes = require("./routes/ProductRoutes");
const UserRoutes = require("./routes/UserRoutes");
const ContactRoutes = require("./routes/ContactRoutes");

const ErrorMiddleware = require("./middlewares/ErrorMiddleware");

const HOST = process.env.HOST || "http://localhost";
const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/BackendDB";

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
// app.use(Cors());
app.use(
  Cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "http://localhost:5001",
      "https://local.host",
    ],
    credentials: true,
  })
);

app.use(CookieParser());

app.use("/uploads", Express.static(path.join(__dirname, "uploads")));

app.use(ProductRoutes);
app.use(UserRoutes);
app.use(ContactRoutes);

app.use(ErrorMiddleware);

app.get("/", (_req, res) => {
  res.send("Home page");
});

Mongoose.connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at port: ${PORT}
            ${HOST}:${PORT}
            `);
    });
  })
  .catch((error) => console.log(error));
