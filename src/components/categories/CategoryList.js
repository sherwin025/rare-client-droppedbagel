import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { deleteCategory, getCategories, uploadCategory } from "../../apimanager/categoryFetches"
import TrashIcon from './trash.svg'
import { Settings, Delete } from '@material-ui/icons';




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
            <div className="tagContainer">

        <div className="tagList">
        <h1 className="tagListHeader">Categories</h1>
        {
            categories.map((cat) => {
                return <fieldset>
                    <div className="tagItem">
                        <button onClick={() => {
                            history.push(`/categories/${cat.id}`)
                            
                        }}><Settings /></button><button onClick={() => {
                            deleteCategory(cat.id).then(() => {syncCategories()})
                        }}><Delete /></button>
                        <h4 className="tag__label" >{cat.label}</h4>
                    </div>
                </fieldset>
            })
        }  </div>
            

        <div className="tag-form">
        <h2 className="tagHeader">Create Category</h2>
        <input id="userLabel"  type="text" placeholder="Enter label here" ref={label}></input>
        <button className="tagButton" type="submit_category" onClick={() => {handlePost()}}>Create Category</button>
        </div>

        </div>
        
      
        
        
        </>
    )
}

