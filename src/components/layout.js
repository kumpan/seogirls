import React from "react"
import { Link } from "gatsby"

import Hero from "./hero.js"

import styles from "./layout.module.css"

class Layout extends React.Component {
  render() {
    const { title, children } = this.props

    return (
      <div>
        <div className={styles.container}>
          <Hero />
          <header>
            <h1
              style={{
                marginTop: 0,
              }}
            >
              <Link
                style={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `inherit`,
                }}
                to={`/`}
              >
                {title}
              </Link>
            </h1>
          </header>
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
