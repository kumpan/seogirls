import React from "react"
import { Link } from "gatsby"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"

import styles from "./nav.module.css"

import Logo from "../../content/assets/seogirls-logo.svg"

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showMenu: false, navHover: false }
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

  toggleHover = () => {
    this.setState({ navHover: !this.state.navHover })
  }

  render() {
    return (
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <div
          className={
            styles.hamburger + " " + (this.state.showMenu ? styles.opened : "")
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
            <Link
              className={this.state.navHover ? styles.hovered : ""}
              to="/events"
              onMouseEnter={this.toggleHover}
              onMouseLeave={this.toggleHover}
            >
              Evenemang
            </Link>
          </li>
          <li>
            <Link
              className={this.state.navHover ? styles.hovered : ""}
              to="/events"
              onMouseEnter={this.toggleHover}
              onMouseLeave={this.toggleHover}
            >
              Sponsorer
            </Link>
          </li>
          <li>
            <Link
              className={this.state.navHover ? styles.hovered : ""}
              to="/events"
              onMouseEnter={this.toggleHover}
              onMouseLeave={this.toggleHover}
            >
              Om oss
            </Link>
          </li>
          <li>
            <Link
              className={this.state.navHover ? styles.hovered : ""}
              to="/events"
              onMouseEnter={this.toggleHover}
              onMouseLeave={this.toggleHover}
            >
              Kontakta oss
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Nav
