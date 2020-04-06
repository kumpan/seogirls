import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

import styles from "./events-list.module.css"

import SecondaryButton from "../buttons/secondary"
import ComingEventsLink from "./coming-events-link"
import PastEventsLink from "./past-events-link"
import ArticleLink from "./article-link"

// Icons to import
import { ArrowRightIcon } from "@icons/material"

const EventsList = ({
  coming,
  past,
  linked,
  comingEvents,
  pastEvents,
  articles,
  articlePosts,
}) => {
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
          {comingEvents.length > 0 ? (
            comingEvents.map(({ node }) => {
              return (
                <ComingEventsLink
                  key={node.frontmatter.path}
                  path={node.frontmatter.path}
                  date={node.frontmatter.date}
                  title={node.frontmatter.title}
                  ingress={node.frontmatter.ingress}
                />
              )
            })
          ) : (
            <p>
              Det finns just nu inga kommande events.{" "}
              <Link to="/kontakt">Hör av dig</Link> om du vill hosta ett event.
            </p>
          )}
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
        <div className={styles.pastEvents}>
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
          {pastEvents.length > 0 ? (
            pastEvents.map(({ node }) => {
              return (
                <PastEventsLink
                  key={node.frontmatter.path}
                  path={node.frontmatter.path}
                  title={node.frontmatter.title}
                  ingress={node.frontmatter.ingress}
                  thumb={node.frontmatter.featuredimage.childImageSharp.fluid}
                />
              )
            })
          ) : (
            <p>
              Det har inte varit några tidigare events.{" "}
              <Link to="/kontakt">Hör av dig</Link> om du vill hosta ett event.
            </p>
          )}
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
      {articles && (
        <div className={styles.articles}>
          {articlePosts.length > 0 ? (
            articlePosts.map(({ node }) => {
              return (
                <ArticleLink
                  key={node.frontmatter.path}
                  path={node.frontmatter.path}
                  title={node.frontmatter.title}
                  ingress={node.frontmatter.ingress}
                  thumb={node.frontmatter.featuredimage.childImageSharp.fluid}
                />
              )
            })
          ) : (
            <p>Det finns ännu inga artiklar här.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default EventsList
