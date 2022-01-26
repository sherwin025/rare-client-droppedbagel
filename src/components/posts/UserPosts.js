import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deletePost, GetPosts } from "./PostManager"


export const UserPostList = () => {
const [posts, setposts] = useState([])
const [userposts, setuserposts] = useState([])


useEffect((
    () => {
    GetPosts()
    .then(res => setposts(res))
    }
),[])
    
const getuserposts = () => {
    let userposts = []
    const theuser = parseInt(localStorage.getItem("token"))
    for (const thepost of posts){
        if (parseInt(thepost.user_id) === theuser){
            userposts.push(thepost)
        }
    }
    return userposts
}

const deletepost = (id) => {
    deletePost(id)
    .then(GetPosts)
    .then(res => setposts(res))
}

return (<>
    {
        getuserposts().map(each => {
            return <div key={each.id} className="indpost">
                 <div><Link to={`./posts/${each.id}`}> {each.title}</Link></div>
                 <div>{each.user?.first_name} {each.user?.last_name}</div>
                 <div>{each.category?.label}</div>
                 <div>{each.content}</div>
                 <div>
                     <button>edit</button>
                     <button onClick={()=>deletepost(each.id)}>delete</button>
                 </div>
                 </div>
        })
    }
</>)
}