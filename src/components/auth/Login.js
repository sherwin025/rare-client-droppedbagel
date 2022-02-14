import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { loginUser } from "./AuthManager"
import "./auth.css"
import Logo from "../nav/rare.jpeg" 

export const Login = ({ setToken }) => {
  const username = useRef()
  const password = useRef()
  const history = useHistory()
  const [isUnsuccessful, setisUnsuccessful] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value
    }

    loginUser(user).then(res => {
      if ("valid" in res && res.valid) {
        setToken(res.token, res.userid)
        history.push("/")
      }
      else {
        setisUnsuccessful(true)
      }
    })
  }

  return (
    <section className="columns is-centered">
      <form className="centered" onSubmit={handleLogin}>
        <h1 className="title centered raretitle">Rare</h1>
        <div className="imgbox">
          <img src={Logo} className="imgcentered" />
        </div>
        <div className="field centered">
          <div className="control">
            <input className="input" type="text" placeholder="Username" ref={username} />
          </div>
        </div>

        <div className="field centered">
          <div className="control">
            <input className="input" type="password" placeholder="Password" ref={password} />
          </div>
        </div>

        <div className="field centered">
            <button className="input loginbtn" type="submit" >Login</button>
          </div>


          <div className="field">
            <Link to="/register" className="button is-link is-light">Don't have an account yet? Click here to sign up!</Link>
          </div>
        {
          isUnsuccessful ? <p className="help is-danger">Username or password not valid</p> : ''
        }
      </form>
    </section>
  )
}
