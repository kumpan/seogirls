import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import styles from "./cookies.module.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHero from "../components/hero/page-hero"
import { MDXRenderer } from "gatsby-plugin-mdx"

const Events = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(filter: { fileAbsolutePath: { regex: "/(/cookie-page)/" } }) {
          edges {
            node {
              body
              frontmatter {
                shorttitle
                title
                canonical
                hero {
                  headingone
                  subheading
                }
              }
            }
          }
        }
      }
    `
  )
  const pageData = data.allMdx.edges[0].node

  return (
    <Layout title={data.site.siteMetadata.title}>
      <SEO
        title={pageData.frontmatter.title}
        description={pageData.frontmatter.description}
        canonical={pageData.canonical}
      />
      <PageHero
        shortTitle={pageData.frontmatter.shorttitle}
        title={pageData.frontmatter.hero.headingone}
        subheading={pageData.frontmatter.hero.subheading}
      />
      <div className={styles.container}>
        <MDXRenderer>{pageData.body}</MDXRenderer>
      </div>
    </Layout>
  )
}

export default Events
