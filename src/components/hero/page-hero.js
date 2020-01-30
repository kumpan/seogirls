import React from "react"
import { Link } from "gatsby"

import Nav from "../nav"

import styles from "./page-hero.module.css"

class PageHero extends React.Component {
  render() {
    const { title, subheading, shortTitle, eventSub } = this.props

    return (
      <header className={styles.hero}>
        <Nav />
        <div className={styles.container}>
          <div className={styles.breadCrumbs}>
            <Link to="/">Hem</Link>
            {eventSub && (
              <>
                <span className={styles.parentPage}></span>
                <Link to="/events">Events</Link>
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
