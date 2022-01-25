import React, { useEffect, useState } from "react"
import { useParams, useHistory, Link, useLocation} from "react-router-dom"
import {getAllUsers} from './userManager'


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
               { users.map((user) => {
                   return <div>
                            <p>UserName: <Link to={`/users/${user.id}`}>{user.username}</Link></p>
                            <p>Full Name: {user.first_name} {user.last_name} </p>
                            <p>Email: {user.email}</p>
                        </div>
                }) }
            </>
        )
}