import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Image from "gatsby-image"

import styles from "./event-post.module.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHero from "../components/hero/page-hero"

class EventPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title

    let shortTitle = post.frontmatter.title

    if (shortTitle.length > 20) {
      shortTitle = post.frontmatter.title.substr(0, 10).trim() + "..."
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.ingress}
        />
        <PageHero
          shortTitle={shortTitle}
          title={post.frontmatter.title}
          subheading={post.frontmatter.ingress}
          eventSub
        />
        <div className={styles.container}>
          <div className={styles.featuredImage}>
            <Image
              fluid={post.frontmatter.featuredimage.childImageSharp.fluid}
            />
          </div>
          <MDXRenderer>{post.body}</MDXRenderer>
        </div>
      </Layout>
    )
  }
}

export default EventPostTemplate

export const pageQuery = graphql`
  query EventPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        ingress
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 864) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
