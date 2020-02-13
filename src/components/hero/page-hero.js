import React from "react"
import { Link } from "gatsby"

import Nav from "../nav"

import styles from "./page-hero.module.css"

class PageHero extends React.Component {
  render() {
    const { title, subheading, shortTitle, sub } = this.props

    return (
      <header className={styles.hero}>
        <Nav />
        <div className={styles.container}>
          <div className={styles.breadCrumbs}>
            <Link to="/">Hem</Link>
            {sub === "events" && (
              <>
                <span className={styles.parentPage}></span>
                <Link to="/events">Events</Link>
              </>
            )}
            {sub === "articles" && (
              <>
                <span className={styles.parentPage}></span>
                <Link to="/articles">Artiklar</Link>
              </>
            )}
            <span className={styles.currentPage}>{shortTitle}</span>
          </div>
          <h1>{title}</h1>
          <p className={styles.subheading}>{subheading}</p>
        </div>
      </header>
    )
  }
}

export default PageHero
