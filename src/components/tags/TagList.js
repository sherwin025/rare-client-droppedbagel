import React, { useEffect, useState } from "react";
import { deleteTag, getAllTags, updateTag } from "./TagManager";
import { Settings, Delete } from '@material-ui/icons';
import { Button, Dialog, DialogContent, DialogTitle, Input } from "@material-ui/core";
import './Tag.css'


export const TagList = ({ newTag }) => {
    const [tagToEdit, setTagToEdit] = useState({})
    const [editModal, setEditModal] = useState(false)
    const toggleEditModal = () => setEditModal(!editModal)
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)
    const [deleteDiag, setDeleteDiag] = useState(false)
    const toggleDeleteDiag = () => setDeleteDiag(!deleteDiag)

    const [tags, setTags] = useState([])
    useEffect(() => {
        getAllTags().then(setTags)
    }, [newTag, newInfo])

    const handleInput = (e) => {
        const copy = { ...tagToEdit }
        copy.label = e.target.value
        setTagToEdit(copy)
    }

    const saveTag = () => {
        updateTag(tagToEdit, tagToEdit.id).then(() => {
            alertNewInfo()
            toggleEditModal()
        })
    }

    const removeTag = () => {
        deleteTag(tagToEdit.id).then((r) => {
            setTags(r)
            toggleDeleteDiag()
        })
    }

    return (
        <div className="tagList">
            <h1 className="tagListHeader"> Tags </h1>

            <Dialog
                className="edit-dialog"
                open={editModal}
                onClose={toggleEditModal}
            >
                <DialogTitle className="edit-tag-title">Edit This Tag</DialogTitle>
                <DialogContent className="edit-tag-content">
                    <Input className="edit-tag-input" type="text" value={tagToEdit.label} onChange={handleInput}></Input>
                    <div className="edit-tag-btns">
                        <div className="edit-tag-btn save"><Button className="edit-tag-btn save" variant="outlined" onClick={saveTag}>Ok</Button></div>
                        <div className="edit-tag-btn cancel"><Button className="edit-tag-btn cancel" variant="outlined" onClick={(toggleEditModal)}>Cancel</Button></div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog
                className="edit-dialog"
                open={deleteDiag}
                onClose={toggleDeleteDiag}
            >
                <DialogTitle className="delete-tag-title">Are You Sure You Want to Delete This Tag?</DialogTitle>
                <DialogContent className="edit-tag-btns">
                    <div className="edit-tag-btn save"><Button className="delete-btn" variant="outlined" color="error" onClick={removeTag}>Delete</Button></div>
                    <div className="edit-tag-btn cancel"><Button variant="outlined" onClick={toggleDeleteDiag}>Cancel</Button></div>
                </DialogContent>

            </Dialog>

            {
                tags.map((tag) => {
                    return <div key={tag.id} className="tagItem">
                        <button onClick={() => {
                            setTagToEdit(tag)
                            toggleEditModal()
                        }}><Settings /></button>

                        <button onClick={() => {
                            setTagToEdit(tag)
                            toggleDeleteDiag()
                        }}><Delete />
                        </button>

                        <div className="tag__label">{tag.label}</div>
                    </div>
                })
            }

        </div>
    )
}