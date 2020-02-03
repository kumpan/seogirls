import React from "react"

import styles from "./primary.module.css"

class PrimaryButton extends React.Component {
  render() {
    const { text, link, iconAfter, iconBefore } = this.props

    return (
      <div>
        {link ? (
          <a
            href={link}
            className={styles.button + (!text ? " " + styles.simpleButton : "")}
            role="button"
          >
            <div>
              {iconBefore && <span className={styles.icon}>{iconBefore}</span>}
              {text && <span className={styles.text}>{text}</span>}
              {iconAfter && <span className={styles.icon}>{iconAfter}</span>}
            </div>
          </a>
        ) : (
          <div
            className={styles.button + (!text ? " " + styles.simpleButton : "")}
            role="button"
          >
            <div>
              {iconBefore && <span className={styles.icon}>{iconBefore}</span>}
              {text && <span className={styles.text}>{text}</span>}
              {iconAfter && <span className={styles.icon}>{iconAfter}</span>}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default PrimaryButton
