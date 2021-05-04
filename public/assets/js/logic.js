// Save skills via an array of objects/classes

class Skill {
    constructor(_name, _level, _current, _goal) {
        this.name = _name;
        this.level = _level;
        this.current = _current;
        this.goal = _goal;
    }
  
    levelUp(newGoal) {
        const goal = this.goal;

        this.level++;
        this.current = goal;
        this.goal = newGoal;
    }
}

const skillSpecs = [];
const goalSpecs = [];

$(".add-spec").on("click", function(event) {
    event.preventDefault();

    $("#specs").css("display", "block");
    $("#specs").attr("data-spec-type", $(this).parent().attr("id").split("-")[0]);
    let input = $("<input>").attr("name", "something");
    $(this).parent().append(input);
});

$(document).on("click", "#submit-spec", function(event){
    event.preventDefault();
    const specType = $("#specs").attr("data-spec-type");
    const specName = $("input[name=spec-name]").val();
    const specValue = $("input[name=spec-value]").val();

    (specType === "skill" ? skillSpecs : goalSpecs).push({
        [specName] : specValue
    });

    console.log(skillSpecs);
    console.log(goalSpecs);
})

const BicepCurls = new Skill("Bicep Curl", 1, {weight: 25, reps: 4, sets: 3}, {weight: 30, reps: 4, sets: 3});
console.log(BicepCurls.current);

BicepCurls.levelUp({weight:35, reps: 4, sets: 3});

console.log(BicepCurls.current);