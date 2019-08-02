import React, { Component } from "react"
// import { Link } from "gatsby"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"
import MazeMan from "../images/MazeMan.jpg"

import Layout from "../components/layout"

class IndexPage extends Component {
  render() {
    if (isLoggedIn() !== false) {
      navigate(`/game/`)
    }

    return (
      <Layout>
        <div className="splash-body">
          <img
            src={MazeMan}
            alt="background picture of maze"
            className="background-logo"
          />
          <div className="splash splash-body">
            <h1 className="splash-header">PyMaze</h1>
            <p className="splash-body">
              The maze is an algorithmically generated grid of walls and rooms
              made in Django. Be careful or you might run into another player or
              two!{" "}
            </p>

            <p className="splash-body">
              Use the 'W' 'A' 'S' 'D' keys to navigate the maze.
            </p>
          </div>
        </div>
      </Layout>
    )
  }
}
export default IndexPage
