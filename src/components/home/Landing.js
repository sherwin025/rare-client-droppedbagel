
import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getSubscriptions, getUsersSubscriptions } from "../../apimanager/subscriptionFetches"
import { GetPosts } from "../posts/PostManager"

export const Landing = () => { 
    const [subs, setSubs] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        GetPosts().then(setPosts)
        getUsersSubscriptions(+localStorage.getItem('token')).then(setSubs)

    },[])

    const usersSubs = subs.map((sub) => {
        return sub.follower_id
    })
    

    const filteredPosts = () => posts.filter((post) => {
        for (const userSub of usersSubs) {
            if (userSub === post.user_id) {
                return true
            }
            else {
                return false
            }

        }

    })



    return (

        <>

        {
            !!subs.length > 0
            ? filteredPosts().map((each) => {
                return <div key={each.id} className="indpost">
                <div><Link to={`./posts/${each.id}`}> {each.title}</Link></div>
                <div>{each.user?.last_name} {each.user?.first_name}</div>
                <div>{each.category?.label}</div>
                <div>{each.content}</div>
                </div>
            })
            : <h1>Subscribe to authors to curate your personal homepage</h1>
        }
        </>
    )
}