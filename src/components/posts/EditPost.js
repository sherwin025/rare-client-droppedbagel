import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getCategories } from "../../apimanager/categoryFetches";
import { getSinglePost, updatePost } from "./PostManager";


export const EditPost = () => {
    const { postId } = useParams()
    const [post, setPost] = useState({})
    const [categories, setCategories] = useState([])
    const history = useHistory()

    useEffect(() => {
        getCategories().then(setCategories)
    }, [])

    useEffect(() => {
        getSinglePost(postId).then(setPost)
    }, [postId])

    const handleControlledInput = (event) => {
        const newPost = Object.assign({}, post)
        if (event.target.name === "category_id") {
            newPost[event.target.name] = parseInt(event.target.value)
        } else {
            newPost[event.target.name] = event.target.value
        }
        setPost(newPost)
    }

    const saveUpdate = () => {
        updatePost(postId, post)
            .then(() => history.push(`/posts/${postId}`))
    }

    //Post Info to Edit: category-id, title, image-url, content

    return (
        <div className="edit-form">
            <h2>Edit Post: {post.title}</h2>
            <input type="text" placeholder={post.title} name="title" id="title" onChange={handleControlledInput}></input>
            <select name="category_id" id="category_id" value={post.category_id} onChange={handleControlledInput}>
                <option value="0">--Select a Different Category</option>
                {
                    categories.map((category) => {
                        return <option key={category.id} value={category.id}>{category.label}</option>
                    })
                }
            </select>
            <input type="text" placeholder={post.image_url} name="image_url" id="image_url" onChange={handleControlledInput}></input>
            <input type="textarea" placeholder={post.content} name="content" id="content" onChange={handleControlledInput}></input>
            <button onClick={saveUpdate}>Update</button>

        </div>
    )
}