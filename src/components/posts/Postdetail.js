import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSinglePost } from "./PostManager"

export const PostDetail = () => {
    const { postId } = useParams()
    const [each, setpost] = useState({})

    useEffect((
        () => {
            getSinglePost(parseInt(postId)).then(res => setpost(res))
        }
    ), [])

    return (<>
            <div key={each.id} className="indpost">
            <div> {each.title}</div>
            <div>{each.content}</div>
            <div>{each.user?.first_name} {each.user?.last_name}</div>
            <div>{each.category?.label}</div>
        </div>

    </>)
}