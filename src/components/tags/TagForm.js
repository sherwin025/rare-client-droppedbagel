import React, { useState } from "react";


export const TagForm = ({saveNewLabel}) => {
    const [label, setLabel] = useState("")


    return (
        <div className="tag-form">
            <h1 className="tagHeader">Add a New Tag</h1>
            <input type="text" placeholder="Add text" name="label" id="userLabel"
                onChange={(event) => {
                    setLabel(event.target.value)
                }}></input>
            <button className="tagButton" onClick={() => {
                saveNewLabel(label)
                document.getElementById("userLabel").value=""
            }}>Add</button>

        </div>
    )
}