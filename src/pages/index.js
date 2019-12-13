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
    const description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae pretium turpis, sed ullamcorper diam. Vivamus leo erat, faucibus a enim eu, egestas ornare eros. Sed quis faucibus dolor, id commodo nulla. Sed consectetur cursus magna ut sodales. Nec semper orci aliquet quis."

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
            smallTitle="Nästa evenemang"
            title="SEO-mingel på Södra Teatern"
            day="4"
            month="Feb"
            description={description}
            backgroundImage={data.coverOne.childImageSharp.fluid}
          />
          <EventBox
            smallTitle="Tidigare händelser"
            title="Seminarie: Growth Hacking"
            day="12"
            month="Dec"
            description={description}
            backgroundImage={data.coverTwo.childImageSharp.fluid}
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
