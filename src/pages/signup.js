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
    isLoading: false,
    signInError: false,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleRegister = e => {
    e.preventDefault()
    this.setState({
      isLoading: true,
    })
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
        <h1 className="sign-up-header">Register</h1>
        <form
          method="post"
          className="sign-up-form form-container"
          onSubmit={event => {
            this.handleRegister(event)
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
              name="password1"
              onChange={this.handleUpdate}
            />
            <label className="control-label">Password</label>
            <i className="bar"></i>
          </div>

          <div className="form-group">
            <input
              type="password"
              required="required"
              name="password2"
              onChange={this.handleUpdate}
            />
            <label className="control-label">Re-Type Password</label>
            <i className="bar"></i>
          </div>

          {this.state.password1 !== this.state.password2 ||
          this.state.password1.length <= 8 ||
          this.state.password1 === "password" ? null : (
            <div className="button-container">
              <button
                type="button"
                className="button"
                onClick={event => {
                  this.handleRegister(event)
                }}
              >
                {this.state.isLoading === true ? (
                  <span>...</span>
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </div>
          )}
          {this.state.password1 !== this.state.password2 ? (
            <p class="warning-message">Please make sure that passwords match</p>
          ) : null}
          {this.state.password1.length <= 8 ? (
            <p className="warning-message">
              Your password needs to be longer than 8 characters
            </p>
          ) : null}
          {this.state.password1 === "password" ? (
            <p class="warning-message">
              That password is too easy, pick a different one
            </p>
          ) : null}
          {this.state.signInError === true ? (
            <p class="warning-message">
              Error registering user: User already exists
            </p>
          ) : null}
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </Layout>
    )
  }
}
export default Signup
