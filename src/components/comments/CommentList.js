import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getCommentsByPost } from "./CommentManager";


export const CommentList = () => {
    const {postId} = useParams()

    const [comments, setComments] = useState([])
    useEffect(()=> {
        getCommentsByPost(postId).then(setComments)
    },[postId])

    return (
        <div className = "commentList">

            {
                comments.map((comment) => {
                    return <div key={comment.id} className="comment">
                        {comment.content}
                        </div>
                })
            }

        </div>
    )
}