import React from "react"
import Image from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

import styles from "./sponsors-section.module.css"

const SponsorsSection = () => {
  const data = useStaticQuery(
    graphql`
      query {
        mainSponsors: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(sponsors/)/" }
            frontmatter: { sponsortype: { regex: "/(main)/" } }
          }
          sort: { fields: [frontmatter___title], order: ASC }
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
        eventSponsors: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(sponsors/)/" }
            frontmatter: { sponsortype: { regex: "/(event)/" } }
          }
          sort: { fields: [frontmatter___title], order: ASC }
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
        sponsorsPage: allMdx(
          filter: { fileAbsolutePath: { regex: "/(sponsors-page/)/" } }
        ) {
          edges {
            node {
              frontmatter {
                sponsorcontent {
                  mainsponsorstitle
                  eventsponsorstitle
                }
              }
            }
          }
        }
      }
    `
  )

  const mainSponsors = data.mainSponsors.edges
  const eventSponsors = data.eventSponsors.edges
  const sponsorContent =
    data.sponsorsPage.edges[0].node.frontmatter.sponsorcontent

  return (
    <div className={styles.sponsors}>
      <div className={styles.container}>
        <span className={styles.heading}>
          {sponsorContent.mainsponsorstitle}
        </span>
        <ul>
          {mainSponsors.map(({ node }, index) => {
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
        <span className={styles.heading}>
          {sponsorContent.eventsponsorstitle}
        </span>
        <ul>
          {eventSponsors.map(({ node }, index) => {
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
