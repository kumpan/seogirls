import React from "react"

import SponsorsSection from "./sponsors-section"
import BecomeSponsor from "./become-sponsor"
import Footer from "./footer"

import styles from "./layout.module.css"

class Layout extends React.Component {
  render() {
    const { children, becomeSponsor } = this.props

    return (
      <div>
        <div className={styles.container}>
          <main>{children}</main>
        </div>
        {!becomeSponsor ? <SponsorsSection /> : <BecomeSponsor />}
        <Footer />
      </div>
    )
  }
}

export default Layout
