import React from "react"
import { Link } from "gatsby"

import styles from "./primary.module.css"

class PrimaryButton extends React.Component {
  render() {
    const { text, link, iconAfter, iconBefore } = this.props

    return (
      <Link to={link || "/"} className={styles.button} role="button">
        <div>
          {iconBefore && <span className={styles.icon}>{iconBefore}</span>}
          <span className={styles.text}>{text || "Button text"}</span>
          {iconAfter && <span className={styles.icon}>{iconAfter}</span>}
        </div>
      </Link>
    )
  }
}

export default PrimaryButton
