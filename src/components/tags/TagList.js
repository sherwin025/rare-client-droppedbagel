import React, { useEffect, useState } from "react";
import { deleteTag, getAllTags } from "./TagManager";
import { Settings, Delete } from '@material-ui/icons';

export const TagList = ({newTag}) => {

    const [tags, setTags] = useState([])
    useEffect(()=> {
        getAllTags().then(setTags)
    },[newTag])

    return (
        <div className = "tagList">
            <h1 className="tagListHeader"> Tags </h1>

            {
                tags.map((tag) => {
                    return <div key={tag.id} className="tagItem">
                        <button><Settings /></button>
                        <button onClick={()=>{
                            deleteTag(tag.id).then(setTags)
                        }}><Delete/></button>
                        <div className="tag__label">{tag.label}</div>
                        </div>
                })
            }

        </div>
    )
}