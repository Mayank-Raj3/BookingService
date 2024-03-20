const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./src/config/server-config");

const app = express();
const apiRoutes = require("./src/routes/index");

const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, async () => {
    console.log(`Server Started on Port: ${PORT}`);

    app.use("/api", apiRoutes);

    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
  });
};

prepareAndStartServer();
