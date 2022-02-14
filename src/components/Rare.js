import React, { useState } from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const Rare = () => {
  const [token, setTokenState] = useState(localStorage.getItem('token'))

  const setToken = (newToken, id) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('userid', id)
    setTokenState(newToken)
  }

  return <>
    {
      token
        ?
        <Route>
          <NavBar token={token} setToken={setToken} />
          <ApplicationViews />
        </Route>
        :
        <Redirect to="/login" />
    }

    <Route exact path="/login" >
      <Login token={token} setToken={setToken} />
    </Route>

    <Route path="/register" exact>
      <Register token={token} setToken={setToken} />
    </Route>

  </>
}
