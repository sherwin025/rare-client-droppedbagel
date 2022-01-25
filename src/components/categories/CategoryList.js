import React, { useEffect, useRef, useState } from "react"
import { getCategories, uploadCategory } from "../../apimanager/categoryFetches"
import "./category.css"


export const CategoryList = () => {
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState({})
    const label = useRef(null)

    useEffect(() => {
        getCategories()
        .then(setCategories)

    },
    [])

    const syncCategories = () => {
        getCategories()
        .then(setCategories)
    }

    const handlePost = (evt) => {
        // evt.preventDefault()

        const newCatObj = {
            label: label.current.value
        }

        uploadCategory(newCatObj)
        .then(syncCategories)
    
    }


    return (
        <>
        <h1>Category List View</h1>

        {
            categories.map((cat) => {
                return <fieldset>
                    <div>
                        <h4>{cat.label}</h4>
                        <button>Edit</button><button>Delete</button>
                    </div>

                </fieldset>
            })
        }

        <fieldset className="category_form">
        <h2>Create a new category</h2>
        <input type="text" placeholder="Enter label here" ref={label}></input>
        <button type="submit_category" onClick={() => {handlePost()}}>Create Category</button>
        </fieldset>
        
        
        </>
    )
}