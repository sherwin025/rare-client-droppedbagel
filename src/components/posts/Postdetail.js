import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSinglePost } from "./PostManager"

export const PostDetail = () => {
    const { postId } = useParams()
    const [post, setpost] = useState([])

    useEffect((
        () => {
            getSinglePost(postId).then(res => setpost(res))
        }
    ), [])

    return (<>
        <div key={post.id} className="indpost">
            <div> {post.title}</div>
            <div>{post.user_id}</div>
            <div>{post.category_id}</div>
            <div>{post.content}</div>

        </div>
    </>)
}