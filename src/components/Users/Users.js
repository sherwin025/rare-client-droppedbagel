import React, { useEffect, useState } from "react"
import { useParams, useHistory, Link, useLocation} from "react-router-dom"
import {getAllUsers} from './userManager'
import "./user.css"


export const Users = () => {
    
        // Use States
        //-------------------------------------------------------------------------------------------------------------------
        const [users, setUsers] = useState([])
    
        // Use Effects
        //-------------------------------------------------------------------------------------------------------------------
    
        useEffect(
            () => {
                getAllUsers()
                    .then((data) => {
                        setUsers(data)
                    })
            },
            []
        )

        return (
            <>
            <div className="userBlock">
            <h1 className="userListHead">Users</h1>
               { users.map((user) => {
                   return <div className="user">
                            <p>UserName: <Link to={`/users/${user.id}`}>{user.user.username}</Link></p>
                            <p>Full Name: {user.user.first_name} {user.user.last_name} </p>
                            <p>Email: {user.user.email}</p>
                        </div>
                }) }
                </div>
            </>
        )
}