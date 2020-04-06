import React from "react"
import Image from "gatsby-image"
import { Link } from "gatsby"

import styles from "./past-events-link.module.css"
import SecondaryButton from "../buttons/secondary"

// Icons to import
import { ArrowRightIcon } from "@icons/material"

class PastEventsLink extends React.Component {
  render() {
    const { path, title, ingress, thumb } = this.props

    const maxLengthIngress = 224
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
      <Link className={styles.eventLink} to={"/events/" + path}>
        <div className={styles.thumb}>
          <Image fluid={thumb} />
        </div>
        <div className={styles.content}>
          <h4>{title}</h4>
          <span>{ingressSliced()}</span>
        </div>
        <div className={styles.arrowButton}>
          <SecondaryButton iconAfter={arrowRightIcon} />
        </div>
      </Link>
    )
  }
}

export default PastEventsLink
