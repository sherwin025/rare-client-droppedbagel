import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import TrashIcon from './trash.svg'
import { Settings, Delete } from '@material-ui/icons';
import "./Comments.css"

import { deleteComment, getCommentsByPost } from "./CommentManager";



export const CommentList = () => {
    const { postId } = useParams()
    const history = useHistory()
    const currentUser = parseInt(localStorage.getItem("userid"))

    const [comments, setComments] = useState([])
    useEffect(() => {
        getCommentsByPost(postId).then(setComments)
    }, [postId])

    return (
        <div className="postCommentList">
            <div className="add-comment">
                <button className="comment-btn" onClick={() => history.push(`/commentForm/${postId}`)}>Add Comment</button>
            </div>

            <div className="commentList">

                {
                    comments.map((comment) => {
                        return <div key={comment.id} className="comment">
                            {
                                comment.user.user === currentUser
                                    ? <div className="author_btns">
                                        <Settings />
                                        <Delete onClick={() => deleteComment(comment.id).then(() => getCommentsByPost(postId).then(setComments))} />

                                    </div>
                                    : ""

                            }
                            <div className="comment__content">{comment.text}</div>
                            <div className="comment__author">- {comment.user.user}</div>
                            <div className="comment__date">- {comment.date}</div>

                        </div>
                    })
                }

            </div>
        </div>
    )
}