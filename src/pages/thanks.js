import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHero from "../components/hero/page-hero"

const Thanks = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(filter: { fileAbsolutePath: { regex: "/(/host-event)/" } }) {
          edges {
            node {
              frontmatter {
                thankyou {
                  shorttitle
                  title
                  description
                  hero {
                    headingone
                    subheading
                  }
                }
              }
            }
          }
        }
      }
    `
  )
  const pageData = data.allMdx.edges[0].node.frontmatter.thankyou

  return (
    <>
      <Layout noForm title={data.site.siteMetadata.title}>
        <SEO title={pageData.title} />
        <PageHero
          shortTitle={pageData.shorttitle}
          title={pageData.hero.headingone}
          subheading={pageData.hero.subheading}
        />
      </Layout>
    </>
  )
}

export default Thanks
