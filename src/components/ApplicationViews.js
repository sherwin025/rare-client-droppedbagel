import React from "react"
import { Route } from "react-router-dom"
import { Users } from "./Users/Users"
import { UserPage } from "./Users/UserPage"

export const ApplicationViews = () => {
  return (
    <>
      <h1 >Welcome to Rare Publishing</h1>

      <Route exact path="/users">
        <Users />
      </Route>
    

      <Route exact path="/users/:userId">
        <UserPage />
      </Route>

      </>
  )
}
