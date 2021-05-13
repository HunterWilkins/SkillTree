const router = require("express").Router();
const sequelize = require("sequelize");
const db = require("../models");

router.get("/skills", async (req, res) => {
    let skills = await db.Skill.findAll({
        attributes: ["id","name", "level", "current", "goal", "createdAt"],
        include: [{
            model: db.Category,
            attributes: ["title"]
        }],
        where: {
            UserId: 1
        }
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
});

router.post("/skill", async (req, res) => {
    let newSkill = await db.Skill.create(req.body);
    res.json(newSkill);
});

router.post("/user", async (req, res) => {
    let newUser = await db.User.create(req.body);
    res.json(newUser);
});

router.put("/levelup/:skillId", async (req, res) => {
    console.log(req.body);
    let updatedSkill = await db.Skill.update({
        level: sequelize.literal("level + 1"),
        current: sequelize.literal("goal"),
        goal: JSON.stringify(req.body.newGoal)
    }, {
        where: {
            id: req.params.skillId
        }
    }).catch(err => {
        console.log(err);
        res.json(err)
    });

    res.json(updatedSkill);
});

module.exports = router;