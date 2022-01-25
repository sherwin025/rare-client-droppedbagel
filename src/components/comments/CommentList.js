import React, { useEffect, useState } from "react";
import { getAllComments } from "./CommentManager";


export const CommentList = () => {

    const [comments, setComments] = useState([])
    useEffect(()=> {
        getAllComments().then(setComments)
    },[])

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