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
          filter: { fileAbsolutePath: { regex: "/(/events-pages/kommande)/" } }
        ) {
          edges {
            node {
              frontmatter {
                title
                shorttitle
                canonical
                hero {
                  headingone
                  subheading
                }
              }
            }
          }
        }
        events: allMdx(
          filter: { fileAbsolutePath: { regex: "/(events/)/" } }
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
  const events = data.events.edges
  const isToday = ({
    node: {
      frontmatter: { date },
    },
  }) => {
    const eventDate = new Date(date.replace("okt", "oct").replace("maj", "may"))
    const todayDate = new Date()
    todayDate.setHours(0, 0, 0, 0)

    return eventDate.getTime() >= todayDate.getTime()
  }

  const comingEvents = events.filter(isToday)

  return (
    <Layout title={data.site.siteMetadata.title}>
      <SEO
        title={pageData.title}
        description={pageData.description}
        canonical={pageData.canonical}
      />
      <PageHero
        shortTitle={pageData.shorttitle}
        title={pageData.hero.headingone}
        subheading={pageData.hero.subheading}
        eventSub
        sub="events"
        location="/events"
      />
      <EventsList coming comingEvents={comingEvents} />
    </Layout>
  )
}

export default Events
