const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const sequelize = require("./connection/db");

const userRoutes = require("./routes/user.routes");
// const orderRoutes = require("./routes/order.routes");

const authMiddleware = require("./middleware/auth.middleware");

const mainRoutes = require("./routes/index.routes");

const app = express();


app.use(cors());
app.use(express.json());

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//App middleware
app.use(authMiddleware);


app.use('/app', mainRoutes);
// Routes
app.use("/users", userRoutes);
// app.use("/orders", orderRoutes);


sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.SERVER_PORT}`);
  });
});
