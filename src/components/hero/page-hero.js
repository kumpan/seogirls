import React from "react"

import Nav from "../nav"

import styles from "./page-hero.module.css"

class PageHero extends React.Component {
  render() {
    const { title, subheading } = this.props

    return (
      <header className={styles.hero}>
        <Nav />
        <div className={styles.container}>
          <h1>{title}</h1>
          <p className={styles.subheading}>{subheading}</p>
        </div>
      </header>
    )
  }
}

export default PageHero
