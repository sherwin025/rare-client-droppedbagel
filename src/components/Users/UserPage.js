import React, { useEffect, useState } from "react"
import { useParams, useHistory, Link, useLocation} from "react-router-dom"
import { deleteSubscription, getSubscriptions, getUsersSubscriptions, uploadSubscription } from "../../apimanager/subscriptionFetches"
import {getSingleUser} from './userManager'
import "./user.css"

export const UserPage = () => {
    const { userId } = useParams()
    const history = useHistory()
    const [usersSubs, setUsersSubs] = useState([])
    const [allSubs, setAllSubs] = useState([])


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

        useEffect(() => {
            getUsersSubscriptions(+localStorage.getItem('userid')).then(setUsersSubs)
        },[])

        useEffect(() => {
            getSubscriptions().then(setAllSubs)
        },[])

        const areTheySubbed = usersSubs.filter(user => {
            if (+user.follower.id === +userId) {
                return true
            }
            return false
        })
        

        const subCount = allSubs.filter((sub) => {
            if (+sub.follower.id === +userId) {
                return true
            }
            return false
        })
        
        const handleSub = (evt) => {
            // evt.preventDefault()
            
            const newSubObj = {
                follower: +user.id,
                author: +localStorage.getItem('userid')
            }
            
            uploadSubscription(newSubObj)
            .then(() => {history.push('/')})
            
            
        }

        const subToDelete = usersSubs.find((sub) => {
            if (sub.follower.id === +userId) {
                return true
            }
            return false
        })
        
        
        return (
            <>
               
                <div className="userBlock"><div className="user">
                    <p>Full Name: {user.user?.first_name} {user.user?.last_name} </p>
                    <img src={`https://dropped-bagels-media-co.herokuapp.com${user.profile_pic}`} alt="hello" />
                    {/* <p>Profile Image: {user.profile_image_url}</p> */}
                    <p>Username: {user.user?.username}</p>
                    <p>Email: {user.user?.username}</p>
                    <p>Created: {user.created_on}</p>
                    <p>Bio: {user.bio}</p>
                </div></div>
                    <div className="subButton">
                        <p className="subCount">Sub Count: {subCount.length} </p>
                { 
                        !! areTheySubbed.length > 0
                        ? <button onClick={() => {
                            deleteSubscription(subToDelete.id).then(() => {history.push('/')})
                        }}>Unsubscribe</button>
                        : <button onClick={handleSub}>Subscribe</button>
                }
                </div>
             
            </>
        )
}