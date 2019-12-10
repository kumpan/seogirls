import React from "react"
import { Link } from "gatsby"

import styles from "./nav.module.css"

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <Link to="/" className={styles.logo}>
          Logo
        </Link>
        <ul>
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
