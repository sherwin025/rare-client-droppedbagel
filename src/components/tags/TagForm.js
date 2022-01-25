import React, { useState } from "react";


export const TagForm = ({saveNewLabel}) => {
    const [label, setLabel] = useState("")


    return (
        <div className="tag-form">
            <h2>Add a New Tag</h2>
            <input type="text" placeholder="Label" name="label" id="userLabel"
                onChange={(event) => {
                    setLabel(event.target.value)
                }}></input>
            <button onClick={() => {
                saveNewLabel(label)
                document.getElementById("userLabel").value=""
            }}>Add</button>

        </div>
    )
}