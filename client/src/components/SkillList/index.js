import {useState, useEffect} from "react";
import Skill from "../Skill";

function SkillList() {

    const [skills, setSkills] = useState([]);
    useEffect(() => {
      grabSkills();
    }, []);
  
    function grabSkills() {
      fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            query: `
              query {
                skills {
                  id,
                  name
                }
              }
            `
          })
      }).then(response => {
        console.log(response);
        return response.json();
      })
      .then(({data}) => {
        console.log(data);
        setSkills(data.skills);
      }).catch(err => console.log(err));
    }

    return (
        <div id = "skills">
            {
                skills.map(skill => <Skill key = {"skill-" + skill.id} id = {skill.id} name = {skill.name} />)
            }
        </div>
    )
}

export default SkillList;