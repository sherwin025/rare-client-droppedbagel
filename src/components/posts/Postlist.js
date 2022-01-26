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
            search === "" ? GetPosts().then((data) => { setposts(data) }) :
                setFiltered(posts.filter((post) => {
                    return post.title.toLowerCase().includes(search.toLowerCase())
                }))

        },
        [search]
    )

    useEffect(
        () => {
            getAllTags()
                .then(setTags)
        }, [])



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
            return each.tag.label == userType
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
        <select onChange={(evt) => { filterCategory(evt.target.value) }} name="filter" id="filter">
            <option value="">category</option>
            {categories.map(category => {
                return <option value={category.label}>{category.label}</option>
            })}
        </select>

        <select onChange={(evt) => { filterUser(evt.target.value) }} name="filter" id="filter">
            <option value="">user</option>
            {users.map(user => {
                return <option value={user.username}>{user.username}</option>
            })}
        </select>

        <select onChange={(evt) => { filterTag(evt.target.value) }} name="filter" id="filter">
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

        {
            filtered.map(each => {
                return <div key={each.id} className="indpost">
                    <div><Link to={`./posts/${each.id}`}> {each.title}</Link></div>
                    <div>{each.user.last_name} {each.user.first_name}</div>
                    <div>{each.category.label}</div>
                    <div>{each.content}</div>
                </div>
            })
        }

    </>)
}