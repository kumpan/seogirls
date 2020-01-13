import React from "react"
import { graphql } from "gatsby"
import remark from "remark"
import recommended from "remark-preset-lint-recommended"
import remarkHtml from "remark-html"

import AboutLineIllustration from "../../content/assets/about-line-illustration.svg"

// Icons to import
import { CalendarBlankIcon, ArrowRightIcon } from "@icons/material"

import Layout from "../components/layout"
import Hero from "../components/hero"
import SEO from "../components/seo"
import ComingEventsLink from "../components/events/coming-events-link"
import PastEventsLink from "../components/events/past-events-link"
import PrimaryButton from "../components/buttons/primary"
import SecondaryButton from "../components/buttons/secondary"

import styles from "./index.module.css"

class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const pageContent = data.allMdx.edges[0].node.frontmatter
    const comingEvents = data.comingEvents.edges
    const pastEvents = data.pastEvents.edges

    // Icons to use
    const calendarIcon = <CalendarBlankIcon />
    const arrowRightIcon = <ArrowRightIcon />

    // Remark MD-content outside of body
    const aboutIngress = remark()
      .use(recommended)
      .use(remarkHtml)
      .processSync(pageContent.about.ingress)
      .toString()

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={pageContent.title}
          description={pageContent.description}
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Hero
          title={pageContent.hero.headingone}
          text={pageContent.hero.subtitlelinktext}
          link={pageContent.hero.subtitlelinkdestination}
          icon={calendarIcon}
        />
        <div className={styles.events}>
          <div className={styles.comingEvents}>
            <div className={styles.eventsTitle}>
              <h3>{pageContent.events.nexteventtitle}</h3>
              <SecondaryButton
                iconAfter={arrowRightIcon}
                text={pageContent.events.nexteventbuttontext}
                link={pageContent.events.nexteventbuttondestination}
              />
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
          </div>
          <div className={styles.pastEvents}>
            <div className={styles.eventsTitle}>
              <h3>{pageContent.events.pasteventtitle}</h3>
              <SecondaryButton
                iconAfter={arrowRightIcon}
                text={pageContent.events.pasteventbuttontext}
                link={pageContent.events.pasteventbuttondestination}
              />
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
          </div>
        </div>
        <div className={styles.about}>
          <h2>{pageContent.about.headingtwo}</h2>
        </div>
        <div className={styles.aboutContainer}>
          <div className={styles.about}>
            <div className="small-title">{pageContent.about.smalltitle}</div>
            <h2>{pageContent.about.headingtwo}</h2>
            <div dangerouslySetInnerHTML={{ __html: aboutIngress }} />
            <PrimaryButton
              className={styles.aboutButton}
              text={pageContent.about.ingresslinktext}
              iconAfter={arrowRightIcon}
              link={pageContent.about.ingresslinkdestination}
            />
          </div>
          <AboutLineIllustration className={styles.aboutIllustration} />
        </div>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(filter: { fileAbsolutePath: { regex: "/(start-page)/" } }) {
      edges {
        node {
          frontmatter {
            title
            description
            hero {
              headingone
              subtitlelinkdestination
              subtitlelinktext
            }
            events {
              nexteventtitle
              nexteventbuttontext
              nexteventbuttondestination
              pasteventtitle
              pasteventbuttontext
              pasteventbuttondestination
            }
            about {
              headingtwo
              s
              e
              o
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
    coverOne: file(relativePath: { eq: "seo-mingle-cover.JPG" }) {
      childImageSharp {
        fluid(maxWidth: 800, maxHeight: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    coverTwo: file(relativePath: { eq: "growth-hacking-cover.JPG" }) {
      childImageSharp {
        fluid(maxWidth: 800, maxHeight: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
