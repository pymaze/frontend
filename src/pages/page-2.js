import React, { Component } from "react"
import { Link } from "gatsby"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "./page-2.css"

class SecondPage extends Component {
  state = {
    error_msg: "",
    name: "",           // *** Name of the logged-in player
    title: "",          // *** Title of the current room
    description: "",    // *** Description of the current room
    players: [],        // *** Players in the current room
    maze: [
      [{ "n": false, "e": false, "s": true, "w": false }, { "n": false, "e": true, "s": false, "w": false }, { "n": false, "e": false, "s": true, "w": true }, { "n": false, "e": false, "s": false, "w": false }],
      [{ "n": true, "e": true, "s": false, "w": false }, { "n": false, "e": false, "s": true, "w": true }, { "n": true, "e": true, "s": false, "w": false }, { "n": false, "e": false, "s": false, "w": true }],
      [{ "n": false, "e": false, "s": true, "w": false }, { "n": true, "e": false, "s": true, "w": false }, { "n": false, "e": false, "s": false, "w": false }, { "n": false, "e": false, "s": false, "w": false }],
      [{ "n": true, "e": true, "s": false, "w": false }, { "n": true, "e": false, "s": false, "w": true }, { "n": false, "e": true, "s": true, "w": false }, { "n": false, "e": false, "s": false, "w": true }]
    ]
  }

  componentDidMount() {
    axios.get("https://lambda-mud-test.herokuapp.com/api/adv/init", { headers: { "Authorization": "bearer " + "6493c3550c33600a9445e035f5a06a5648bbc3ce"} })
      .then(res => {
        const { uuid, ...newState} = res.data;
        this.setState(newState);
      })
      .catch(err => {
        console.log(err)
      })
  }

  move(direction) {
    axios.post("https://lambda-mud-test.herokuapp.com/api/adv/move", { direction: direction}, { headers: { "Authorization": "Bearer " + "6493c3550c33600a9445e035f5a06a5648bbc3ce"} })
      .then(res => {
        if (res.data.error_msg.length > 0) {
          console.log(res.data.error_msg)
        } else {
          this.setState(res.data);
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { name, title, description, players, maze } = this.state;
    return (
      <Layout>
        <script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
        <SEO title="The Maze" />
        <h1>Hi from the second page</h1>
        <div id="mapBox">
          {this.state.maze.map((row, row_index) => {
            return row.map((cell, column_index) => {
              return <span className={`mapCell${cell.n || row_index === 0 ? " north" : ""}${cell.e || column_index === row.length-1 ? " east" : ""}${cell.s || row_index === this.state.maze.length-1 ? " south" : ""}${cell.w || column_index === 0 ? " west" : ""}`} data-x={row_index} data-y={column_index}></span>
            })
          })}
        </div>
        <div>
          <h2>{name}</h2>
          <p>{title}</p>
          <p>{description}</p>
          <p>
            Players:
            {players.map(p => <span>{" " + p}</span>)}
          </p>
        </div>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    )
  }
}

export default SecondPage
