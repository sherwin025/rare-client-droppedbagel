import React, { useEffect, useState } from "react"
import { getAllTags } from "../tags/TagManager.js"
import { getCategories } from "../../apimanager/categoryFetches"
import { New_entrytags, New_post } from "./PostManager.js"
import { useHistory } from "react-router-dom"


export const NewPost = () => {
    const [tags, settags] = useState([])
    const [categories, setcategories] = useState([])
    const [newpost, setnewpost] = useState({})
    const history = useHistory()
    const [usertags, setusertags] = useState([])

    useEffect(() => {
        getAllTags().then(res => settags(res))
        getCategories().then(res => setcategories(res))
    }, [])


    const handlepostchanges = (event) => {
        const copy = newpost
        copy[event.target.name] = event.target.value
        setnewpost(copy)
    }

    const submitposttoapi = () => {
        const copy = newpost
        copy["approved"] = false //first sets approved to false 
        copy["user"] = parseInt(localStorage.getItem("userid"))

        New_post(copy)
            .then((res) => {
                for (const tag of usertags) {
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
        if (copy.length === 0) {
            copy.push(id)
        } else {
            if (copy.includes(id)) {
                let index = copy.indexOf(id)
                copy.splice(index, 1)
            } else {
                copy.push(id)
            }
        }
        setusertags(copy)
    }

    return (<>
        <div className="newPostForm edit-form">
        <div className="form-title">New Post</div>
            <div className="field">
                <input className="input" type="text" name="title" placeholder="Title" onChange={handlepostchanges} />
            </div>
            <div className="field">
                <input className="input" type="text" name="image_url" placeholder="Image URL" onChange={handlepostchanges} />
            </div>
            <div className="field">
                <textarea className="textarea" type="text" name="content" placeholder="Article Content" onChange={handlepostchanges}></textarea>
            </div>
            <div className="field">
                <div className="select">
                    <select className="select" name="category"
                        id="category"
                        onChange={handlepostchanges}>
                        <option>Category Select</option>
                        {
                            categories.map(each =>
                                <option key={each.id} value={each.id}> {each.label}</option>)
                        }
                    </select>
                </div>
            </div>
            <div className="field">
                <div className="tag-options">
                    {
                        tags.map(each => {
                            return <div key={each.id} className="option">
                                <input className="checkbox" type="checkbox" onChange={addedtags} id={each.id} />
                                <label className="checkbox-label">{each.label}</label>
                            </div>
                        })
                    }
                </div>
            </div>
            <button className="publish-btn" onClick={submitposttoapi}>Publish</button>
        </div>
    </>)
}