import React, { Component } from "react"
import Axios from "axios"
import { Link } from "gatsby"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"

import Layout from "../components/layout"

class IndexPage extends Component {
  state = {
    username: ``,
    password: ``,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let data = {
      user: {
        username: this.state.username,
        password: this.state.password,
      },
    }
    Axios.post(
      "https://build-week-civil-disobedients.herokuapp.com/auth/users/login/",
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
        <h1>Log in</h1>
        <form
          method="post"
          onSubmit={event => {
            this.handleSubmit(event)
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
              name="password"
              onChange={this.handleUpdate}
            />
          </label>
          <input type="submit" value="Log In" />
        </form>
        <p>
          Don't have an account yet? <Link to="/signup">Sign Up</Link>
        </p>
      </Layout>
    )
  }
}
export default IndexPage
