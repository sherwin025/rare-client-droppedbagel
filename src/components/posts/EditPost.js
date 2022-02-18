import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getCategories } from "../../apimanager/categoryFetches";
import { getAllTags } from "../tags/TagManager";
import { getSinglePost, updatePost, getPostImages } from "./PostManager";
import "./PostForm.css"


export const EditPost = () => {
    const { postId } = useParams()
    const [post, setPost] = useState({})
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const history = useHistory()
    const [postTags, setPostTags] = useState([])
    const [basestring, setbasestring] = useState('')
    const [postImages, setPostImages] = useState([])

    useEffect(() => {
        let postTags = []
        if (post.tags?.length > 0) {
            for (const tag of post.tags) {
                postTags.push(tag.id)
            }
            setPostTags(postTags)

        }
    }, [post])

    useEffect(() => {
        getAllTags().then(setTags)
    }, [])

    useEffect(() => {
        getCategories().then(setCategories)
    }, [])

    useEffect(() => {
        getSinglePost(postId).then(setPost)
    }, [postId])

    useEffect(() => {
        getPostImages().then(setPostImages)
    }, [])



    const checkTag = (event) => {
        let tagId = parseInt(event.target.value)
        let copy = [...postTags]
        let alreadySelected = copy.find((tag) => tag === tagId)
        if (alreadySelected) {
            let newCopy = copy.filter((id) => id !== tagId)
            setPostTags(newCopy)
        } else {
            copy.push(tagId)
            setPostTags(copy)
        }
    }


    const handleControlledInput = (event) => {
        const newPost = Object.assign({}, post)
        if (event.target.name === "category") {
            newPost[event.target.name] = parseInt(event.target.value)
        } else {
            newPost[event.target.name] = event.target.value
        }
        setPost(newPost)
    }

    const saveUpdate = () => {
        const updatedPost = Object.assign({}, post)
        updatedPost.user = updatedPost.user?.id
        updatedPost.tags = postTags
        updatedPost.category = post.category?.id
        updatePost(postId, updatedPost)
            .then(() => {
                const postimage = {
                    "post": post.id,
                    "postimage": basestring
                }

                fetch(`http://localhost:8000/postimage/${findPostImage.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(postimage)
                }).then(
                    history.push(`/posts/${postId}`)
                )
    })


}

const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
}

const createGameImageString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
        console.log("Base64 of file is", base64ImageString);
        setbasestring(base64ImageString)
    });
}

const findPostImage = postImages.find((post) => {
    return post.post == postId
})

return (
    <div className="edit-form">
        <div className="form-title">Edit Post</div>
        <div className="field">
            <input className="input" type="text" value={post.title} name="title" id="title" onChange={handleControlledInput}></input>
        </div>
        <div className="field">
            <input type="file" id="postimage" onChange={createGameImageString} />
        </div>
        <div className="field">
            <textarea className="textarea" type="textarea" value={post.content} name="content" id="content" onChange={handleControlledInput}></textarea>
        </div>
        <div className="field">
            <div className="select">
                <select className="select" name="category" id="category" value={post.category?.id} onChange={handleControlledInput}>
                    {
                        categories.map((category) => {
                            return <option key={category.id} value={category.id}>{category.label}</option>
                        })
                    }
                </select>
            </div>
        </div>
        <div className="field">
            <div className="tag-options">
                {
                    tags.map((tag) => {
                        return <div key={tag.id} className="option">
                            <input className="checkbox" type="checkbox" id={tag.id} name="tags" value={tag.id}
                                checked={postTags.find((tagId) => tagId === tag.id) ? "checked" : ""}
                                onChange={checkTag}>
                            </input>
                            <label className="checkbox-label" htmlFor={tag.id}>{tag.label}</label>
                        </div>
                    })
                }
            </div>
        </div>
        <div className="field">
            <button className="saveEdit-btn" onClick={saveUpdate}>Save</button>
            <button className="saveEdit-btn" onClick={() => { history.push("/my-posts") }}>Cancel</button>
        </div>

    </div >
)
}