import React from "react"
import Image from "gatsby-image"

import styles from "./sponsors-section.module.css"

class SponsorsSection extends React.Component {
  render() {
    const { sponsors } = this.props

    return (
      <div className={styles.sponsors}>
        <div className={styles.container}>
          <span className={styles.heading}>Våra sponsorer</span>
          <ul>
            {sponsors.map(({ node }) => {
              return (
                <li key={node.frontmatter.path} className={styles.sponsor}>
                  <a
                    href={node.frontmatter.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles[node.frontmatter.path]}
                  >
                    <Image
                      alt={node.frontmatter.title}
                      fluid={node.frontmatter.logo.childImageSharp.fluid}
                      imgStyle={{ objectFit: "contain" }}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default SponsorsSection
