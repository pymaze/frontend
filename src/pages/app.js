import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"
import Login from "../components/login"
import SecondPage from "./game"
import Signup from "./signup"

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/profile" component={Profile} />
      <Login path="/app/login" />
      <Signup path="/app/signup" />
      <PrivateRoute path="/game/" component={SecondPage} />
    </Router>
  </Layout>
)

export default App
