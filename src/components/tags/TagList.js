import React, { useEffect, useState } from "react";
import { deleteTag, getAllTags } from "./TagManager";

export const TagList = ({newTag}) => {

    const [tags, setTags] = useState([])
    useEffect(()=> {
        getAllTags().then(setTags)
    },[newTag])

    return (
        <div className = "tagList">

            {
                tags.map((tag) => {
                    return <div key={tag.id} className="tagItem">
                        <div className="tag__label">{tag.label}</div>
                        <button>Edit</button>
                        <button onClick={()=>{
                            deleteTag(tag.id).then(setTags)
                        }}>Delete</button>
                        </div>
                })
            }

        </div>
    )
}