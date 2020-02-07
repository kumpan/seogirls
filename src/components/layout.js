import React from "react"

import SponsorsSection from "./sponsors-section"
import BecomeSponsor from "./become-sponsor"
import Footer from "./footer"
import ContactForm from "../components/contactForm"

import styles from "./layout.module.css"

class Layout extends React.Component {
  render() {
    const { children, becomeSponsor } = this.props

    return (
      <div>
        <div className={styles.container}>
          <main>{children}</main>
        </div>
        <ContactForm />
        {!becomeSponsor ? <SponsorsSection /> : <BecomeSponsor />}
        <Footer />
      </div>
    )
  }
}

export default Layout
