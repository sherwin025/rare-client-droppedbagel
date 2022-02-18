import React, { useState } from "react";


export const ReactionForm = ({ saveNewLabel }) => {
    const [label, setLabel] = useState("")
    const [imageurl, setimageurl] = useState("")


    return (
        <div className="tag-form">
            <h1 className="tagHeader">Add a New Reaction</h1>
            <input type="text" placeholder="Add text" name="label" id="userLabel"
                onChange={(event) => {
                    setLabel(event.target.value)
                }}></input>
            <input placeholder="Emoji" name="label" id="userLabel" className="theemoji"
                onChange={(event) => {
                    setimageurl(event.target.value)
                }}></input>
            <button className="tagButton" onClick={() => {
                saveNewLabel(label, imageurl)
                document.getElementById("userLabel").value = ""
                document.getElementsByClassName("theemoji").value = ""
            }}>Add</button>

        </div>
    )
}
