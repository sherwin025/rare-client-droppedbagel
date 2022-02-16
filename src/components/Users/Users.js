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
    const [confirmDiag, setConfirmDiag] = useState(false)
    const toggleConfirm = () => setConfirmDiag(!confirmDiag)
    const [user, setUser] = useState({})

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
                setUser(user)
                toggleConfirm()
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
                            <p>Display Name: <Link to={`/users/${user.id}`}>{user.user.username}</Link></p>
                            <p>Full Name: {user.user.first_name} {user.user.last_name} </p>
                            <p>User Type: {user.user.is_staff ? 'Admin' : 'Author'}</p>
                            <button onClick={() => changeActiveState(user)}>Deactivate</button>
                        </div>
                    })}
                </div>

                <div className="deactivatedUsers">
                    <h1 className="userListHead">Deactivated Users</h1>
                    {inactiveUsers.map((user) => {
                        return <div key={user.id} className="user">
                            <p>Display Name: <Link to={`/users/${user.id}`}>{user.user.username}</Link></p>
                            <p>Full Name: {user.user.first_name} {user.user.last_name} </p>
                            <p>User Type: {user.user.is_staff ? 'Admin' : 'Author'}</p>
                            <button onClick={() => changeActiveState(user)}>Reactivate</button>
                        </div>
                    })}

                </div>

            </div>

            <Dialog open={warningDiag} onClose={toggleWarningDiag}>
                <DialogTitle className="newReaction-title">Don't Deactivate Yourself!</DialogTitle>
                <div className="newReaction-btns">
                    <div className="reaction-btn"><Button className="reaction-btn" variant="outlined" onClick={toggleWarningDiag}>Ok</Button></div>
                </div>
            </Dialog>

            <Dialog open={confirmDiag} onClose={toggleConfirm}>
                <DialogTitle className="newReaction-title">Are You Sure You Want to Deactivate This User?</DialogTitle>
                <div className="newReaction-btns">
                    <div className="reaction-btn"><Button className="reaction-btn" variant="outlined" 
                    onClick={() => {
                        deactivateUser(user.id).then(alertNewState)
                        toggleConfirm()
                    }}>Deactivate</Button></div>
                    <div className="reaction-btn"><Button className="reaction-btn" variant="outlined" onClick={toggleConfirm}>Cancel</Button></div>

                </div>
            </Dialog>

        </>
    )
}



