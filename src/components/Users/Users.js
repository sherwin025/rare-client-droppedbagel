import React, { useEffect, useState } from "react"
import { useParams, useHistory, Link, useLocation } from "react-router-dom"
import { getAllUsers, activateUser, deactivateUser } from './userManager'
import { Button, Dialog, DialogContent, DialogTitle, Input } from "@material-ui/core";
import "./user.css"


export const Users = () => {
    // Use States
    //-------------------------------------------------------------------------------------------------------------------
    const [activeUsers, setActiveUsers] = useState([])
    const [inactiveUsers, setInactiveUsers] = useState([])
    const userId = parseInt(localStorage.getItem('userid'))
    const [newState, setNewState] = useState(false)
    const alertNewState = () => setNewState(!newState)
    const [warningDiag, setWarningDiag] = useState(false)
    const toggleWarningDiag = () => setWarningDiag(!warningDiag)

    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------
    useEffect(
        () => {
            getAllUsers()
                .then((data) => {
                    const active = data.filter(user => user.user.is_active === true)
                    const inactive = data.filter(user => user.user.is_active !== true)
                    setActiveUsers(active)
                    setInactiveUsers(inactive)
                })
        },
        [newState]
    )

    const changeActiveState = (user) => {
        if (user.user.is_active) {
            if (user.id === userId) {
                toggleWarningDiag()
            } else {
                deactivateUser(user.id).then(alertNewState)
            }
        }
        else {
            activateUser(user.id).then(alertNewState)
        }
    }

    return (
        <>
            <div className="userBlock">

                <div className="activeUsers">
                    <h1 className="userListHead">Active Users</h1>
                    {activeUsers.map((user) => {
                        return <div key={user.id} className="user">
                            <p>UserName: <Link to={`/users/${user.id}`}>{user.user.username}</Link></p>
                            <p>Full Name: {user.user.first_name} {user.user.last_name} </p>
                            <p>Email: {user.user.email}</p>
                            <button onClick={() => changeActiveState(user)}>Deactivate</button>
                        </div>
                    })}
                </div>

                <div className="deactivatedUsers">
                    <h1 className="userListHead">Deactivated Users</h1>
                    {inactiveUsers.map((user) => {
                        return <div key={user.id} className="user">
                            <p>UserName: <Link to={`/users/${user.id}`}>{user.user.username}</Link></p>
                            <p>Full Name: {user.user.first_name} {user.user.last_name} </p>
                            <p>Email: {user.user.email}</p>
                            <button onClick={() => changeActiveState(user)}>Reactivate</button>
                        </div>
                    })}

                </div>

            </div>

            <Dialog open={warningDiag} onClose={toggleWarningDiag}>
                    <DialogTitle className="newReaction-title">Don't Deactivate Yourself!</DialogTitle>
                    <DialogContent className="newReaction-content">
                        {/* <Input className="newReaction-input" id="newReaction-label" placeholder="Label" onChange={(e) => {
                            const copy = { ...newReactionObject }
                            copy.label = e.target.value
                            setNewReactionObject(copy)
                        }}></Input>
                        <Input className="newReaction-input" id="newReaction-imageUrl" placeholder="Emoji" onChange={(e) => {
                            const copy = { ...newReactionObject }
                            copy.image_url = e.target.value
                            setNewReactionObject(copy)
                        }}></Input> */}
                    </DialogContent>
                    <div className="newReaction-btns">
                        <div className="reaction-btn"><Button className="reaction-btn" variant="outlined" onClick={toggleWarningDiag}>Ok</Button></div>
                    </div>

                </Dialog>

        </>
    )
}



