import React from "react"
import { Link } from "gatsby"

import Nav from "./nav.js"
import StarsOne from "../../content/assets/stars-1.svg"
import StarsTwo from "../../content/assets/stars-2.svg"
import StarsThree from "../../content/assets/stars-3.svg"

import styles from "./hero.module.css"

class Hero extends React.Component {
  render() {
    const { title, subtitle, link } = this.props

    return (
      <header className={styles.hero}>
        <Nav />
        <div className={styles.container}>
          <h1>{title}</h1>
          <Link to={link}>{subtitle}</Link>
        </div>
        <div className={styles.stars}>
          <StarsOne />
          <StarsTwo />
          <StarsThree />
        </div>
      </header>
    )
  }
}

export default Hero
