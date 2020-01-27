import React from "react"
import Image from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

import styles from "./sponsors-section.module.css"

const SponsorsSection = () => {
  const data = useStaticQuery(
    graphql`
      query {
        sponsors: allMdx(
          filter: { fileAbsolutePath: { regex: "/(sponsors)/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                path
                title
                url
                logo {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  const sponsors = data.sponsors.edges

  return (
    <div className={styles.sponsors}>
      <div className={styles.container}>
        <span className={styles.heading}>Våra sponsorer</span>
        <ul>
          {sponsors.map(({ node }, index) => {
            return (
              <li
                key={node.frontmatter.path}
                className={styles.sponsor}
                data-sal="slide-up"
                data-sal-duration="2000"
                data-sal-delay={index + "00"}
              >
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

export default SponsorsSection
