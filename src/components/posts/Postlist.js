import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GetPosts, updatePost } from "./PostManager"
import { getCategories } from "../../apimanager/categoryFetches"
import { getAllUsers } from '../Users/userManager'
import { getAllTags } from "../tags/TagManager";


export const PostList = () => {
    const [posts, setposts] = useState([])
    const [categories, setCategories] = useState([])
    const [filtered, setFiltered] = useState([])
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    const admin = localStorage.getItem('isStaff')

    useEffect((
        () => {
            Posts()
        }
    ), [])

    useEffect(() => {
        getCategories()
            .then(setCategories)

    },
        [])

    useEffect(
        () => {
            setFiltered(posts)
        },
        [posts]
    )

    useEffect(
        () => {
            getAllUsers()
                .then((data) => {
                    setUsers(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getAllTags()
                .then(setTags)
        }, [])



    // FUNCTIONS ---------------------------------------------------------------------------------------------------------------
    const filterCategory = (categoryid) => {
        if (categoryid == 0) {
            return fetch(`https://dropped-bagels-media-co.herokuapp.com/posts`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(res => setFiltered(res))
        } else {
            return fetch(`https://dropped-bagels-media-co.herokuapp.com/posts?catfilter=${categoryid}`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(res => setFiltered(res))

        }
    }

    const filterUser = (userid) => {
        if (userid == 0) {
            return fetch(`https://dropped-bagels-media-co.herokuapp.com/posts`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(res => setFiltered(res))
        } else {
            return fetch(`https://dropped-bagels-media-co.herokuapp.com/posts?userfilter=${userid}`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(res => setFiltered(res))
        }
    }

    const filterTag = (tagid) => {
        if (tagid == 0) {
            return fetch(`https://dropped-bagels-media-co.herokuapp.com/posts`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(res => setFiltered(res))
        } else {
            return fetch(`https://dropped-bagels-media-co.herokuapp.com/posts?tagfilter=${tagid}`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(res => setFiltered(res))
        }
    }

    const searchFunction = (event) => {
        if (event.key === "Enter") {
            return fetch(`https://dropped-bagels-media-co.herokuapp.com/posts?search=${event.target.value}`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(res => setFiltered(res))
        }
    }

    const updateApproval = (id) => {
        let post = posts.find((obj) => {
            return id == obj.id
        })
        const updatedPost = Object.assign({}, post)
        updatedPost.approved = false
        updatedPost.user = post.user?.id
        updatedPost.category = post.category?.id
        let postTags = []
        if (post.tags?.length > 0) {
            for (const tag of post.tags) {
                postTags.push(tag.id)
            }
        }
        updatedPost.tags = postTags
        console.log(updatedPost)
        updatePost(id, updatedPost)
            .then(() => Posts())

    }

    const Posts = () => {
        GetPosts()
                .then(res => setposts(res))
    }


    // JSX ---------------------------------------------------------------------------------------------------------------
    return (<>
        <div className="filters">
            <select className="filterBox" onChange={(evt) => { filterCategory(evt.target.value) }} name="filter" id="filter">
                <option value={0}>category</option>
                {categories.map(category => {
                    return <option value={category.id}>{category.label}</option>
                })}
            </select>

            <select className="filterBox" onChange={(evt) => { filterUser(evt.target.value) }} name="filter" id="filter">
                <option value={0}>user</option>
                {users.map(user => {
                    return <option value={user.id}>{user.user?.username}</option>
                })}
            </select>

            <select className="filterBox" onChange={(evt) => { filterTag(evt.target.value) }} name="filter" id="filter">
                <option value={0}>tag</option>
                {tags.map(tag => {
                    return <option value={tag.id}>{tag.label}</option>
                })}
            </select>

            <div className="searchContainer">
                <input className="searchBar"
                    onKeyPress={(e) => searchFunction(e)}
                    placeholder="search..."></input>
            </div>
        </div>

        <div className="postObj">
            <div className="postInfo"><b>Title</b></div>
            <div className="postInfo"><b>Author</b></div>
            <div className="postInfo"><b>Category</b></div>
        </div>

        {
            filtered.map(each => {
                return <div key={each.id} className="postObj">
                    <div className="postInfo"><Link to={`./posts/${each.id}`}> {each.title}</Link></div>
                    <div className="postInfo"> <Link to={`/users/${each.id}`}> {each.user?.user.first_name} {each.user?.user.last_name}</Link></div>
                    <div className="postInfo">{each.category?.label}</div>
                    {
                    localStorage.getItem("isStaff") === "true" ? 
                    <div className="postInfo"><button onClick={() => {updateApproval(each.id)}}>Unapprove</button></div> : ""

                    }
                </div>
            })
        }

    </>)
}