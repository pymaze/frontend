import React from "react"
import { Link } from "gatsby"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"

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

  handleSubmit = event => {
    event.preventDefault()
    handleLogin(this.state)
  }

  render() {
    if (isLoggedIn()) {
      navigate(`/game/`)
    }

    return (
      <Layout>
        <h1>Log in</h1>
        <form
          method="post"
          onSubmit={event => {
            this.handleSubmit(event)
            navigate(`/game/`)
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
          <input type="submit" value="Log In" />
        </form>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </Layout>
    )
  }
}
export default Signup
