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
      day,
      month,
      description,
    } = this.props

    return (
      <div className={"event-box " + styles.eventbox}>
        <div className={styles.eventtitle}>
          {dated && <DateBox day={day} month={month} />}
          <div className={styles.eventtext}>
            <span className="small-title">
              {smallTitle || "Write smallTitle"}
            </span>
            <h3 className="white-type">{title || "Write title"}</h3>
          </div>
        </div>
        <div className={styles.eventdescription}>{description}</div>
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
