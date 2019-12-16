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
import EventBox from "../components/eventbox/event-box"
import PrimaryButton from "../components/buttons/primary"

import styles from "./index.module.css"

class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const pageContent = data.allMdx.edges[0].node.frontmatter
    const events = data.events.edges

    const allFeaturedFuture = events.filter(event => {
      return event.node.frontmatter.featuredfuture
    })
    const allFeaturedPast = events.filter(event => {
      return event.node.frontmatter.featuredpast
    })

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
          subtitle={pageContent.hero.subtitle}
          text={pageContent.hero.subtitlelinktext}
          link={pageContent.hero.subtitlelinkdestination}
          icon={calendarIcon}
        />
        <div className={styles.events}>
          <EventBox
            dated
            smallTitle={pageContent.events.nexteventtitle}
            title={allFeaturedFuture[0].node.frontmatter.title}
            date={allFeaturedFuture[0].node.frontmatter.date}
            ingress={allFeaturedFuture[0].node.frontmatter.ingress}
            backgroundImage={
              allFeaturedFuture[0].node.frontmatter.featuredimage
                .childImageSharp.fluid
            }
          />
          <EventBox
            smallTitle={pageContent.events.pasteventtitle}
            title={allFeaturedPast[0].node.frontmatter.title}
            date={allFeaturedPast[0].node.frontmatter.date}
            ingress={allFeaturedPast[0].node.frontmatter.ingress}
            backgroundImage={
              allFeaturedPast[0].node.frontmatter.featuredimage.childImageSharp
                .fluid
            }
          />
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
              subtitle
              subtitlelinkdestination
              subtitlelinktext
            }
            events {
              nexteventtitle
              pasteventtitle
            }
            about {
              smalltitle
              headingtwo
              ingress
              ingresslinktext
              ingresslinkdestination
            }
          }
        }
      }
    }
    events: allMdx(
      filter: { fileAbsolutePath: { regex: "/(events)/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            date(formatString: "DD MMM YYYY", locale: "sv-SV")
            featuredfuture
            featuredpast
            ingress
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          body
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
