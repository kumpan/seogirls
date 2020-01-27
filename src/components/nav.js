import React from "react"
import { Link } from "gatsby"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"

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

  render() {
    return (
      <nav className={styles.nav}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
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
          >
            <div>
              <span className={styles.lineOne} />
              <span className={styles.lineTwo} />
              <span className={styles.lineThree} />
            </div>
          </div>
          <ul className={this.state.showMenu ? styles.opened : ""}>
            <li>
              <Link to="/events">
                Events
                <ArrowRightIcon />
              </Link>
            </li>
            <li>
              <Link to="/events">
                Sponsorer
                <ArrowRightIcon />
              </Link>
            </li>
            <li>
              <Link to="/events">
                Om oss
                <ArrowRightIcon />
              </Link>
            </li>
            <li>
              <Link to="/events">
                Kontakta oss
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
