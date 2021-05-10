const sequelize = require("../config/connection");
const {Skill} = require("../models");
const skillData = [
    {
        name: "Bicep Curls",
        type: "Workout",
        level: 2,
        current: JSON.stringify({weight: 24, reps: 3, sets: 2}),
        goal: JSON.stringify({weight: 30, reps: 4, sets: 3})
    },
    {
        name: "Tricep Curls",
        type: "Workout",
        level: 3,
        current: JSON.stringify({weight: 50, reps: 3, sets: 2}),
        goal: JSON.stringify({weight: 75, reps: 4, sets: 3})
    }
];

sequelize.sync().then(() => {
    Skill.bulkCreate(skillData);
});
