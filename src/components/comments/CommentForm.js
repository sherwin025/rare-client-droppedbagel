import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GetPosts } from "../posts/PostManager";

import { addComment } from "./CommentManager";

export const CommentForm = ({ post }) => {
    const history = useHistory()
    const [userComment, setUserComment] = useState("")
    const [posts, setPosts] = useState([])
    const [postId, setPostId] = useState(0)

    useEffect(() => {
        GetPosts().then(setPosts)
    }, [])


    const saveComment = () => {
        const newComment = {
            post_id: parseInt(postId),
            author_id: parseInt(localStorage.getItem("token")),
            content: userComment
        }
        if (newComment.post_id !== 0) {
            addComment(newComment)
                .then(() => history.push(`/comments/${parseInt(postId)}`))
        } else {
            window.alert("Select a post to comment on")
        }
    }

    return (
        <div className="comment-form">
            <h2>Add a New Comment</h2>
            <select onChange={(e) => setPostId(e.target.value)}>
                <option value="0">--Select a Post to Comment On--</option>
                {
                    posts.map((post) => {
                        return <option key={post.id} value={post.id}>{post.title}</option>
                    })
                }
            </select>
            <input type="textarea" placeholder="Label" name="label" id="comment"
                onChange={(e) => setUserComment(e.target.value)}></input>
            <button onClick={() => {
                saveComment()
                document.getElementById("comment").value = ""
            }}>Submit</button>

        </div>
    )
}

