import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import {useParams} from "react-router-dom"


export const EditCategory = () => {
    const [catToEdit, setCatToEdit] = useState({})
    const newLabel = useRef(null)
    const history = useHistory()


    const {catId} = useParams()

    const handleEdit = () => {

        const editedCat = {
            label: newLabel.current.value
        }

        fetch(`http://localhost:8088/categories/${catId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedCat)}).then(history.push('/categories'))


    }




    return (
        <>
        <fieldset className="edit_category_form">
        <h2>Edit Category</h2>
        <input type="text" placeholder="Edit label here" ref={newLabel} />
        <button type="submit_edit" onClick={() => {handleEdit()}}>Save Changes</button>
        </fieldset>

        
        </>
    )
}