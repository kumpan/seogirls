import React from "react"
import { Link } from "gatsby"

import Nav from "./nav.js"
import StarsOne from "../../content/assets/stars-1.svg"
import StarsTwo from "../../content/assets/stars-2.svg"
import StarsThree from "../../content/assets/stars-3.svg"

import styles from "./hero.module.css"

class Hero extends React.Component {
  render() {
    return (
      <header className={styles.hero}>
        <Nav />
        <div className={styles.container}>
          <h1>
            Utvecklas och umgås med andra tjejer inom SEO och growth hacking
          </h1>
          <Link to="/">Se kommande evenemang</Link>
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
