import React, { Component } from "react"
import { Link } from "gatsby"
import axios from "axios"

import { GiSwordman } from "react-icons/gi";
import Layout from "../components/layout"
import SEO from "../components/seo"
// import { backendURL } from "../../gatsby-config"

import "./game.css"

class SecondPage extends Component {
  state = {
    playerX: 0,
    playerY: 0,
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
    ],
    backendURL: "https://build-week-civil-disobedients.herokuapp.com"
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyPressed, false);
    this.getRooms();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyPressed, false);
  }

  getRooms = () => {
      axios.get(`${this.state.backendURL}/api/rooms`, { headers: { "Access-Control-Allow-Origin": "*" } })
    // axios.get(`${this.state.backendURL}/api/rooms`, { headers: { "Authorization": "Bearer " + "6493c3550c33600a9445e035f5a06a5648bbc3ce"} })
      .then(res => {
        console.log(res.data)
        // this.setState({ maze: res.data.rooms });
      })
      .catch(err => {
        console.log(err)
      })
  }

  initialize = () => {
    axios.get(`${this.state.backendURL}/api/adv/init`, { headers: { "Authorization": "Bearer 6493c3550c33600a9445e035f5a06a5648bbc3ce"} })
      .then(res => {
        const { uuid, ...newState} = res.data;
        this.setState(newState);
      })
      .catch(err => {
        console.log(err)
      })
  }

  move = direction => {
    // axios.post("https://lambda-mud-test.herokuapp.com/api/adv/move", { direction: direction}, { headers: { "Authorization": "Bearer 6493c3550c33600a9445e035f5a06a5648bbc3ce"} })
    //   .then(res => {
    //     if (res.data.error_msg.length > 0) {
    //       console.log(res.data.error_msg)
    //     } else {
    //       this.setState(res.data);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    switch(direction) {
      case "n":
        if (!this.state.maze[this.state.playerY][this.state.playerX].n) {
          this.setState({ playerY: this.state.playerY - 1 })
        }
        break;
      case "e":
        if (!this.state.maze[this.state.playerY][this.state.playerX].e) {
          this.setState({ playerX: this.state.playerX + 1 })
        }
        break;
      case "s":
        if (!this.state.maze[this.state.playerY][this.state.playerX].s) {
          this.setState({ playerY: this.state.playerY + 1 })
        }
        break;
      case "w":
        if (!this.state.maze[this.state.playerY][this.state.playerX].w) {
          this.setState({ playerX: this.state.playerX - 1 })
        }
        break;
      default:
        break;
    }
  }

  keyPressed = e => {
    if (e.key === "ArrowUp" || e.key === "w") {
      e.preventDefault();
      this.move("n");
    }
    if (e.key === "ArrowDown" || e.key === "s") {
      e.preventDefault();
      this.move("s");
    }
    if (e.key === "ArrowLeft" || e.key === "a") {
      e.preventDefault();
      this.move("w");
    }
    if (e.key === "ArrowRight" || e.key === "d") {
      e.preventDefault();
      this.move("e");
    }
  }

  render() {
    const { playerX, playerY, name, title, description, players } = this.state;
    return (
      <Layout>
        <script src="https://d3js.org/d3.v3.min.js" charSet="utf-8"></script>
        <SEO title="The Maze" />
        <h1>Hi from the second page</h1>
        <div id="mapBox">
          {this.state.maze.map((row, row_index) => {
            return row.map((cell, column_index) => {
              const processedClass = `mapCell${cell.n || row_index === 0 ? " north" : ""}${cell.e || column_index === row.length-1 ? " east" : ""}${cell.s || row_index === this.state.maze.length-1 ? " south" : ""}${cell.w || column_index === 0 ? " west" : ""}`
              if (row_index === playerY && column_index === playerX) {
                return <span key={row_index + column_index} className={processedClass} data-x={row_index} data-y={column_index}><GiSwordman /></span>
              }
              return <span key={row_index + column_index} className={processedClass} data-x={row_index} data-y={column_index} />
            })
          })}
        </div>
        <div>
          <h2>{name}</h2>
          <p>{title}</p>
          <p>{description}</p>
          <p>
            Players:
            {players.map(p => <span key={p}>{" " + p}</span>)}
          </p>
        </div>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    )
  }
}

export default SecondPage
