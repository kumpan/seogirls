import React from "react"

import StarsOne from "../../content/assets/stars-1.svg"
import StarsTwo from "../../content/assets/stars-2.svg"

import styles from "./about-section.module.css"

class AboutSection extends React.Component {
  render() {
    const { headingtwo, s, e, o, sDropCap, eDropCap, oDropCap } = this.props

    return (
      <div className={styles.about}>
        <h2>{headingtwo}</h2>
        <div className={styles.aboutItems}>
          <div
            className={styles.aboutItem}
            data-sal="slide-up"
            data-sal-duration="1000"
          >
            <span className={styles.dropCap}>{sDropCap}</span>
            <div dangerouslySetInnerHTML={{ __html: s }} />
          </div>
          <div
            className={styles.aboutItem}
            data-sal="slide-up"
            data-sal-duration="1000"
          >
            <span className={styles.dropCap}>{eDropCap}</span>
            <div dangerouslySetInnerHTML={{ __html: e }} />
          </div>
          <div
            className={styles.aboutItem}
            data-sal="slide-up"
            data-sal-duration="1000"
          >
            <span className={styles.dropCap}>{oDropCap}</span>
            <div dangerouslySetInnerHTML={{ __html: o }} />
          </div>
          <div className={styles.stars}>
            <StarsOne data-sal="slide-up" data-sal-duration="1000" />
            <StarsTwo data-sal="slide-up" data-sal-duration="1000" />
          </div>
        </div>
      </div>
    )
  }
}

export default AboutSection
