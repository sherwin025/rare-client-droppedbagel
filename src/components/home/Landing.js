
import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getSubscriptions, getUsersSubscriptions } from "../../apimanager/subscriptionFetches"
import { GetPosts } from "../posts/PostManager"
import "../posts/MyPost.css"
import TrashIcon from '../comments/trash.svg'
import { Settings, Delete } from '@material-ui/icons';



export const Landing = () => {
    const [subs, setSubs] = useState([])
    const [posts, setPosts] = useState([])
    const history = useHistory()

    useEffect(() => {
        GetPosts().then(setPosts)
        getUsersSubscriptions(+localStorage.getItem('userid')).then(setSubs)

    }, [])

    const usersSubs = subs.map((sub) => {
        return sub.follower.id
    })


    const filteredPosts = () => posts.filter((post) => {
        for (const userSub of usersSubs) {
            if (userSub === post.user.id) {
                return true
            }
            else {
                return false
            }

        }

    })



    return (<>
        <div className="newpostbutton">
            <button onClick={()=> {history.push("/new-post")}}>New Post</button>
        </div>
        <div className="mypostlist">
            {
                !!subs.length > 0
                    ? filteredPosts().map((each) => {
                        return <div key={each.id} className="indpost">
                            <div className="posthead">
                                <div><Link to={`./posts/${each.id}`}> {each.title}</Link></div>
                                <div>Publication Date: {new Date(each.publication_date).toLocaleDateString()}</div>
                            </div>

                            <div className="imageposturl"><img src={each.image_url} /></div>
                            <div className="postfoot">
                                <div>
                                    <div> Author: <Link to={`/users/${each.user.id}`}>{each.user?.user?.first_name} {each.user?.user?.last_name}</Link></div>
                                </div>

                                <div className="rightfoot">
                                    <button onClick={() => { history.push(`/editPost/${each.id}`) }}><Settings /></button>
                                    <button onClick={() => deletepost(each.id)}><Delete /></button>
                                </div>
                            </div>
                        </div>
                    })
                    : <h1>Subscribe to authors to curate your personal homepage</h1>
            }
        </div>
    </>)
}
