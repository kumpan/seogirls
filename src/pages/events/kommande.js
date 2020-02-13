import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import PageHero from "../../components/hero/page-hero"
import EventsList from "../../components/events/events-list"

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
          filter: { fileAbsolutePath: { regex: "/(/events/kommande)/" } }
        ) {
          edges {
            node {
              frontmatter {
                title
                shorttitle
                hero {
                  headingone
                  subheading
                }
              }
            }
          }
        }
        comingEvents: allMdx(
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
      }
    `
  )
  const pageData = data.allMdx.edges[0].node.frontmatter
  const comingEvents = data.comingEvents.edges

  return (
    <Layout title={data.site.siteMetadata.title}>
      <SEO title={pageData.title} description={pageData.description} />
      <PageHero
        shortTitle={pageData.shorttitle}
        title={pageData.hero.headingone}
        subheading={pageData.hero.subheading}
        eventSub
        location="/events"
      />
      <EventsList coming comingEvents={comingEvents} />
    </Layout>
  )
}

export default Events
