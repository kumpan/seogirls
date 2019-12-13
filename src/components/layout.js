import React from "react"
import { Link } from "gatsby"

import styles from "./layout.module.css"

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div>
        <div className={styles.container}>
          <main>{children}</main>
        </div>
        <footer className={styles.footer}>
          © {new Date().getFullYear()}, <Link to="/">SEOGIRLS.SE</Link>
        </footer>
      </div>
    )
  }
}

export default Layout
