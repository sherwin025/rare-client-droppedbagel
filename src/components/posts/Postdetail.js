import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getSinglePost, GetPostReactions, New_reaction, deletePostReaction, GetReactions } from "./PostManager"
import { Message, AddCircleOutline } from '@material-ui/icons';
import { ListItemIcon, MenuItem, Select } from "@material-ui/core";
import TrashIcon from '../comments/trash.svg'




export const PostDetail = () => {
    const { postId } = useParams()
    const [post, setpost] = useState({})
    const [postReaction, setPostReaction] = useState([])
    const [reactions, setReaction] = useState(false)
    const history = useHistory()
    const [defaultreactions, setreactions] = useState([])


    useEffect((
        () => {
            getSinglePost(parseInt(postId)).then(res => setpost(res))
            GetReactions().then(res => setreactions(res))
        }
    ), [])

    useEffect((
        () => {
            filteredreactions()
        }
    ), [])

    useEffect((
        () => {
            postReaction.length != 0 ? setReaction(true) : setReaction(false)
        }
    ), [postReaction])

    const filteredreactions = () => {
        return GetPostReactions().then(res => {
            let array = res.filter(each => each.post_id === parseInt(postId))
            setPostReaction(array)
        })
    }

    const deletepost = (id) => {
        let result = confirm("Are you sure you want to delete this post? ")
        if (result) {
            deletePost(id)
                .then(GetPosts)
                .then(res => setposts(res))
        } else {
            
        }
    }


    const addRemoveReaction = (evt) => {
        evt.preventDefault()
        const value = evt.target.value
        if (parseInt(value) === 0) {

        } else {
            const newPostReaction = {
                user_id: parseInt(localStorage.getItem('token')),
                reaction_id: parseInt(value),
                post_id: parseInt(postId)
            };

            let reactionPost = postReaction.find((reaction) => {
                return reaction.user_id === parseInt(localStorage.getItem('token')) && reaction.reaction_id === parseInt(value) && reaction.post_id === parseInt(postId)
            })

            reactionPost ? deletePostReaction(reactionPost.id)
                .then(() => {
                    filteredreactions().then(document.getElementById("reactions").value = "0")
                })
                : New_reaction(newPostReaction)
                    .then(() => {
                        filteredreactions()
                            .then(() => {
                                countHappy()
                                countLaugh()
                                countLove()
                                countAngry()
                                countMindBlown()
                                countSad()
                            })
                    })
                    .then(document.getElementById("reactions").value = "0")

        }
    }

    const countReactions = (id) => {
        const sadEmoji = postReaction.filter((reaction) => {
            return reaction.reaction_id === parseInt(id)
        })
        return sadEmoji
    }

    return (<>
        <div key={post.id} className="postDetailContainer">
            <div className="postDetailTop">
                <div><button className="postDetailAddComments" onClick={() => history.push(`/commentForm/${post.id}`)}><Message /></button></div>
                <div className="postDetailTitle"> {post.title}</div>
                <div className="postDetailCategory">{post.category?.label}</div>
            </div>
            <div className="postdetailbottom"> publication date: {post.publication_date}</div>
            <div className="postDetailImage"><img src={post.image_url}></img></div>
            <div className="postDetailBottom">
                <div className="postDetailName">By {post.user?.first_name} {post.user?.last_name}</div>
                <button className="postDetailViewComments" onClick={() => { history.push(`/comments/${post.id}`) }}>View Comments</button>
                <div className="postAddReaction">
                    <select className="emojiselect" defaultValue="0" onChange={(evt) => { addRemoveReaction(evt) }} name="reactions" id="reactions">
                        <option className="emojiOption" value="0">+</option>
                        {defaultreactions.map(each => {
                            return <option key={each.id} className="emojiOption" value={each.id}>{each.image_url} </option>
                        })}
                    </select>

                    <div className="postReactions">
                        {
                            defaultreactions.map(
                                eachReaction => {
                                    return countReactions(eachReaction.id).length >= 1
                                        ? <div key={eachReaction.id} className="reactionContainer">
                                            <div className="emoji">{eachReaction.image_url}</div>
                                            <div className={countReactions(eachReaction.id).length > 1 ? "reactionNumber" : "reactionNumber invisible"}>
                                                {countReactions(eachReaction.id).length}
                                            </div>
                                        </div>
                                        : ""
                                }
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="postDetailContent">{post.content}</div>
        </div>
        <button onClick={() => deletepost(post.id)}><img src={TrashIcon} style={{ height: "1.25rem" }} ></img></button>              
    </>)
}