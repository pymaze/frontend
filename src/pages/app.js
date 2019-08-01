import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import SecondPage from "./game"
import Signup from "./signup"

const App = () => (
  <Layout>
    <Router>
      <Signup path="/app/signup" />
      <PrivateRoute path="/game/" component={SecondPage} />
    </Router>
  </Layout>
)

export default App
