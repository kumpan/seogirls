import React from "react"
import { graphql } from "gatsby"
import remark from "remark"
import recommended from "remark-preset-lint-recommended"
import remarkHtml from "remark-html"

// Icons to import
import { CalendarBlankIcon, ArrowRightIcon } from "@icons/material"

import Layout from "../components/layout"
import Hero from "../components/hero"
import SEO from "../components/seo"
import ComingEventsLink from "../components/events/coming-events-link"
import PastEventsLink from "../components/events/past-events-link"
import SecondaryButton from "../components/buttons/secondary"
import AboutSection from "../components/about-section"
import SponsorsSection from "../components/sponsors-section"
import Footer from "../components/footer"

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

    const sDropCap = pageContent.about.s.substr(0, 1)
    const eDropCap = pageContent.about.e.substr(0, 1)
    const oDropCap = pageContent.about.o.substr(0, 1)

    // Remark MD-content outside of body
    const s = remark()
      .use(recommended)
      .use(remarkHtml)
      .processSync(pageContent.about.s.substr(1))
      .toString()

    const e = remark()
      .use(recommended)
      .use(remarkHtml)
      .processSync(pageContent.about.e.substr(1))
      .toString()

    const o = remark()
      .use(recommended)
      .use(remarkHtml)
      .processSync(pageContent.about.o.substr(1))
      .toString()

    return (
      <React.Fragment>
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
            <div className={styles.pastEvents + " past-events"}>
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
          <AboutSection
            headingtwo={pageContent.about.headingtwo}
            s={s}
            e={e}
            o={o}
            sDropCap={sDropCap}
            eDropCap={eDropCap}
            oDropCap={oDropCap}
          />
        </Layout>
        <SponsorsSection sponsors={data.sponsors.edges} />
        <Footer />
      </React.Fragment>
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
