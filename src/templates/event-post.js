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

    const date = post.frontmatter.date
    const dateDayFormatted = () => {
      if (date.substr(0, 1) === "0") {
        return date.slice(1, 2)
      } else {
        return date.slice(0, 2)
      }
    }
    const dateMonth = date.slice(3, 6)

    let currentPageCat
    if (
      typeof window !== "undefined" &&
      window.location.href.includes("artiklar")
    ) {
      currentPageCat = "articles"
    } else {
      currentPageCat = "events"
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
          sub={currentPageCat}
        />
        <div className={styles.container}>
          <div className={styles.date}>
            <span className={styles.day}>{dateDayFormatted() || "1"}</span>
            <span className={styles.month}>{dateMonth || "Jan"}</span>
          </div>
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
        date(formatString: "DD MMM YYYY", locale: "sv-SV")
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
