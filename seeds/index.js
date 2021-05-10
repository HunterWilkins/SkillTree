const sequelize = require("../config/connection");
const {Skill, Category} = require("../models");
const categoryData = [
    {title: "General Fitness"},
    {title: "Cardio"},
    {title: "Weight Training"},
    {title: "Diet"},
    {title: "Tech"},
    {title: "Art"},
    {title: "Entertainment"},
    {title: "Social Skills"},
    {title: "Intellect"},
    {title: "Career"},
    {title: "Music"},
    {title: "Sports"},
    {title: "Habits"},
    {title: "Creativity"},
    {title: "Writing"},
    {title: "Gaming"},
    {title: "DIY"},
    {title: "Chores"},
    {title: "Misc"}
];
const skillData = [
    {
        name: "Bicep Curls",
        CategoryId: 3,
        level: 2,
        current: JSON.stringify({weight: 24, reps: 3, sets: 2}),
        goal: JSON.stringify({weight: 30, reps: 4, sets: 3})
    },
    {
        name: "Tricep Curls",
        CategoryId: 3,
        level: 3,
        current: JSON.stringify({weight: 50, reps: 3, sets: 2}),
        goal: JSON.stringify({weight: 75, reps: 4, sets: 3})
    }
];

sequelize.sync().then(() => {
    Category.bulkCreate(categoryData).then(() => {
        Skill.bulkCreate(skillData);
    });
});
