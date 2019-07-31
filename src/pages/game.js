import React, { Component } from "react"
import { Link } from "gatsby"
import { GiSwordman } from "react-icons/gi"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from "styled-components"

const GameWrapper = styled.div`
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const GameSquare = styled.div`
  border-style: solid;
  height: ${props => `calc(100% / ${props.rows}em)`};
  border-color: black;
  border-top-width: ${({ border }) => (border.top ? `1px` : "0px")};
  border-right-width: ${({ border }) => (border.right ? `1px` : "0px")};
  border-bottom-width: ${({ border }) => (border.bottom ? `1px` : "0px")};
  border-left-width: ${({ border }) => (border.left ? `1px` : "0px")};
`

const GameBox = styled.div`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, 1fr)`};
  grid-auto-rows: 10em;
  ${GameSquare} {
    height: 100%;
  }
`

class SecondPage extends Component {
  state = {
    playerX: 0,
    playerY: 0,
    error_msg: "",
    name: "", // *** Name of the logged-in player
    title: "", // *** Title of the current room
    description: "", // *** Description of the current room
    players: [], // *** Players in the current room
    maze: [
      [
        { n: false, e: false, s: true, w: false },
        { n: false, e: true, s: false, w: false },
        { n: false, e: false, s: true, w: true },
        { n: false, e: false, s: false, w: false },
      ],
      [
        { n: true, e: true, s: false, w: false },
        { n: false, e: false, s: true, w: true },
        { n: true, e: true, s: false, w: false },
        { n: false, e: false, s: false, w: true },
      ],
      [
        { n: false, e: false, s: true, w: false },
        { n: true, e: false, s: true, w: false },
        { n: false, e: false, s: false, w: false },
        { n: false, e: false, s: false, w: false },
      ],
      [
        { n: true, e: true, s: false, w: false },
        { n: true, e: false, s: false, w: true },
        { n: false, e: true, s: true, w: false },
        { n: false, e: false, s: false, w: true },
      ],
    ],
    backendURL: "https://build-week-civil-disobedients.herokuapp.com",
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyPressed, false)
    this.getRooms()
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyPressed, false)
  }

  getRooms = () => {
    axios
      .get(`${this.state.backendURL}/api/rooms`, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  initialize = () => {
    axios
      .get(`${this.state.backendURL}/api/adv/init`, {
        headers: {
          Authorization: "Bearer 6493c3550c33600a9445e035f5a06a5648bbc3ce",
        },
      })
      .then(res => {
        const { uuid, ...newState } = res.data
        this.setState(newState)
      })
      .catch(err => {
        console.log(err)
      })
  }

  move = direction => {
    switch (direction) {
      case "n":
        if (
          this.state.playerY > 0 &&
          !this.state.maze[this.state.playerY][this.state.playerX].n
        ) {
          this.setState({ playerY: this.state.playerY - 1 })
        }
        break
      case "e":
        if (
          this.state.playerX < this.state.maze[0].length - 1 &&
          !this.state.maze[this.state.playerY][this.state.playerX].e
        ) {
          this.setState({ playerX: this.state.playerX + 1 })
        }
        break
      case "s":
        if (
          this.state.playerY < this.state.maze.length - 1 &&
          !this.state.maze[this.state.playerY][this.state.playerX].s
        ) {
          this.setState({ playerY: this.state.playerY + 1 })
        }
        break
      case "w":
        if (
          this.state.playerX > 0 &&
          !this.state.maze[this.state.playerY][this.state.playerX].w
        ) {
          this.setState({ playerX: this.state.playerX - 1 })
        }
        break
      default:
        break
    }
    console.log(this.state.playerX, this.state.playerY)
  }

  keyPressed = e => {
    if (e.key === "ArrowUp" || e.key === "w") {
      e.preventDefault()
      this.move("n")
    }
    if (e.key === "ArrowDown" || e.key === "s") {
      e.preventDefault()
      this.move("s")
    }
    if (e.key === "ArrowLeft" || e.key === "a") {
      e.preventDefault()
      this.move("w")
    }
    if (e.key === "ArrowRight" || e.key === "d") {
      e.preventDefault()
      this.move("e")
    }
  }

  render() {
    const { playerX, playerY, name, title, description, players } = this.state

    const getBorders = (row, row_i, cell, col_i) => ({
      top: cell.n || row_i === 0,
      right: cell.e || col_i === row.length - 1,
      bottom: cell.s || row_i === this.state.maze.length - 1,
      left: cell.w || col_i === 0,
    })

    const GameRows = () =>
      this.state.maze.map((row, row_i) =>
        row.map((cell, col_i) => (
          <GameSquare
            key={row_i + col_i}
            data-x={row_i}
            data-y={col_i}
            border={getBorders(row, row_i, cell, col_i)}
          >
            {row_i === playerY && col_i === playerX ? <GiSwordman /> : null}
          </GameSquare>
        ))
      )

    const getColumns = maze => maze[0].length
    const getRows = maze => maze.length

    return (
      <Layout>
        <script src="https://d3js.org/d3.v3.min.js" charSet="utf-8"></script>
        <SEO title="The Maze" />
        <h1>Hi from the second page</h1>
        <GameWrapper>
          <GameBox
            columns={getColumns(this.state.maze)}
            rows={getRows(this.state.maze)}
          >
            <GameRows />
          </GameBox>
        </GameWrapper>
        <div>
          <h2>{name}</h2>
          <p>{title}</p>
          <p>{description}</p>
          <p>
            Players:
            {players.map(p => (
              <span key={p}>{" " + p}</span>
            ))}
          </p>
        </div>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    )
  }
}

export default SecondPage
