import {useEffect, useState} from "react";

function Skill({...props}) {
    return (
        <a href = {"/skill/" + props.id} key = {props.key}>
            <h3>{props.name}</h3>
        </a>
    )
}

export default Skill;