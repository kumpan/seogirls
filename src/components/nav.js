import React from "react"
import { Link } from "gatsby"
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock"

// Icons to import
import { ArrowRightIcon } from "@icons/material"

import styles from "./nav.module.css"

import Logo from "../../content/assets/seogirls-logo.svg"

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showMenu: false }
  }

  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu })

    if (!this.state.showMenu) {
      setTimeout(() => {
        disableBodyScroll(this.targetElement)
      }, 300)
    } else {
      enableBodyScroll(this.targetElement)
    }
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks()
  }

  render() {
    return (
      <nav className={styles.nav}>
        <div className={styles.container}>
          <Link to="/" aria-label="Home" className={styles.logo}>
            <Logo />
          </Link>
          <div
            className={
              styles.hamburger +
              " " +
              (this.state.showMenu ? styles.opened : "")
            }
            onClick={this.toggleMenu}
            onKeyPress={this.toggleMenu}
            role="button"
            tabIndex="0"
            aria-label="Toggle Menu"
          >
            <div>
              <span className={styles.lineOne} />
              <span className={styles.lineTwo} />
              <span className={styles.lineThree} />
            </div>
          </div>
          <ul className={this.state.showMenu ? styles.opened : ""}>
            <li
              className={this.props.location === "/events" ? styles.active : ""}
            >
              <Link to="/events">
                Events
                <ArrowRightIcon />
              </Link>
            </li>
            <li
              className={
                this.props.location === "/artiklar" ? styles.active : ""
              }
            >
              <Link to="/artiklar">
                Artiklar
                <ArrowRightIcon />
              </Link>
            </li>
            <li
              className={
                this.props.location === "/sponsorer" ? styles.active : ""
              }
            >
              <Link to="/sponsorer">
                Sponsorer
                <ArrowRightIcon />
              </Link>
            </li>
            <li className={this.props.location === "/om" ? styles.active : ""}>
              <Link to="/om">
                Om oss
                <ArrowRightIcon />
              </Link>
            </li>
            <li
              className={
                this.props.location === "/kontakt" ? styles.active : ""
              }
            >
              <Link to="/kontakt">
                Kontakt
                <ArrowRightIcon />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav
