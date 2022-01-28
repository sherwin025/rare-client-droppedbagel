import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getSinglePost, GetPostReactions, New_reaction, deletePostReaction } from "./PostManager"
import { Message } from '@material-ui/icons';

export const PostDetail = () => {
    const { postId } = useParams()
    const [post, setpost] = useState({})
    const [postReaction, setPostReaction] = useState([])
    const [reactions, setReaction] = useState(false)
    const history = useHistory()


    useEffect((
        () => {
            getSinglePost(parseInt(postId)).then(res => setpost(res))
        }
    ), [])

    useEffect((
        () => {
            GetPostReactions(parseInt(postId)).then(res => setPostReaction(res))
                .then(() => countEmojis())
        }
    ), [])

    useEffect((
        () => {
            postReaction.length != 0 ? setReaction(true) : setReaction(false)
        }
    ), [postReaction])


    const addRemoveReaction = (value) => {
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
                GetPostReactions(parseInt(postId)).then(res => setPostReaction(res))
                countEmojis()
            })
            : New_reaction(newPostReaction)
                .then(() => {
                    GetPostReactions(parseInt(postId)).then(res => setPostReaction(res))
                        .then(() => {
                            countHappy()
                            countLaugh()
                            countLove()
                            countAngry()
                            countMindBlown()
                            countSad()

                        })
                })
    }

    const countHappy = () => {
        const happyEmoji = postReaction.filter((reaction) => {
            return reaction.reaction_id === 1
        })
        return happyEmoji
    }

    const countLaugh = () => {
        const laughEmoji = postReaction.filter((reaction) => {
            return reaction.reaction_id === 2
        })
        return laughEmoji
    }
    console.log(countHappy())

    const countLove = () => {
        const loveEmoji = postReaction.filter((reaction) => {
            return reaction.reaction_id === 3
        })
        return loveEmoji
    }

    const countAngry = () => {
        const angryEmoji = postReaction.filter((reaction) => {
            return reaction.reaction_id === 4
        })
        return angryEmoji
    }

    const countMindBlown = () => {
        const mindblownEmoji = postReaction.filter((reaction) => {
            return reaction.reaction_id === 5
        })
        return mindblownEmoji
    }

    const countSad = () => {
        const sadEmoji = postReaction.filter((reaction) => {
            return reaction.reaction_id === 6
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
            <div className="postDetailImage"><img src={post.image_url}></img></div>
            <div className="postDetailBottom">
                <div className="postAddReaction">
                    <select onChange={(evt) => { addRemoveReaction(evt.target.value) }} name="reactions" id="reactions">
                        <option value="1">😄 </option>
                        <option value="2">😂</option>
                        <option value="3">😍</option>
                        <option value="4">🤬</option>
                        <option value="5">🤯</option>
                        <option value="6">😥</option>
                    </select>
                    <div>
                        {reactions ? <div className="postReactions">
                            {postReaction.map((reaction) => {
                                if (reaction.reaction_id === 1) {
                                    return <div className="reactionContainer"><div className="emoji">😄</div><div className="reactionNumber">{`${countHappy().length > 1 ? countHappy().length : ""}`}</div></div>
                                }
                                else if (reaction.reaction_id === 2) {
                                    return <div className="reactionContainer"><div className="emoji">😂</div><div className="reactionNumber">{`${countLaugh().length > 1 ? countLaugh().length : ""}`}</div></div>
                                }
                                else if (reaction.reaction_id === 3) {
                                    return <div className="reactionContainer"><div className="emoji">😍</div><div className="reactionNumber">{`${countLove().length > 1 ? countLove().length : ""}`}</div></div>
                                }
                                else if (reaction.reaction_id === 4) {
                                    return <div className="reactionContainer"><div className="emoji">🤬</div><div className="reactionNumber">{`${countAngry().length > 1 ? countAngry().length : ""}`}</div></div>
                                }
                                else if (reaction.reaction_id === 5) {
                                    return <div className="reactionContainer"><div className="emoji">🤯</div><div className="reactionNumber">{`${countMindBlown().length > 1 ? countMindBlown().length : ""}`}</div></div>
                                }
                                else if (reaction.reaction_id === 6) {
                                    return <div className="reactionContainer"><div className="emoji">😥</div><div className="reactionNumber">{`${countSad().length > 1 ? countSad().length : ""}`}</div></div>
                                }
                            })}
                        </div> : ""}
                    </div>
                </div>
                <button className="postDetailViewComments" onClick={() => { history.push(`/comments/${post.id}`) }}>View Comments</button>
                <div className="postDetailName">By {post.user?.first_name} {post.user?.last_name}</div>
            </div>
            <div className="postDetailContent">{post.content}</div>
        </div>

    </>)
}