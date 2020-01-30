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
          filter: { fileAbsolutePath: { regex: "/(/events/events-mingel)/" } }
        ) {
          edges {
            node {
              frontmatter {
                shorttitle
                title
                hero {
                  headingone
                  subheading
                }
              }
            }
          }
        }
        comingEvents: allMdx(
          limit: 3
          filter: { fileAbsolutePath: { regex: "/(coming-events)/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                path
                title
                date(formatString: "DD MMM YYYY", locale: "sv-SV")
                ingress
              }
            }
          }
        }
        pastEvents: allMdx(
          limit: 3
          filter: { fileAbsolutePath: { regex: "/(past-events)/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                path
                title
                date(formatString: "DD MMM YYYY", locale: "sv-SV")
                ingress
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 560) {
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
  )
  const pageData = data.allMdx.edges[0].node.frontmatter
  const comingEvents = data.comingEvents.edges
  const pastEvents = data.pastEvents.edges

  return (
    <Layout title={data.site.siteMetadata.title}>
      <SEO title={pageData.title} />
      <PageHero
        shortTitle={pageData.shorttitle}
        title={pageData.hero.headingone}
        subheading={pageData.hero.subheading}
      />
      <EventsList
        coming
        past
        linked
        pastEvents={pastEvents}
        comingEvents={comingEvents}
      />
    </Layout>
  )
}

export default Events
