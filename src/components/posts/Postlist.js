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

    // useEffect(() => {
    //     getCategories()
    //         .then(setCategories)

    // },
        // [])

    useEffect(
        () => {
            setFiltered(posts)
        },
        [posts]
    )

    // useEffect(
    //     () => {
    //         getAllUsers()
    //             .then((data) => {
    //                 setUsers(data)
    //             })
    //     },
    //     []
    // )

    useEffect(
        () => {
            search === "" ? GetPosts().then((data) => { setposts(data) }) :
                setFiltered(posts.filter((post) => {
                    return post.title.toLowerCase().includes(search.toLowerCase())
                }))

        },
        [search]
    )

    // useEffect(
    //     () => {
    //         getAllTags()
    //             .then(setTags)
    //     }, [])



    // FUNCTIONS ---------------------------------------------------------------------------------------------------------------
    const filterCategory = (categoryType) => {
        let postsCopy = posts.map(post => ({ ...post }))
        const filteredPosts = postsCopy.filter(each => {
            return each.category.label == categoryType
        })
        setFiltered(filteredPosts)

        if (categoryType == '') {
            setFiltered(posts)
        }
    }

    const filterUser = (userType) => {
        let postsCopy = posts.map(post => ({ ...post }))
        const filteredPosts = postsCopy.filter(each => {
            return each.user.username == userType
        })
        setFiltered(filteredPosts)

        if (userType == '') {
            setFiltered(posts)
        }
    }


    const filterTag = (tagType) => {
        let postsCopy = posts.map(post => ({ ...post }))
        const filteredPosts = postsCopy.filter(each => {
            return each.tags.find((tag) => {
                return tag === tagType
            })
        })
        setFiltered(filteredPosts)
    }

    const searchFunction = () => {
        const foundTitle = posts.find((post) => {
            return post.title === search
        })
    }


    // JSX ---------------------------------------------------------------------------------------------------------------
    return (<>
        <div className="filters">
            <select className="filterBox" onChange={(evt) => { filterCategory(evt.target.value) }} name="filter" id="filter">
                <option value="">category</option>
                {categories.map(category => {
                    return <option value={category.label}>{category.label}</option>
                })}
            </select>

            <select className="filterBox" onChange={(evt) => { filterUser(evt.target.value) }} name="filter" id="filter">
                <option value="">user</option>
                {users.map(user => {
                    return <option value={user.username}>{user.username}</option>
                })}
            </select>

            <select className="filterBox" onChange={(evt) => { filterTag(evt.target.value) }} name="filter" id="filter">
                <option value="">tag</option>
                {tags.map(tag => {
                    return <option value={tag.label}>{tag.label}</option>
                })}
            </select>

            <div className="searchContainer">
                <input className="searchBar" onChange={(e) => {
                    const searchItem = e.target.value
                    setSearch(searchItem);
                }} type="text" placeholder="search..."></input>
                <button className="submit" type="submit" onClick={() => { searchFunction() }}>go</button>
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