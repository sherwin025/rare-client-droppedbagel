import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { GetPosts, getSinglePost } from "../posts/PostManager";
import { addComment } from "./CommentManager";
import "./Comments.css"

export const CommentForm = () => {
    const history = useHistory()
    const [userComment, setUserComment] = useState("")
    const [post, setPost] = useState({})
    const [userPostId, setUserPostId] = useState(0)

    const {postId} = useParams()

    useEffect(() => {
        setUserPostId(postId)
    },[postId])

    useEffect(() => {
        getSinglePost(postId).then(setPost)
    }, [])


    const saveComment = () => {
        const newComment = {
            user: parseInt(localStorage.getItem("userid")),
            post: parseInt(userPostId),
            text: userComment,
            date: Date.now()
        }
        if (newComment.post_id !== 0) {
            addComment(newComment)
                .then(() => history.push(`/comments/${parseInt(userPostId)}`))
        } else {
            window.alert("Select a post to comment on")
        }
    }

    return (
        <div className="comment-form">
            <div className="form-title">Add a New Comment to "{post.title}"</div>
            <textarea className="textarea comment-field" type="textarea" placeholder="Type your comment here..." name="label" id="comment"
                onChange={(e) => setUserComment(e.target.value)}></textarea>
            <div className="submit-btn">
            <button className="submit-comment-btn button" onClick={() => {
                saveComment()
                document.getElementById("comment").value = ""
            }}>Submit</button>
            </div>
        </div>
    )
}

