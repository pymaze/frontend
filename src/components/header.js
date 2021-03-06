import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn, logout } from "../services/auth"
import Maze from "../images/maze.png"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 1200,
        padding: `1.45rem 1.0875rem`,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h1 style={{ margin: 0 }}>
        <img src={Maze} alt="maze-logo" className="header-logo" />
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
            fontFamily: ``,
          }}
        >
          PyMaze
        </Link>
      </h1>
      {isLoggedIn() ? (
        <a
          style={{
            color: "rebeccapurple",
            textDecoration: "none",
            background: "white",
            padding: "0 1em",
            lineHeight: "2.5",
            fontWeight: "bold",
            borderRadius: "7px 0",
          }}
          href="/"
          onClick={event => {
            event.preventDefault()
            logout(() => navigate(`/`))
          }}
        >
          Logout
        </a>
      ) : (
        <a
          style={{
            color: "rebeccapurple",
            textDecoration: "none",
            background: "white",
            padding: "0 1em",
            lineHeight: "2.5",
            fontWeight: "bold",
            borderRadius: "7px 0",
          }}
          href="/"
          onClick={event => {
            event.preventDefault()
            logout(() => navigate(`/login/`))
          }}
        >
          Login
        </a>
      )}
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
