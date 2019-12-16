import React from "react"
import Image from "gatsby-image"

import DateBox from "./date-box.js"

import styles from "./event-box.module.css"

class EventBox extends React.Component {
  render() {
    const {
      backgroundImage,
      smallTitle,
      title,
      dated,
      date,
      ingress,
    } = this.props

    const maxLengthIngress = 265
    const ingressSliced = () => {
      if (ingress.length >= maxLengthIngress) {
        return ingress.substr(0, maxLengthIngress).trim() + "..."
      } else {
        return ingress
      }
    }

    return (
      <div className={"event-box " + styles.eventbox}>
        <div className={styles.eventtitle}>
          {dated && <DateBox date={date} />}
          <div className={styles.eventtext}>
            <span className="small-title">
              {smallTitle || "Write smallTitle"}
            </span>
            <h3 className="white-type">{title || "Write title"}</h3>
          </div>
        </div>
        <div className={styles.eventdescription}>{ingressSliced()}</div>
        <Image
          style={{ position: "absolute" }}
          className={"bg-image gradient"}
          fluid={backgroundImage}
          alt="Event"
        />
      </div>
    )
  }
}

export default EventBox
