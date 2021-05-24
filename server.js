const express = require("express");
const app = express();
const sequelize = require("./config/connection");
const PORT = process.env.PORT || 3001;
const {apiRoutes, htmlRoutes} = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/", htmlRoutes);
app.use("/api/", apiRoutes);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("App listening on " + PORT);
    });
});