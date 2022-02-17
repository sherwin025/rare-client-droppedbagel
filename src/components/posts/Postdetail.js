import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getSinglePost, GetPostReactions, New_reaction, deletePostReaction, GetReactions, updatePost, deletePost, addReaction } from "./PostManager"
import { Message, AddCircleOutline, FastfoodOutlined } from '@material-ui/icons';
import { ListItemIcon, MenuItem, Select } from "@material-ui/core";
import TrashIcon from '../comments/trash.svg'
import { getAllTags } from "../tags/TagManager";
import { Button, Dialog, DialogContent, DialogTitle, Input } from "@material-ui/core";




export const PostDetail = () => {
    const { postId } = useParams()
    const [post, setPost] = useState({})
    const history = useHistory()
    const [tagstate, settagstate] = useState(false)
    const [tags, setTags] = useState([])
    const [postTags, setPostTags] = useState([])
    const [reactions, setReactions] = useState([])
    const [reactionCounts, setReactionCounts] = useState([])
    const [newReaction, setNewReaction] = useState(false)
    const alertNewReaction = () => setNewReaction(!newReaction)
    const [newDiag, setNewDiag] = useState(false)
    const toggleNewDiag = () => setNewDiag(!newDiag)
    const [newReactionObject, setNewReactionObject] = useState({
        label: "",
        image_url: ""
    })

    useEffect((
        () => {
            thesinglepost()
            GetReactions().then(res => setReactions(res))
            getAllTags().then(setTags)
        }
    ), [])



    useEffect((
        () => {
            getSinglePost(postId).then(setPost)
            GetReactions().then(setReactions)
        }
    ), [newReaction])

    useEffect(() => {
        let postTags = []
        if (post.tags?.length > 0) {
            for (const tag of post.tags) {
                postTags.push(tag.id)
            }
            setPostTags(postTags)

        }
    }, [post])

    const thesinglepost = () => {
        getSinglePost(parseInt(postId)).then(res => setPost(res))
    }

    const deletepost = (id) => {
        let result = confirm("Are you sure you want to delete this post? ")
        if (result) {
            deletePost(id)
                .then(GetPosts)
                .then(res => setposts(res))
        }
    }

    const checkTag = (event) => {
        let tagId = parseInt(event.target.value)
        let copy = [...postTags]
        let alreadySelected = copy.find((tag) => tag === tagId)
        if (alreadySelected) {
            let newCopy = copy.filter((id) => id !== tagId)
            setPostTags(newCopy)
        } else {
            copy.push(tagId)
            setPostTags(copy)

        }
    }

    const handleReaction = (e) => {
        const reactionExists = post.post_reactions.find(reaction => reaction.user.id === parseInt(localStorage.getItem('userid')) && reaction.post.id === parseInt(postId) && reaction.reaction.id === parseInt(e.target.value))
        if (reactionExists) {
            deletePostReaction(reactionExists.id).then(() => {
                document.getElementById("reactions").value = "0"
                alertNewReaction()
            })
        } else {
            const newReaction = {
                post_id: parseInt(postId),
                reaction_id: parseInt(e.target.value)
            }
            New_reaction(newReaction).then(() => {
                document.getElementById("reactions").value = "0"
                alertNewReaction()
            })
        }
    }

    useEffect(() => {
        if (post.post_reactions) {
            const updatedReactionCount = []
            const copy = [...post.post_reactions]
            for (const reaction of reactions) {
                const reactionCount = copy.filter(post_reaction => post_reaction.reaction.id === reaction.id)
                if (reactionCount.length > 0) {
                    const reactionCountObj = {
                        reaction: reaction,
                        count: reactionCount.length
                    }
                    updatedReactionCount.push(reactionCountObj)
                }
            }
            updatedReactionCount.sort((a, b) => {
                return b.count - a.count
            })
            setReactionCounts(updatedReactionCount)

        }
    }, [post.post_reactions, newReaction])


    const createNewReactionObject = () => {
        addReaction(newReactionObject).then(() => {
            alertNewReaction()
            toggleNewDiag()
        })
    }

    const saveUpdate = () => {
        const updatedPost = Object.assign({}, post)
        updatedPost.user = updatedPost.user?.id
        updatedPost.tags = postTags
        updatedPost.category = post.category?.id
        updatePost(postId, updatedPost)
            .then(thesinglepost)
            .then(settagstate(!tagstate))
    }

    return (<>
        <div key={post.id} className="postDetailContainer">
            <div className="postDetailTop">
                <div><button className="postDetailAddComments" onClick={() => history.push(`/commentForm/${post.id}`)}><Message /></button></div>
                <div className="postDetailTitle"> {post.title}</div>
                <div className="postDetailCategory">{post.category?.label}</div>
            </div>
            <div className="postdetailbottom"> publication date: {post.publication_date}</div>
            {
            post.pictures?.map(each => {
                return <img src={`http://localhost:8000${each.postimage}`} alt="article"/>
            })
            }
            <div className="postDetailImage"><img src={post.image_url}></img></div>
            <div className="postDetailBottom">
                <div className="postDetailName">By {post.user?.user?.first_name} {post.user?.user?.last_name}</div>
                <button className="postDetailViewComments" onClick={() => { history.push(`/comments/${post.id}`) }}>View Comments</button>

                <div><button onClick={toggleNewDiag}>New Reaction</button></div>
                <Dialog open={newDiag} onClose={toggleNewDiag}>
                    <DialogTitle className="newReaction-title">Create New Reaction Option</DialogTitle>
                    <DialogContent className="newReaction-content">
                        <Input className="newReaction-input" id="newReaction-label" placeholder="Label" onChange={(e) => {
                            const copy = { ...newReactionObject }
                            copy.label = e.target.value
                            setNewReactionObject(copy)
                        }}></Input>
                        <Input className="newReaction-input" id="newReaction-imageUrl" placeholder="Emoji" onChange={(e) => {
                            const copy = { ...newReactionObject }
                            copy.image_url = e.target.value
                            setNewReactionObject(copy)
                        }}></Input>
                    </DialogContent>
                    <div className="newReaction-btns">
                        <div className="reaction-btn"><Button className="reaction-btn" variant="outlined" onClick={createNewReactionObject}>Save</Button></div>
                        <div className="reaction-btn"><Button className="reaction-btn" variant="outlined" onClick={toggleNewDiag}>Cancel</Button></div>
                    </div>

                </Dialog>

                <div className="postAddReaction">
                    <select className="emojiselect" defaultValue="0" onChange={handleReaction} name="reactions" id="reactions">
                        <option key={"0"} className="emojiOption" value="0">+</option>
                        {reactions.map(each => {
                            return <option key={each.id} className="emojiOption" value={each.id}>{each.image_url} </option>
                        })}
                    </select>

                    <div className="postReactions">
                        {
                            reactionCounts.map((reactionCount) => {
                                return <div key={reactionCount.id}>
                                    <div>{reactionCount.reaction.image_url}</div>
                                    <div className={reactionCount.count > 1 ? "reactionNumber" : "reactionNumber invisible"}>{reactionCount.count}</div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="postDetailContent">{post.content}</div>
            {
                parseInt(localStorage.getItem("userid")) === post.user?.id ?
                    <button
                        onClick={()=>{settagstate(!tagstate)}}
                    >Manage Tags</button> : ""
            }
            <div>Tags:
                {
                    tagstate ?
                        <div>
                            {
                                tags.map((tag) => {
                                    return <div key={tag.id} className="option">
                                        <input className="checkbox" type="checkbox" id={tag.id} name="tags" value={tag.id}
                                            checked={postTags.find((tagId) => tagId === tag.id) ? "checked" : ""}
                                            onChange={checkTag}>
                                        </input>
                                        <label className="checkbox-label" htmlFor={tag.id}>{tag.label}</label>
                                    </div>
                                })
                            }
                            <button onClick={saveUpdate}>Save</button>
                            <button onClick={() => {settagstate(!tagstate)}} >Cancel</button>
                        </div>
                        :

                        post.tags?.map(each => <div>{each.label}</div>)
                }
            </div>
        </div>
        <button onClick={() => deletepost(post.id)}><img src={TrashIcon} style={{ height: "1.25rem" }} ></img></button>
    </>)

}