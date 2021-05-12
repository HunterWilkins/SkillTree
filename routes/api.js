const router = require("express").Router();
const db = require("../models");

router.get("/skills", async (req, res) => {
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

router.get("/categories", async (req, res) => {
    let categories = await db.Category.findAll({
        attributes: ["id", "title"],
        order: [
            ["title", "ASC"]
        ]
    });

    res.json(categories);
})

router.post("/skill", async (req, res) => {
    let newSkill = await db.Skill.create(req.body);
    res.json(newSkill);
});

module.exports = router;