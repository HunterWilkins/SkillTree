const Skill = require("./skill");
const Category = require("./category");

Skill.belongsTo(Category);
Category.hasMany(Skill);

module.exports = {
    Skill, Category
}