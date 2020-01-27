import React from "react"

import SponsorsSection from "./sponsors-section"
import Footer from "./footer"

import styles from "./layout.module.css"

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div>
        <div className={styles.container}>
          <main>{children}</main>
        </div>
        <SponsorsSection />
        <Footer />
      </div>
    )
  }
}

export default Layout
