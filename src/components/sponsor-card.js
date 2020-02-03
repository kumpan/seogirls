import React from "react"
import Image from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

import styles from "./sponsor-card.module.css"

// Icons to import
import { LaunchIcon } from "@icons/material"

class SponsorCard extends React.Component {
  render() {
    const { title, url, color, logo, description } = this.props

    // Icons to use
    const launchIcon = <LaunchIcon />

    return (
      <div
        className={styles.sponsorCard}
        style={{
          backgroundColor: `${color}`,
        }}
      >
        <a
          className={styles.sponsorLogo}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image alt={title} fluid={logo} imgStyle={{ objectFit: "contain" }} />
        </a>
        <div className={styles.description}>
          <MDXRenderer>{description}</MDXRenderer>
        </div>
        <a
          className={styles.sponsorLink}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Se webbplats {launchIcon}
        </a>
      </div>
    )
  }
}

export default SponsorCard
