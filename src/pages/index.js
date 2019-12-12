import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import EventBox from "../components/eventbox/event-box"

import styles from "./index.module.css"

class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const meta = data.allMdx.edges[0].node.frontmatter
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae pretium turpis, sed ullamcorper diam. Vivamus leo erat, faucibus a enim eu, egestas ornare eros. Sed quis faucibus dolor, id commodo nulla. Sed consectetur cursus magna ut sodales. Nec semper orci aliquet quis."

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={meta.metatitle}
          description={meta.metadescription}
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <div className={styles.events}>
          <EventBox dated smallTitle="Nästa evenemang" title="SEO-mingel på Södra Teatern" day="4" month="Feb" description={description} backgroundImage={data.coverOne.childImageSharp.fluid} />
          <EventBox smallTitle="Tidigare händelser" title="Seminarie: Growth Hacking" day="12" month="Dec" description={description} backgroundImage={data.coverTwo.childImageSharp.fluid} />
        </div>
        <div className={styles.about}>
          <div className="small-title">
            Vad gör vi?
          </div>
          <h2>Vi ordnar mindre träffar och större evenemang för kvinnor som sysslar med SEO eller growth hacking.</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet pulvinar nibh, eu commodo diam. Integer non varius ex. Ut ullamcorper convallis dolor ac placerat. Ut finibus mollis dui vitae blandit. Nunc accumsan porta leo, eu ornare quam.</p>
          <Link to="/">Läs mer om oss</Link>
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
            metatitle
            metadescription
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
