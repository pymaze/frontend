import React from "react"
import { Link } from "gatsby"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"
import Axios from "axios"

import Layout from "../components/layout"

class Signup extends React.Component {
  state = {
    username: ``,
    password1: ``,
    password2: ``,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleRegister = e => {
    e.preventDefault()
    let data = {
      user: {
        username: this.state.username,
        password: this.state.password1,
      },
    }
    Axios.post(
      "https://build-week-civil-disobedients.herokuapp.com/auth/users/",
      data
    )
      .then(res => {
        window.localStorage.setItem("py-maze-jwt", res.data.user.token)
        navigate("/game")
      })
      .catch(err => {
        this.setState({ isLoading: false })
        console.log(err)
      })
  }

  render() {
    if (isLoggedIn() !== false) {
      navigate(`/game/`)
    }

    return (
      <Layout>
        <h1>Register</h1>
        <form
          method="post"
          onSubmit={event => {
            this.handleRegister(event)
          }}
        >
          <label>
            Username
            <input type="text" name="username" onChange={this.handleUpdate} />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password1"
              onChange={this.handleUpdate}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password2"
              onChange={this.handleUpdate}
            />
          </label>
          {this.state.password1 !== this.state.password2 ||
          this.state.password1.length <= 8 ||
          this.state.password1 === "password" ? null : (
            <input type="submit" value="Register" />
          )}
        </form>
        {this.state.password1 !== this.state.password2 ? (
          <p>Please make sure that passwords match</p>
        ) : null}
        {this.state.password1.length <= 8 ? (
          <p>Your password needs to be longer than 8 characters</p>
        ) : null}
        {this.state.password1 === "password" ? (
          <p>That password is too easy, pick a different one</p>
        ) : null}
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </Layout>
    )
  }
}
export default Signup
