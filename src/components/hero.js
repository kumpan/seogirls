import React from "react"

import Nav from "./nav"
import StarsOne from "../../content/assets/stars-1.svg"
import StarsTwo from "../../content/assets/stars-2.svg"
import StarsThree from "../../content/assets/stars-3.svg"
import PrimaryButton from "./buttons/primary"

import styles from "./hero.module.css"

class Hero extends React.Component {
  render() {
    const { title, subtitle, text, link, icon } = this.props

    return (
      <header className={styles.hero}>
        <Nav />
        <div className={styles.container}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <PrimaryButton text={text} link={link} iconAfter={icon} />
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
