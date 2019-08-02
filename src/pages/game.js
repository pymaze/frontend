import React, { Component } from "react"
// import { Link } from "gatsby"
import { GiSwordman, GiFlexibleStar } from "react-icons/gi"
import axios from "axios"
import jwtDecode from "jwt-decode"
import {
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { isLoggedIn } from "../services/auth"
import styled from "styled-components"

const GameWrapper = styled.div`
  max-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;
  width: 60%;
`
const DisplayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const GameControls = styled.div`
  width: 20em;
  align-self: flex-end;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat() (3, 1fr);
  grid-template-rows: repeat(2, 3em);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  align-content: center;
  .control {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px solid brown;
  }
  .control:first-child {
    grid-area: 1 / 1 / 3 / 2;
  }
  .control:nth-child(2) {
    grid-area: 1 / 2 / 2 / 3;
  }

  .control:nth-child(3) {
    grid-area: 2 / 2 / 3 / 3;
  }

  .control:last-child {
    grid-area: 1 / 3 / 3 / 4;
  }
`

const GameSquare = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-width: 0px;
  border-color: #f7f7f7;
  height: ${props => `calc(100% / ${props.rows}em)`};
  .player {
    height: 100%;
    font-size: 4em;
    fill: #f7f7f7;
  }

  border-top-width: ${({ border }) => (border.top ? `1px` : "0px")};
  border-right-width: ${({ border }) => (border.right ? `1px` : "0px")};
  border-bottom-width: ${({ border }) => (border.bottom ? `1px` : "0px")};
  border-left-width: ${({ border }) => (border.left ? `1px` : "0px")};
`

const GameBox = styled.div`
  height: 60vh;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, 1fr)`};
  grid-auto-rows: ${props => `calc(100% / ${props.columns})`};
  background: #1a1e28;
`

class SecondPage extends Component {
  state = {
    playerX: 0,
    playerY: 0,
    error_msg: "",
    name: "", // *** Name of the logged-in player
    players: [], // *** Players in the current room
    maze: [],
    backendURL: "https://build-week-civil-disobedients.herokuapp.com",
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyPressed, false)
    this.getRooms()
    isLoggedIn()
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyPressed, false)
  }

  getRooms = () => {
    const token = localStorage.getItem("py-maze-jwt")
    const decoded = jwtDecode(token)
    axios
      .get(`${this.state.backendURL}/api/rooms/`, {
        headers: { Authorization: token },
      })
      .then(res => {
        this.setState({ maze: res.data, name: decoded.id })
      })
      .catch(err => {
        console.log(err)
      })
  }

  playerPut = (name, title, token) => {
    axios
      .put(
        `${this.state.backendURL}/auth/users/move/`,
        {
          user: {
            username: name,
            current_room: title,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(res => {
        if (this.state.error_msg) {
          this.setState({ error_msg: "" })
        }
      })
      .catch(err => {
        console.log(err)
        this.setState({ error_msg: err })
      })
  }

  currentRoom = () => this.state.maze[this.state.playerY][this.state.playerX]

  move = direction => {
    const token = localStorage.getItem("py-maze-jwt")
    const decoded = jwtDecode(token)
    switch (direction) {
      case "n":
        if (this.state.playerY > 0 && !this.currentRoom().n) {
          this.setState({ playerY: this.state.playerY - 1 })
          this.playerPut(decoded.id, this.currentRoom().title, token)
        }
        break
      case "e":
        if (
          this.state.maze.length &&
          this.state.playerX < this.state.maze[0].length - 1 &&
          !this.currentRoom().e
        ) {
          this.setState({ playerX: this.state.playerX + 1 })
          this.playerPut(decoded.id, this.currentRoom().title, token)
        }
        break
      case "s":
        if (
          this.state.maze.length &&
          this.state.playerY < this.state.maze.length - 1 &&
          !this.currentRoom().s
        ) {
          this.setState({ playerY: this.state.playerY + 1 })
          this.playerPut(decoded.id, this.currentRoom().title, token)
        }
        break
      case "w":
        if (this.state.playerX > 0 && !this.currentRoom().w) {
          this.setState({ playerX: this.state.playerX - 1 })
          this.playerPut(decoded.id, this.currentRoom().title, token)
        }
        break
      default:
        break
    }
  }

  keyPressed = e => {
    e.preventDefault()
    if (e.key === "ArrowUp" || e.key === "w") {
      this.move("n")
    }
    if (e.key === "ArrowDown" || e.key === "s") {
      this.move("s")
    }
    if (e.key === "ArrowLeft" || e.key === "a") {
      this.move("w")
    }
    if (e.key === "ArrowRight" || e.key === "d") {
      this.move("e")
    }
  }

  render() {
    const { playerX, playerY, name, maze, players, error_msg } = this.state

    const getBorders = (row, row_i, cell, col_i) => ({
      top: cell.n || row_i === 0,
      right: cell.e || col_i === row.length - 1,
      bottom: cell.s || row_i === maze.length - 1,
      left: cell.w || col_i === 0,
    })

    const GameRows = () =>
      maze.map((row, row_i) =>
        row.map((cell, col_i) => (
          <GameSquare
            key={row_i + col_i}
            data-x={row_i}
            data-y={col_i}
            border={getBorders(row, row_i, cell, col_i)}
          >
            {row_i === playerY && col_i === playerX ? (
              <GiSwordman className="player" />
            ) : null}
          </GameSquare>
        ))
      )

    if (!maze.length) return <h1>Loading...</h1>
    if (error_msg) return <h1>{error_msg}</h1>
    return (
      <Layout>
        <SEO title="The Maze" />
        <h1>The Maze</h1>
        <DisplayWrapper>
          <GameWrapper>
            <GameBox columns={maze[0].length} rows={maze.length}>
              <GameRows />
            </GameBox>
          </GameWrapper>
          <div
            style={{
              width: "38%",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <>
              <h2>{name}</h2>
              <h2>Current location: {this.currentRoom().title}</h2>
              <h4>
                Players in room: {name} (you)
                {players.map(p => (
                  <span key={p}>{", " + p}</span>
                ))}
              </h4>
              <h4>{this.currentRoom().description}</h4>
            </>
            <GameControls>
              <div className="control" onClick={() => this.move("w")}>
                <FontAwesomeIcon icon={faChevronLeft} size="2x" />
              </div>
              <div className="control" onClick={() => this.move("n")}>
                <FontAwesomeIcon icon={faChevronUp} size="2x" />
              </div>
              <div className="control" onClick={() => this.move("s")}>
                <FontAwesomeIcon icon={faChevronDown} size="2x" />
              </div>
              <div className="control" onClick={() => this.move("e")}>
                <FontAwesomeIcon icon={faChevronRight} size="2x" />
              </div>
            </GameControls>
          </div>
        </DisplayWrapper>
        {/* <Link to="/">Go back to the homepage</Link> */}
      </Layout>
    )
  }
}

export default SecondPage
