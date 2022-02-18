import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"
import TrashIcon from './trash.svg'
import { Settings, Delete} from '@material-ui/icons';
import { Button, Dialog, DialogContent, DialogTitle, Input } from "@material-ui/core";
import "./Comments.css"
import { GetPosts, getSinglePost } from "../posts/PostManager";
import { deleteComment, getCommentsByPost } from "./CommentManager";



export const CommentList = () => {
    const { postId } = useParams()
    const history = useHistory()
    const currentUser = parseInt(localStorage.getItem("userid"))
    const [post, setPost] = useState({})

    useEffect(() => {
        getSinglePost(postId).then(setPost)
    },[postId])


    const [comments, setComments] = useState([])
    useEffect(() => {
        getCommentsByPost(postId).then(setComments)
    }, [postId])

    return (
        <div className="postCommentList">
            <h2 className="commentForm-header">Comments for <Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
            <div className="add-comment">
                <button className="comment-btn" onClick={() => history.push(`/commentForm/${postId}`)}>Add Comment</button>
            </div>

            <div className="commentList">

                {
                    comments.map((comment) => {
                        return <div key={comment.id} className="comment">
                            <div className="author_btns">
                                {
                                    comment.user?.id === currentUser
                                        ? <Settings onClick={() => history.push(`/editComment/${comment.id}`)}/>
                                        : ""
                                }
                                {
                                    comment.user?.id === currentUser || localStorage.getItem('isStaff') === "true"
                                    ? <Delete onClick={() => deleteComment(comment.id).then(() => getCommentsByPost(postId).then(setComments))} />
                                    : ""
                                }
                            </div>
                            <div className="comment__content">{comment.text}</div>
                            <div className="comment__author">- {comment.user?.user.username}</div>
                            <div className="comment__date">- {comment.date}</div>

                        </div>
                    })
                }

            </div>
        </div>
    )
}