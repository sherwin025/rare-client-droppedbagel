import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GetPosts } from "./PostManager"


export const PostList = () => {
const [posts, setposts] = useState([])

useEffect((
    () => {
    GetPosts()
    .then(res => setposts(res))
    }
),[])

return (<>
    {
        posts.map(each => {
            return <div key={each.id} className="indpost">
                 <div><Link to={`./posts/${each.id}`}> {each.title}</Link></div>
                 <div>{each.user_id}</div>
                 <div>{each.category_id}</div>
                 <div>{each.content}</div>
                 </div>
        })
    }
</>)
}