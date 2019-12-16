import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Hero from "../components/hero.js"
import SEO from "../components/seo"
import EventBox from "../components/eventbox/event-box"

import styles from "./index.module.css"

class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const content = data.allMdx.edges[0].node.frontmatter
    const events = data.events.edges

    const allFeaturedFuture = events.filter(event => {
      return event.node.frontmatter.featuredfuture
    })
    const allFeaturedPast = events.filter(event => {
      return event.node.frontmatter.featuredpast
    })

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={content.title}
          description={content.description}
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Hero
          title={content.hero.headingone}
          subtitle={content.hero.subtitlelinktext}
          link={content.hero.subtitlelinkdestination}
        />
        <div className={styles.events}>
          <EventBox
            dated
            smallTitle={content.events.nexteventtitle}
            title={allFeaturedFuture[0].node.frontmatter.title}
            date={allFeaturedFuture[0].node.frontmatter.date}
            ingress={allFeaturedFuture[0].node.frontmatter.ingress}
            backgroundImage={
              allFeaturedFuture[0].node.frontmatter.featuredimage
                .childImageSharp.fluid
            }
          />
          <EventBox
            smallTitle={content.events.pasteventtitle}
            title={allFeaturedPast[0].node.frontmatter.title}
            date={allFeaturedPast[0].node.frontmatter.date}
            ingress={allFeaturedPast[0].node.frontmatter.ingress}
            backgroundImage={
              allFeaturedPast[0].node.frontmatter.featuredimage.childImageSharp
                .fluid
            }
          />
        </div>
        <div className={styles.about}>
          <div className="small-title">{content.about.smalltitle}</div>
          <h2>{content.about.headingtwo}</h2>
          <p>{content.about.ingress}</p>
          <Link to={content.about.ingresslinkdestination}>
            {content.about.ingresslinktext}
          </Link>
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
