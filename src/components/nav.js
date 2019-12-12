import React from "react"
import { Link } from "gatsby"

import styles from "./nav.module.css"

import Logo from "../../content/assets/seogirls-logo.svg"

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMenu: false };
  }

  toggleMenu = () => {
    this.setState(prevState => {
      return { showMenu: !prevState.showMenu }
    })
    console.log(this.state.showMenu)
  }

  render() {
    return (
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <div className={styles.hamburger + ' ' + (this.state.showMenu ? styles.opened : '')} onClick={this.toggleMenu}>
          <div>
            <span className={styles.lineOne} />
            <span className={styles.lineTwo} />
            <span className={styles.lineThree} />
          </div>
        </div>
        <ul className={this.state.showMenu ? styles.opened : ''}>
          <li>
            <Link to="/events">Evenemang</Link>
          </li>
          <li>
            <Link to="/sponsors">Sponsorer</Link>
          </li>
          <li>
            <Link to="/about">Om oss</Link>
          </li>
          <li>
            <Link to="/contact">Kontakta oss</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Nav
