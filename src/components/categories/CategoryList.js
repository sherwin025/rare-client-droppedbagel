import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { deleteCategory, getCategories, uploadCategory } from "../../apimanager/categoryFetches"
import "./category.css"
import TrashIcon from './trash.svg'




export const CategoryList = () => {
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState({})
    const label = useRef(null)
    const history = useHistory()

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
        .then(() => {label.current.value = null})
    
    }


    return (
        <>
        <h1 className="viewHead">Categories</h1>

        {
            categories.map((cat) => {
                return <fieldset>
                    <div className="categoryListItem">
                        <h4 className="cat">{cat.label}</h4>
                        <div className="cat"><button onClick={() => {
                            history.push(`/categories/${cat.id}`)
                            
                        }}>Edit</button><button onClick={() => {
                            deleteCategory(cat.id).then(() => {syncCategories()})
                        }}><img src={TrashIcon} style={{ height: "1.25rem" }} ></img></button></div>
                    </div>
                </fieldset>
            })
        }

        <fieldset className="category_form">
        <h2 className="formHead">Create a new category</h2>
        <input className="formInput" type="text" placeholder="Enter label here" ref={label}></input>
        <button className="formSubmit" type="submit_category" onClick={() => {handlePost()}}>Create Category</button>
        </fieldset>
        
        
        </>
    )
}