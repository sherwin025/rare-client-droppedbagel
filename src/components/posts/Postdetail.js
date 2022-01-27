import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getSinglePost } from "./PostManager"
import { Message } from '@material-ui/icons';

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
        <div key={post.id} className="postDetailContainer">
            <div className="postDetailTop">
                <div><button className="postDetailAddComments" onClick={() => history.push(`/commentForm/${post.id}`)}><Message /></button></div>
                <div className="postDetailTitle"> {post.title}</div>
                <div className="postDetailCategory">{post.category?.label}</div>
            </div>
            <div className="postDetailImage"><img src={post.image_url}></img></div>
            <div className="postDetailBottom">
                <div className="postDetailName">By {post.user?.first_name} {post.user?.last_name}</div>
                <button className="postDetailViewComments" onClick={() => { history.push(`/comments/${post.id}`) }}>View Comments</button>
            </div>
            <div className="postDetailContent">{post.content}</div>
        </div>

    </>)
}