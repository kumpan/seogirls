import React from "react"

import styles from "./coming-events-link.module.css"
import SecondaryButton from "../buttons/secondary"

// Icons to import
import { ArrowRightIcon } from "@icons/material"

class ComingEventsLink extends React.Component {
  render() {
    const { path, date, title, ingress } = this.props

    const dateDayFormatted = () => {
      if (date.substr(0, 1) === "0") {
        return date.slice(1, 2)
      } else {
        return date.slice(0, 2)
      }
    }
    const dateMonth = date.slice(3, 6)
    const maxLengthIngress = 140
    const ingressSliced = () => {
      if (ingress.length >= maxLengthIngress) {
        return ingress.substr(0, maxLengthIngress).trim() + "..."
      } else {
        return ingress
      }
    }

    // Icons to use
    const arrowRightIcon = <ArrowRightIcon />

    return (
      <a className={styles.eventLink} href={"coming-events/" + path}>
        <div className={styles.date}>
          <span className={styles.day}>{dateDayFormatted() || "1"}</span>
          <span className={styles.month}>{dateMonth || "Jan"}</span>
        </div>
        <div className={styles.content}>
          <h4>{title}</h4>
          <span>{ingressSliced()}</span>
        </div>
        <div className={styles.arrowButton}>
          <SecondaryButton iconAfter={arrowRightIcon} />
        </div>
      </a>
    )
  }
}

export default ComingEventsLink
