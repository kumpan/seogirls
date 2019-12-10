import React from "react"
import { Link } from "gatsby"

import Nav from "./nav.js"

import styles from "./hero.module.css"

class Hero extends React.Component {
  render() {
    return (
      <header className={styles.hero}>
        <Nav />
        <div className={styles.container}>
          <h1>Vi anordnar träffar & evenemang för tjejer inom SEO-branschen</h1>
          <p>
            <Link to="/">Se kommande evenemang →</Link>
          </p>
        </div>
      </header>
    )
  }
}

export default Hero
