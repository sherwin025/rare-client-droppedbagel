import React, { useEffect, useState } from "react"
import { useParams, useHistory, Link, useLocation } from "react-router-dom"
import { getAllUsers, activateUser, deactivateUser, removeAdmin, makeAdmin, addDemotion, deleteDemotion } from './userManager'
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
    const [adminDiag, setAdminDiag] = useState(false)
    const toggleAdminDiag = () => setAdminDiag(!adminDiag)

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
        const currentDemotion = user.demotions?.find(demotion => demotion.deactivate === true)
        if (user.user.is_active) {
            if (user.id === userId) {
                toggleWarningDiag()
            } else if (currentDemotion && currentDemotion.first_approver.id === parseInt(localStorage.getItem('userid'))) {
                deleteDemotion(currentDemotion.id).then(alertNewState)
            } else if (currentDemotion) {
                setUser(user)
                toggleConfirm()
            } else {
                const newDemotion = {
                    userId: user.id,
                    deactivate: true,
                    demote: false
                }
                addDemotion(newDemotion).then(alertNewState)
            }
        }
        else {
            for (const demotion of user.demotions) {
                deleteDemotion(demotion.id)
            }
            activateUser(user.id).then(alertNewState)
        }
    }

    const changeAdminState = (user) => {
        const currentDemotion = user.demotions?.find(demotion => demotion.demote === true)
        if (user.user.is_staff) {
            if (currentDemotion && currentDemotion.first_approver.id === parseInt(localStorage.getItem('userid'))) {
                deleteDemotion(currentDemotion.id).then(alertNewState)
            } else if (currentDemotion) {
                // check if there is at least one user with is_staff true
                const admins = activeUsers.filter(user => user.user.is_staff)
                admins.length > 1
                    ? removeAdmin(user.id).then(() => {
                        const adminDemotions = user.demotions?.filter(demotion => demotion.demote === true)
                        for (const demotion of adminDemotions) {
                            deleteDemotion(demotion.id)
                        }
                        alertNewState()
                    })
                    : toggleAdminDiag()

            } else {
                const newDemotion = {
                    userId: user.id,
                    deactivate: false,
                    demote: true
                }
                addDemotion(newDemotion).then(alertNewState)
            }
        } else {
            for (const demotion of user.demotions) {
                deleteDemotion(demotion.id)
            }
            makeAdmin(user.id).then(alertNewState)
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
                            {
                                user.demotions?.find(demotion => demotion.deactivate === true)
                                    ? <div className="recommendDeactivate">Recommended for Deactivation</div>
                                    : ""
                            }
                            {
                                user.demotions?.find(demotion => demotion.demote === true)
                                    ? <div className="recommendDemote">Recommended for Demotion to Author</div>
                                    : ""
                            }



                            <button onClick={() => changeActiveState(user)}>
                                {
                                    user.demotions?.find(demotion => demotion.deactivate === true)
                                        ? user.demotions?.find(demotion => demotion.deactivate === true && demotion.first_approver.id === parseInt(localStorage.getItem('userid')))
                                            ? "Remove Recommendation to Deactivate"
                                            : "Deactivate"
                                        : "Recommend Deactivate"
                                }
                            </button>
                            {

                            }
                            <button onClick={() => changeAdminState(user)}>
                                {
                                    user.user.is_staff
                                        ? user.demotions?.find(demotion => demotion.demote === true)
                                            ? user.demotions?.find(demotion => demotion.demote === true && demotion.first_approver.id === parseInt(localStorage.getItem('userid')))
                                                ? "Remove Recommendation to Demote"
                                                : "Demote"
                                            : "Recommend Demotion"
                                        : "Make Admin"
                                }
                            </button>

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

            <Dialog open={adminDiag} onClose={toggleAdminDiag}>
                <DialogTitle className="newReaction-title">There needs to be at least one active admin.</DialogTitle>
                <DialogContent>Please make another user an admin before demoting this user.</DialogContent>
                <div className="newReaction-btns">
                    <div className="reaction-btn"><Button className="reaction-btn" variant="outlined" onClick={toggleAdminDiag}>Ok</Button></div>
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



