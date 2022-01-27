import React, { useState } from "react"
import { TagForm } from "./TagForm"
import { TagList } from "./TagList"
import { addTag } from "./TagManager"

export const TagManagement = () => {
    const [newTag, setNewTag] = useState(false)
    const toggleNewTag = () => setNewTag(!newTag)

    const saveNewLabel = (label) => {
        const new_tag = {
            label: label
        }
        addTag(new_tag)
        .then(()=>{
            toggleNewTag()
        })
    }


  return (
    <div className="tagContainer">
    <TagList newTag={newTag}/>
    <TagForm saveNewLabel={saveNewLabel} />
    </div>
  )
}