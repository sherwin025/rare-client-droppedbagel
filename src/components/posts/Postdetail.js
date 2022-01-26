import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getSinglePost } from "./PostManager"

export const PostDetail = () => {
    const { postId } = useParams()
    const [post, setpost] = useState({})
    const history = useHistory()

    useEffect((
        () => {
            getSinglePost(parseInt(postId)).then(res => setpost(res))
        }
    ), [])

    return (<>
        <div key={post.id} className="indpost">
            <div> {post.title}</div>
            <div>{post.user?.last_name} {post.user?.first_name}</div>
            <div>{post.category?.label}</div>
            <div>{post.content}</div>
            <button onClick={()=> {history.push(`/comments/${post.id}`)}}>View Comments</button>
            <button onClick={() => history.push(`/commentForm/${post.id}`)}>Add Comment</button>
        </div>

    </>)
}