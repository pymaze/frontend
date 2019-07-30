import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "./page-2.css"

class SecondPage extends Component {
  state = {
    maze: [
      [{ "n": false, "e": false, "s": true, "w": false }, { "n": false, "e": true, "s": false, "w": false }, { "n": false, "e": false, "s": true, "w": true }, { "n": false, "e": false, "s": false, "w": false }],
      [{ "n": true, "e": true, "s": false, "w": false }, { "n": false, "e": false, "s": true, "w": true }, { "n": true, "e": true, "s": false, "w": false }, { "n": false, "e": false, "s": false, "w": true }],
      [{ "n": false, "e": false, "s": true, "w": false }, { "n": true, "e": false, "s": true, "w": false }, { "n": false, "e": false, "s": false, "w": false }, { "n": false, "e": false, "s": false, "w": false }],
      [{ "n": true, "e": true, "s": false, "w": false }, { "n": true, "e": false, "s": false, "w": true }, { "n": false, "e": true, "s": true, "w": false }, { "n": false, "e": false, "s": false, "w": true }]
    ]
  }

  render() {
    return (
      <Layout>
        <script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
        <SEO title="The Maze" />
        <h1>Hi from the second page</h1>
        <div id="mapBox">
          {this.state.maze.map((row, row_index) => {
            console.log("first map")
            return row.map((cell, column_index) => {
              console.log("second_map")
              return <span className={`mapCell${cell.n || row_index === 0 ? " north" : ""}${cell.e || column_index === row.length-1 ? " east" : ""}${cell.s || row_index === this.state.maze.length-1 ? " south" : ""}${cell.w || column_index === 0 ? " west" : ""}`} data-x={row_index} data-y={column_index}></span>
            })
          })}
        </div>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    )
  }
}

export default SecondPage
