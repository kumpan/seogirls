import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHero from "../components/hero/page-hero"
import EventsList from "../components/events/events-list"

const Events = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(
          filter: { fileAbsolutePath: { regex: "/(/events/tidigare)/" } }
        ) {
          edges {
            node {
              frontmatter {
                title
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
  const pageData = data.allMdx.edges[0].node.frontmatter
  return (
    <Layout title={data.site.siteMetadata.title}>
      <SEO title={pageData.title} />
      <PageHero
        title={pageData.hero.headingone}
        subheading={pageData.hero.subheading}
      />
      <EventsList past />
    </Layout>
  )
}

export default Events
