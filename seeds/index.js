const sequelize = require("../config/connection");
const bcrypt = require("bcryptjs");
const {Skill, Category, User} = require("../models");
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
const userData = [
    {
        username: "Slammy Jams",
        email: "slammy@jams.com",
        password: bcrypt.hashSync("12345678910", 10, null)
    },
    {
        username: "Garbage Dog McCool",
        email: "garbage@dog.gov",
        password: bcrypt.hashSync("10987654321", 10, null)
    },
    {
        username: "Imp",
        email: "imp@gmail.hotmail",
        password: bcrypt.hashSync("asdfasdfasdf", 10, null)
    },
    {
        username: "The Ultimate Fish 2.0",
        email: "glubglub@gmail.gov",
        password: bcrypt.hashSync("greatbigballsoffire", 10, null)
    },
    {
        username: "Jacob",
        email: "jacob@gmail.com",
        password: bcrypt.hashSync("password12", 10, null)
    }
];

const skillData = [
    {
        name: "Bicep Curls",
        CategoryId: 3,
        UserId: 1,
        level: 2,
        current: JSON.stringify({weight: 24, reps: 3, sets: 2}),
        goal: JSON.stringify({weight: 30, reps: 4, sets: 3})
    },
    {
        name: "Tricep Curls",
        CategoryId: 3,
        UserId: 2,
        level: 3,
        current: JSON.stringify({weight: 50, reps: 3, sets: 2}),
        goal: JSON.stringify({weight: 75, reps: 4, sets: 3})
    },
    {
        name: "Fireball",
        CategoryId: 9,
        UserId: 3,
        level: 4,
        current: JSON.stringify({magic: 50, damage: 400}),
        goal: JSON.stringify({magic: 30, damage: 500})
    },
    {
        name: "Quadricep Curls",
        CategoryId: 3,
        UserId: 4,
        level: 2,
        current: JSON.stringify({weight: 24, reps: 3, sets: 2}),
        goal: JSON.stringify({weight: 30, reps: 4, sets: 3})
    },
    {
        name: "Washing the Dishes",
        CategoryId: 18,
        UserId: 4,
        level: 16,
        current: JSON.stringify({dishes: 14, minutes: 5}),
        goal: JSON.stringify({dishes: 50, minutes: 1})
    }
];


async function seed() {
    await sequelize.sync();
    await Category.bulkCreate(categoryData);
    await User.bulkCreate(userData);
    await Skill.bulkCreate(skillData);    
};

seed().catch(err => console.log(err));
