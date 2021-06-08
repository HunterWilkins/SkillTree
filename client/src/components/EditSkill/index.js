import {useState, useEffect} from "react";

function EditSkill() {

    useEffect(() => {
        grabSkillData();
    }, []);

    function grabSkillData() {
        console.log(document.location.pathname.split("/")[2]);
        fetch("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: 
                JSON.stringify({query: `
                query {
                    skill(id: ${document.location.pathname.split("/")[2]}) {
                        name,
                        goal,
                        current,
                        level
                    }
                }
                
                `
            })
        }).then(response => response.json())
        .then(data => console.log(data));
    }
    return(
        <div id = "edit">
            <h1>Edit Skill</h1>
        </div>
    )
};

export default EditSkill;