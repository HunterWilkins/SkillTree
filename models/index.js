const Skill = require("./skill");
const Category = require("./category");
const User = require("./user");

Skill.belongsTo(Category);
Category.hasMany(Skill);

User.hasMany(Skill);
Skill.belongsTo(User);

module.exports = {
    Skill, Category, User
}