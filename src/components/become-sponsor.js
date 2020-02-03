import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import SecondaryButton from "./buttons/secondary"

import styles from "./become-sponsor.module.css"

// Icons to import
import { EmailOutlineIcon } from "@icons/material"

const BecomeSponsor = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMdx(filter: { fileAbsolutePath: { regex: "/(/sponsors-page)/" } }) {
          edges {
            node {
              frontmatter {
                becomesponsor {
                  headingtwo
                  description
                  link
                }
              }
            }
          }
        }
      }
    `
  )

  const pageContent = data.allMdx.edges[0].node.frontmatter.becomesponsor
  const mailtoLink = "mailto:" + pageContent.link

  // Icons to use
  const emailIcon = <EmailOutlineIcon />

  return (
    <div className={styles.becomeSponsor}>
      <div className={styles.container}>
        <h2 data-sal="slide-up" data-sal-duration="1000">
          {pageContent.headingtwo}
        </h2>
        <p data-sal="slide-up" data-sal-duration="1000">
          {pageContent.description}
        </p>
        <SecondaryButton
          data-sal="slide-up"
          data-sal-duration="1000"
          iconAfter={emailIcon}
          text={pageContent.link}
          link={mailtoLink}
        />
      </div>
    </div>
  )
}

export default BecomeSponsor
