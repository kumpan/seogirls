import React from "react"

import Nav from "../nav"
import StarsOne from "../../../content/assets/stars-1.svg"
import StarsTwo from "../../../content/assets/stars-2.svg"
import PrimaryButton from "../buttons/primary"

import styles from "./landing-hero.module.css"

class LandingHero extends React.Component {
  render() {
    const { title, text, link, icon, location } = this.props

    return (
      <header className={styles.hero}>
        <Nav location={location} />
        <div className={styles.container}>
          <h1>{title}</h1>
          <div className={styles.stars}>
            <StarsOne />
            <StarsTwo />
          </div>
          <PrimaryButton text={text} link={link} iconAfter={icon} />
        </div>
      </header>
    )
  }
}

export default LandingHero
