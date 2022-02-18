import React, { useEffect, useState } from "react";
import { deleteReaction, getAllReactions, updateReaction } from "./ReactionManager";
import { Settings, Delete } from '@material-ui/icons';
import { Button, Dialog, DialogContent, DialogTitle, Input } from "@material-ui/core";
import './Reaction.css'


export const ReactionList = ({ newReaction }) => {
    const [ReactionToEdit, setReactionToEdit] = useState({})
    const [editModal, setEditModal] = useState(false)
    const toggleEditModal = () => setEditModal(!editModal)
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)
    const [deleteDiag, setDeleteDiag] = useState(false)
    const toggleDeleteDiag = () => setDeleteDiag(!deleteDiag)

    const [Reactions, setReactions] = useState([])
    useEffect(() => {
        getAllReactions().then(setReactions)
    }, [newReaction, newInfo])

    const handleInput = (e) => {
        const copy = { ...ReactionToEdit }
        copy[e.target.id] = e.target.value
        setReactionToEdit(copy)
    }

    const saveReaction = () => {
        updateReaction(ReactionToEdit, ReactionToEdit.id).then(() => {
            alertNewInfo()
            toggleEditModal()
        })
    }

    const removeReaction = () => {
        deleteReaction(ReactionToEdit.id).then((r) => {
            setReactions(r)
            toggleDeleteDiag()
        })
    }

    return (
        <div className="tagList">
            <h1 className="tagListHeader"> Reactions </h1>
            <Dialog
                className="edit-dialog"
                open={editModal}
                onClose={toggleEditModal}
            >
                <DialogTitle className="edit-tag-title">Edit This Reaction</DialogTitle>
                <DialogContent className="edit-tag-content">
                    <Input className="edit-tag-input" type="text" value={ReactionToEdit.label} id="label" onChange={handleInput}></Input>
                    <Input className="edit-tag-input" value={ReactionToEdit.image_url} id="image_url" onChange={handleInput}></Input>
                    <div className="edit-tag-btns">
                        <div className="edit-tag-btn save"><Button className="edit-tag-btn save" variant="outlined" onClick={saveReaction}>Ok</Button></div>
                        <div className="edit-tag-btn cancel"><Button className="edit-tag-btn cancel" variant="outlined" onClick={(toggleEditModal)}>Cancel</Button></div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog
                className="edit-dialog"
                open={deleteDiag}
                onClose={toggleDeleteDiag}
            >
                <DialogTitle className="delete-tag-title">Are You Sure You Want to Delete This Reaction?</DialogTitle>
                <DialogContent className="edit-tag-btns">
                    <div className="edit-tag-btn save"><Button className="delete-btn" variant="outlined" color="error" onClick={removeReaction}>Delete</Button></div>
                    <div className="edit-tag-btn cancel"><Button variant="outlined" onClick={toggleDeleteDiag}>Cancel</Button></div>
                </DialogContent>

            </Dialog>

            {
                Reactions.map((Reaction) => {
                    return <div key={Reaction.id} className="tagItem">
                        <button onClick={() => {
                            setReactionToEdit(Reaction)
                            toggleEditModal()
                        }}><Settings /></button>

                        <button onClick={() => {
                            setReactionToEdit(Reaction)
                            toggleDeleteDiag()
                        }}><Delete />
                        </button>

                        <div className="tag__label">{Reaction.label}</div>
                        <div className="tag__label"> {Reaction.image_url}</div>
                    </div>
                })
            }

        </div>
    )
}