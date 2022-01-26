import React, { useEffect, useState } from "react"
import {getAllTags } from "../tags/TagManager.js"
import { getCategories } from "../../apimanager/categoryFetches"
import { New_entrytags, New_post } from "./PostManager.js"
import { useHistory } from "react-router-dom"


export const NewPost = () => {
    const [tags, settags] = useState([])
    const [categories, setcategories] = useState([])
    const [newpost, setnewpost] = useState({})
    const history = useHistory()
    const [usertags, setusertags] = useState([])

    useEffect(()=>{
        getAllTags().then(res=> settags(res))
        getCategories().then(res=>setcategories(res))
    },[])


    const handlepostchanges = (event) => {
        const copy = newpost
        copy[event.target.name] = event.target.value
        setnewpost(copy)
    }

    const submitposttoapi = () => {
        const newdate = Date.now()
        const copy = newpost
        copy["publication_date"] = newdate
        copy["approved"] = 1
        copy["user_id"] = parseInt(localStorage.getItem("token"))

        New_post(copy)
        .then((res)=>{
            for (const tag of usertags ){
                const tagobject = {
                    post_id: res.id,
                    tag_id: tag
                }
                New_entrytags(tagobject)
            }
            return res     
        })
        .then(res => 
            history.push(`posts/${res.id}`)
        )
    }

    const addedtags = (event) => {
        const copy = usertags
        const id = parseInt(event.target.id)
        if (copy.length === 0){
            copy.push(id)
        } else {
            if (copy.includes(id)){
                let index = copy.indexOf(id)
                copy.splice(index,1)
            } else {
                copy.push(id)
            }
        }
        setusertags(copy)
    }

    return (<>
        <div className="newPostForm">
            <div>
            <label>Category:</label>
            <select name="category_id"
                    id="category_id" 
                    onChange={handlepostchanges}>
                <option>Choose a post Category:</option>
                {
                    categories.map(each => 
                        <option key={each.id} value={each.id}> {each.label}</option>)
                }
            </select>
            </div>
            <div>
                <label>Post Title:</label>
                <input type="text" name="title" placeholder="Post Title" onChange={handlepostchanges}/>
            </div>
            <div>
            <label>Image URL:</label>
                <input type="text" name="image_url" placeholder="Image URL" onChange={handlepostchanges}/>
            </div>
            <div>
            <label>Post Body:</label>
                <input type="text" name="content" placeholder="Content" onChange={handlepostchanges}/>
            </div>
            <div>
                <label>Tags:</label>
                    {
                        tags.map(each => {
                            return <div key={each.id}>
                                <label>{each.label}</label>
                                <input type="checkbox" onChange={addedtags} id={each.id}/>
                            </div>
                        })
                    }

            </div>
            <button onClick={submitposttoapi}>Submit Post</button>
        </div>
    </>)
}