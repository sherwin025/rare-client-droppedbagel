import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import {useParams} from "react-router-dom"
import "./category.css"


export const EditCategory = () => {
    const [catToEdit, setCatToEdit] = useState({})
    const newLabel = useRef(null)
    const history = useHistory()


    const {catId} = useParams()

    const handleEdit = () => {

        const editedCat = {
            label: newLabel.current.value,
            id: parseInt(catId)
        }

        fetch(`https://dropped-bagels-media-co.herokuapp.com/categories/${catId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
        body: JSON.stringify(editedCat)}).then( () => {history.push('/categories')})


    }




    return (
        <>
        <fieldset className="editForm">
        <h2 className="formHead">Edit Category</h2>
        <input className="formInput" type="text" placeholder="Edit label here" ref={newLabel} />
        <button className="formSubmit" type="submit_edit" onClick={() => {handleEdit()}}>Save Changes</button>
        <button className="formSubmit" onClick={()=> {history.push("/categories")}}>Cancel</button>
        </fieldset>

        
        </>
    )
}