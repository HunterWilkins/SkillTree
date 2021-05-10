const express = require("express");
const app = express();
const sequelize = require("./config/connection");
const db = require("./models");
const path = require("path");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/skills", async (req, res) => {
    let skills = await db.Skill.findAll({
        attributes: ["name", "level", "current", "goal"],
        include: [{
            model: db.Category,
            attributes: ["title"]
        }]
    });

    skills.forEach(item => {
        item["current"] = JSON.parse(item["current"]);
        item["goal"] = JSON.parse(item["goal"]);
    });
    res.json(skills);
});

app.get("/api/categories", async (req, res) => {
    let categories = await db.Category.findAll({
        attributes: ["id", "title"],
        order: [
            ["title", "ASC"]
        ]
    });

    res.json(categories);
})

app.post("/api/skill", async (req, res) => {
    let newSkill = await db.Skill.create(req.body);
    res.json(newSkill);
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("App listening on " + PORT);
    });
});