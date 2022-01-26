import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import TrashIcon from './trash.svg'

import { deleteComment, getCommentsByPost } from "./CommentManager";


export const CommentList = () => {
    const { postId } = useParams()
    const history = useHistory()
    const currentUser = parseInt(localStorage.getItem("token"))

    const [comments, setComments] = useState([])
    useEffect(() => {
        getCommentsByPost(postId).then(setComments)
    }, [postId])

    //history.push should push to the comment form path and also provide the postId value to be automatically used in the comment form
    return (
        <>
            <div className="commentList">

                {
                    comments.map((comment) => {
                        return <div key={comment.id} className="comment">
                            {comment.content}

                            {
                                comment.author_id === currentUser
                                    ? <button onClick={() => deleteComment(comment.id).then(() => getCommentsByPost(postId).then(setComments))}>
                                        <img src={TrashIcon} style={{ height: "1.25rem" }} ></img>
                                    </button>
                                    : ""

                            }
                        </div>
                    })
                }

            </div>
            <button onClick={() => history.push(`/commentForm/${postId}`)}>Add Comment</button>
        </>
    )
}