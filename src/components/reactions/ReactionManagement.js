import React, { useState } from "react"
import { ReactionForm } from "./ReactionForm"
import { ReactionList } from "./ReactionList"
import { addReaction } from "./ReactionManager"
import './Reaction.css'

export const ReactionManagement = () => {
    const [newReaction, setNewReaction] = useState(false)
    const toggleNewReaction = () => setNewReaction(!newReaction)

    const saveNewLabel = (label, imageurl) => {
        const new_Reaction = {
            label: label,
            image_url: imageurl
        }
        addReaction(new_Reaction)
        .then(()=>{
            toggleNewReaction()
        })
    }


  return (
    <div className="tagContainer">
    <ReactionList newReaction={newReaction}/>
    <ReactionForm saveNewLabel={saveNewLabel} />
    </div>
  )
}