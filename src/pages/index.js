import React from "react"
import { graphql } from "gatsby"
import remark from "remark"
import recommended from "remark-preset-lint-recommended"
import remarkHtml from "remark-html"

// Icons to import
import { CalendarBlankIcon } from "@icons/material"

import Layout from "../components/layout"
import LandingHero from "../components/hero/landing-hero"
import SEO from "../components/seo"
import EventsList from "../components/events/events-list"
import AboutSection from "../components/about-section"

class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const pageContent = data.allMdx.edges[0].node.frontmatter

    // Icons to use
    const calendarIcon = <CalendarBlankIcon />

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
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={pageContent.title}
          description={pageContent.description}
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <LandingHero
          title={pageContent.hero.headingone}
          text={pageContent.hero.subtitlelinktext}
          link={pageContent.hero.subtitlelinkdestination}
          icon={calendarIcon}
        />
        <EventsList />
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
