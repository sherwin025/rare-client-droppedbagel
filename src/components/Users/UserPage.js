import React, { useEffect, useState } from "react"
import { useParams, useHistory, Link, useLocation} from "react-router-dom"
import {getSingleUser} from './userManager'

export const UserPage = () => {
    const { userId } = useParams()


     // Use States
        //-------------------------------------------------------------------------------------------------------------------
        const [user, setUsers] = useState([])
    
        // Use Effects
        //-------------------------------------------------------------------------------------------------------------------
    
        useEffect(
            () => {
                getSingleUser(userId)
                    .then((data) => {
                        setUsers(data)
                    })
            },
            []
        )

        return (
            <>
               
                <div>
                    <p>Full Name: {user.first_name} {user.last_name} </p>
                    <p>Profile Image: {user.profile_image_url}</p>
                    <p>Username: {user.username}</p>
                    <p>Created: {user.created_on}</p>
                    <p>Bio: {user.bio}</p>
                </div>
             
            </>
        )
}