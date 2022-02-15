import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GetPosts } from "./PostManager"
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

    useEffect((
        () => {
            GetPosts()
                .then(res => setposts(res))
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
        return fetch(`http://localhost:8000/posts?catfilter=${categoryid}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(res => setFiltered(res))
    }

    const filterUser = (userid) => {
        return fetch(`http://localhost:8000/posts?userfilter=${userid}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(res => setFiltered(res))
    }


    const filterTag = (tagid) => {
        return fetch(`http://localhost:8000/posts?tagfilter=${tagid}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(res => setFiltered(res))
    }

    const searchFunction = (event) => {
        if (event.key === "Enter") {
            return fetch(`http://localhost:8000/posts?search=${event.target.value}`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(res => setFiltered(res))
        }
    }


    // JSX ---------------------------------------------------------------------------------------------------------------
    return (<>
        <div className="filters">
            <select className="filterBox" onChange={(evt) => { filterCategory(evt.target.value) }} name="filter" id="filter">
                <option value="">category</option>
                {categories.map(category => {
                    return <option value={category.id}>{category.label}</option>
                })}
            </select>

            <select className="filterBox" onChange={(evt) => { filterUser(evt.target.value) }} name="filter" id="filter">
                <option value="">user</option>
                {users.map(user => {
                    return <option value={user.id}>{user.username}</option>
                })}
            </select>

            <select className="filterBox" onChange={(evt) => { filterTag(evt.target.value) }} name="filter" id="filter">
                <option value="">tag</option>
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
                    <div className="postInfo"> {each.user_id.user.first_name} {each.user_id.user.last_name}</div>
                    {/* <div className="postInfo">{each.category.label}</div> */}
                </div>
            })
        }

    </>)
}