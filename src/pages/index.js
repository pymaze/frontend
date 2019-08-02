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
    isLoading: false,
    signInError: false,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      isLoading: true,
    })
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
        this.setState({
          isLoading: false,
        })
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          signInError: true,
        })
        console.log(err)
      })
  }

  render() {
    if (isLoggedIn() !== false) {
      navigate(`/game/`)
    }

    return (
      <Layout>
        <h1 className="sign-up-header">Log In</h1>
        <form
          className="form-container"
          method="post"
          onSubmit={event => {
            this.handleSubmit(event)
          }}
        >
          <div className="form-group">
            <input
              type="text"
              required="required"
              name="username"
              onChange={this.handleUpdate}
            />
            <label className="control-label">Username</label>
            <i className="bar"></i>
          </div>

          <div className="form-group">
            <input
              type="password"
              required="required"
              name="password"
              onChange={this.handleUpdate}
            />
            <label className="control-label">Password</label>
            <i className="bar"></i>
          </div>
          <div className="button-container">
            <button
              type="button"
              className="button"
              onClick={event => {
                this.handleSubmit(event)
              }}
            >
              {this.state.isLoading === true ? (
                <span>...</span>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
          {this.state.signInError === true ? (
            <p className="warning-message">Username/Password not found</p>
          ) : null}
          <p>
            Don't have an account yet? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </Layout>
    )
  }
}
export default IndexPage
