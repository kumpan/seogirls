import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import styles from "./events-list.module.css"

import SecondaryButton from "../buttons/secondary"
import ComingEventsLink from "./coming-events-link"
import PastEventsLink from "./past-events-link"

// Icons to import
import { ArrowRightIcon } from "@icons/material"

const EventsList = ({ coming, past, linked }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allMdx(filter: { fileAbsolutePath: { regex: "/(start-page)/" } }) {
          edges {
            node {
              frontmatter {
                events {
                  nexteventtitle
                  nexteventbuttontext
                  nexteventbuttondestination
                  pasteventtitle
                  pasteventbuttontext
                  pasteventbuttondestination
                }
              }
            }
          }
        }
        comingEvents: allMdx(
          limit: 3
          filter: { fileAbsolutePath: { regex: "/(coming-events)/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                path
                title
                date(formatString: "DD MMM YYYY", locale: "sv-SV")
                ingress
              }
            }
          }
        }
        pastEvents: allMdx(
          limit: 3
          filter: { fileAbsolutePath: { regex: "/(past-events)/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                path
                title
                date(formatString: "DD MMM YYYY", locale: "sv-SV")
                ingress
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 560) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
        emojiWave: file(relativePath: { eq: "emoji-wave.png" }) {
          childImageSharp {
            fixed(width: 28, height: 28) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        emojiVictory: file(relativePath: { eq: "emoji-victory.png" }) {
          childImageSharp {
            fixed(width: 28, height: 28) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )

  // Icons to use
  const arrowRightIcon = <ArrowRightIcon />

  const pageContent = data.allMdx.edges[0].node.frontmatter.events
  const comingEvents = data.comingEvents.edges
  const pastEvents = data.pastEvents.edges

  return (
    <div className={styles.events}>
      {coming && (
        <div className={styles.comingEvents}>
          <div className={styles.eventsTitle}>
            <h3>
              <span className={styles.emoji}>
                <Img
                  fixed={data.emojiWave.childImageSharp.fixed}
                  alt="Emoji Wave"
                  objectFit="contain"
                  objectPosition="50% 50%"
                />
              </span>
              {pageContent.nexteventtitle}
            </h3>
            {linked && (
              <SecondaryButton
                iconAfter={arrowRightIcon}
                text={pageContent.nexteventbuttontext}
                link={pageContent.nexteventbuttondestination}
              />
            )}
          </div>
          {comingEvents.map(({ node }) => {
            return (
              <ComingEventsLink
                key={node.frontmatter.path}
                path={node.frontmatter.path}
                date={node.frontmatter.date}
                title={node.frontmatter.title}
                ingress={node.frontmatter.ingress}
              />
            )
          })}
          {linked && (
            <div className={styles.mobileLink}>
              <SecondaryButton
                iconAfter={arrowRightIcon}
                text={pageContent.nexteventbuttontext}
                link={pageContent.nexteventbuttondestination}
              />
            </div>
          )}
        </div>
      )}
      {past && (
        <div className={styles.pastEvents + " past-events"}>
          <div className={styles.eventsTitle}>
            <h3>
              <span className={styles.emoji}>
                <Img
                  fixed={data.emojiVictory.childImageSharp.fixed}
                  alt="Emoji Victory"
                />
              </span>
              {pageContent.pasteventtitle}
            </h3>
            {linked && (
              <SecondaryButton
                iconAfter={arrowRightIcon}
                text={pageContent.pasteventbuttontext}
                link={pageContent.pasteventbuttondestination}
              />
            )}
          </div>
          {pastEvents.map(({ node }) => {
            return (
              <PastEventsLink
                key={node.frontmatter.path}
                path={node.frontmatter.path}
                title={node.frontmatter.title}
                ingress={node.frontmatter.ingress}
                thumb={node.frontmatter.featuredimage.childImageSharp.fluid}
              />
            )
          })}
          {linked && (
            <div className={styles.mobileLink}>
              <SecondaryButton
                iconAfter={arrowRightIcon}
                text={pageContent.pasteventbuttontext}
                link={pageContent.pasteventbuttondestination}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default EventsList
