

grabCategories();
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
};

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
    const newSkill = {
        name: $("input[name=name]").val(), 
        CategoryId: $("select[name=category]").val(), 
        level: Math.round($("input[name=level]").val()), 
        current: JSON.stringify(skillSpecs), 
        goal: JSON.stringify(goalSpecs)
    };
    console.log(newSkill);
    postSkill(newSkill);
    appendSkill({
        ...newSkill,
        current: skillSpecs,
        goal: goalSpecs
    });
};

async function levelUp(id) {
    console.log(id);
    const leveledUp = await fetch("/api/levelup/" + id, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({newGoal: {snake: 001}})
        
    });

    console.log(leveledUp);
}

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

    const dateDifference = moment().diff(Skill.createdAt, "days");
    const skillTemplate = 
    /*html*/`
    <div class = "skill">
        <span class = 'skill-head'>
            <h2 class = "name">${Skill.name}</h2>
            <p class = "level">lvl ${Skill.level}</p>
        </span>
        <hr>
        <span class = "row">
            <div class = "column">
                <h3>${dateDifference > 0 ? `${Skill.createdAt} (${dateDifference} days ago)` : `Today`}</h3>
                <ul class = "current">
                    ${currentSpecs}
                </ul>
            </div>
            <figure class = "column">
                <img id = "${Skill.id}" class = "arrow" src = "./assets/images/double-arrows.png" alt = "arrows">
            </figure>
            <div class = "column">
                <h3>Goal</h3>
                <ul class = "goal">
                    ${goalSpecs}
                </ul>
            </div>
        </span>
    </div>
    `

    $("#skills").append(skillTemplate);
};

async function grabCategories() {
    const categories = await fetch("/api/categories").then(response => response.json());
    categories.forEach(item => {
        $("select[name = category]").append(
            `
            <option value = ${item.id}>${item.title}</option>
            `
        );
    });
};

function convertDate(date) {
    let normalizeDate = date.substring(0, 10);
    console.log(normalizeDate);
    let convertedDate = moment(normalizeDate).format("MMMM DD, YYYY");
    // let rearrangedDate = [normalizeDate[1], normalizeDate[2], normalizeDate[0]].join("/");
    return convertedDate;
};

async function grabSkills() {
    const skills = await fetch("/api/skills").then(response => response.json());
    console.log(skills);
    skills.forEach(item => {
        appendSkill({
            ...item,
            createdAt: convertDate(item.createdAt)
        });
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

$(".add-spec").on("click", toggleSpecInput);

$(document).on("click", "#submit-spec", addSpec);

$("#submit-skill").on("click", createSkill);

$("#skills").on("click", ".arrow", function() {
    levelUp($(this).attr("id"));
});



