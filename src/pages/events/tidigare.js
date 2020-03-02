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
          filter: { fileAbsolutePath: { regex: "/(/events/tidigare)/" } }
        ) {
          edges {
            node {
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
        pastEvents: allMdx(
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
  const pastEvents = data.pastEvents.edges

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
        location="/events"
        canonical={pageData.canonical}
      />
      <EventsList past pastEvents={pastEvents} />
    </Layout>
  )
}

export default Events
