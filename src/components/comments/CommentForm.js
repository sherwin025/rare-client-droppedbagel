import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { GetPosts, getSinglePost } from "../posts/PostManager";
import { addComment, getSingleComment, updateComment } from "./CommentManager";
import "./Comments.css"

export const CommentForm = ({edit}) => {
    const history = useHistory()
    const [userComment, setUserComment] = useState("")
    const [post, setPost] = useState({})
    const [userPostId, setUserPostId] = useState(0)

    const {postId} = useParams()
    const {commentId} = useParams()

    useEffect(() => {
        if (edit && commentId) {
        getSingleComment(parseInt(commentId)).then((r) => {
            setPost(r.post)
            setUserComment(r.text)
        })
    }
}, [edit, commentId])

    useEffect(() => {
        if (postId) {
            setUserPostId(postId)
        }
    },[postId])

    useEffect(() => {
        if (postId) {
            getSinglePost(postId).then(setPost)
        }
    }, [postId])


    const saveComment = () => {
        
        const newComment = {
            user: parseInt(localStorage.getItem("userid")),
            text: userComment,
            date: Date.now()
        }
        if (edit) {
            newComment.post = post.id
            updateComment(newComment, commentId)
            .then(() => history.push(`/comments/${post.id}`))

        } else {
            if (newComment.post_id !== 0) {
                newComment.post = parseInt(userPostId)
                addComment(newComment)
                    .then(() => history.push(`/comments/${parseInt(userPostId)}`))
            } else {
                window.alert("Select a post to comment on")
            }

        }
    }

    return (
        <div className="comment-form">
            <div className="form-title">{edit ? "Edit " : "Add a New "}Comment {edit ? "for " : "to "} "{post.title}"</div>
            <textarea className="textarea comment-field" type="textarea" value={userComment} placeholder="Type your comment here..." name="label" id="comment"
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

