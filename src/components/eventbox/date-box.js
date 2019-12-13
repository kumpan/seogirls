import React from "react"

import styles from "./date-box.module.css"

class DateBox extends React.Component {
  render() {
    const { day, month } = this.props

    return (
      <div className={styles.datebox}>
        <div>
          <span className={styles.day}>{day || "1"}</span>
          <span className={styles.month}>{month || "Jan"}</span>
        </div>
      </div>
    )
  }
}

export default DateBox
