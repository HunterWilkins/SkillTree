// Save skills via an array of objects/classes

class Skill {
    constructor(_name, _type, _level, _current, _goal) {
        this.name = _name;
        this.type = _type;
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
};

async function grabCategories() {
    const categories = await fetch("/api/categories").then(response => response.json());
    categories.forEach(item => {
        $("select[name = type]").append(
            `
            <option value = ${item.id}>${item.title}</option>
            `
        );
    });
};

grabCategories();

async function grabSkills() {
    const skills = await fetch("/api/skills").then(response => response.json());
    console.log(skills);
    skills.forEach(item => {
        appendSkill(item);
    });
};

async function postSkill(body) {
    console.log(body);
    const newSkill = await fetch("/api/skill", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body)
    }).then(response => console.log(response.json())).catch(err => console.log(err));

    console.log(newSkill);
};

grabSkills();

const skillSpecs = {};
const goalSpecs = {};

const specInput =` <form id="specs" style = "display:none;">
                    <input type="text" name = "spec-name" placeholder = "Spec Name (ex: weight)">
                    <input type="text" name = "spec-value" placeholder = "Spec Value (ex: 20)">
                    <button id = "submit-spec">Submit</button>
                   </form>`;


function toggleSpecInput(event) {
    event.preventDefault();
   
    $("#specs").remove();
    $($(this).attr("data-type") === "skill" ? "#skill-specs" : "#goal-specs").append(specInput);

    $("#specs").css("display", "block");
    $("#specs").attr("data-spec-type", $(this).attr("data-type"));
}

function addSpec(event) {
    event.preventDefault();
    const specType = $("#specs").attr("data-spec-type");
    const specName = $("input[name=spec-name]").val();
    const specValue = $("input[name=spec-value]").val();
    const skill = specType === "skill";

    (skill ? skillSpecs : goalSpecs)[specName] = specValue;
    $("#" + (skill ? "skill-specs" : "goal-specs")).empty();
    for (var x in (skill ? skillSpecs : goalSpecs)) {
        $("#" + (skill ? "skill-specs" : "goal-specs")).append(
            `
            <p>${x} : ${(skill ? skillSpecs : goalSpecs)[x]}</p>
            `
        );
    }
};

function createSkill() {
    const NewSkill = new Skill(
        $("input[name=name]").val(), 
        $("input[name=type]").val(), 
        Math.round($("input[name=level]").val()), 
        JSON.stringify(skillSpecs), 
        JSON.stringify(goalSpecs)
    );

    const skillObject = {
        name: NewSkill.name,
        level: NewSkill.level,
        current: NewSkill.current,
        goal: NewSkill.goal
    }
    
    console.log(NewSkill);
    postSkill(skillObject);
    appendSkill({
        ...NewSkill,
        current: skillSpecs,
        goal: goalSpecs
    });
};

function appendSkill(Skill) {
    const currentSpecs = (() => {
        var result = ``;
        for(var x in Skill.current) {
            result += `<li>${x} : ${Skill.current[x]}</li>`
        }
        return result;
    })();

    const goalSpecs = (() => {
        var result = ``;
        for(var x in Skill.goal) {
            result += `<li>${x} : ${Skill.goal[x]}</li>`
        }
        return result;
    })();

    const skillTemplate = 
    `
    <div class = "skill">
        <span class = 'skill-head'>
            <h2 class = "name">${Skill.name}</h2>
            <p class = "level">lvl ${Skill.level}</p>
        </span>
        <hr>
        <span class = "row">
            <div class = "column">
                <h3>Current Skill Specs</h3>
                <ul class = "current">
                    ${currentSpecs}
                </ul>
            </div>
            <div class = "column">
                <h3>Goal</h3>
                <ul class = "goal">
                    ${goalSpecs}
                </ul>
            </div>
        </span>
    </div>
    `
    // const parentDiv = $("<div class = 'skill'>");
    // const levelElement = $("<p class = 'level'>").text(Skill.level);
    // const nameElement = $("<h2 class = 'name'>").text(Skill.name);
    // // const typeElement = $("<h3 class = 'type'>").text(Skill.Category.title);
    // const currentLabel = $("<p>").text("Current Skill Specs");
    // const currentDiv = $("<ul class = 'current'>");
    // const goalLabel = $("<p>").text("Goal");

    // for (var x in Skill.current) {
    //     let skillElement = $("<li>").text(`${x} : ${Skill.current[x]}`);
    //     currentDiv.append(skillElement); 
    // };

    // const goalDiv = $("<ul class = 'goal'>");

    // for (var x in Skill.goal) {
    //     let goalElement = $("<li>").text(`${x} : ${Skill.goal[x]}`);
    //     goalDiv.append(goalElement);
    // }

    // parentDiv.append(nameElement, levelElement, currentLabel, currentDiv, goalLabel, goalDiv);

    $("#skills").append(skillTemplate);
}

$(".add-spec").on("click", toggleSpecInput);

$(document).on("click", "#submit-spec", addSpec);

$("#submit-skill").on("click", createSkill);

// Seeds =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/
// const BicepCurl = new Skill("Bicep Curl", "workout", 3, {weight: 20, reps: 3, sets: 2}, {weight: 30, reps: 4, sets: 5000});
// const TricepCurl = new Skill("Tricep Curl", "workout", 3, {weight: 40, reps: 4, sets: 3}, {weight: 500, reps: 900, sets: "infinity"});

// const seedSkills = [BicepCurl, TricepCurl];
// seedSkills.forEach(item => appendSkill(item));


