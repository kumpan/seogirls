import React from "react"

import styles from "./date-box.module.css"

class DateBox extends React.Component {
  render() {
    const { date } = this.props

    const dateDayFormatted = () => {
      if (date.substr(0, 1) === "0") {
        return date.slice(1, 2)
      } else {
        return date.slice(0, 2)
      }
    }

    const dateMonth = date.slice(3, 6)

    return (
      <div className={styles.datebox}>
        <div>
          <span className={styles.day}>{dateDayFormatted() || "1"}</span>
          <span className={styles.month}>{dateMonth || "Jan"}</span>
        </div>
      </div>
    )
  }
}

export default DateBox
