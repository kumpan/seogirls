import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHero from "../components/hero/page-hero"
import SponsorCard from "../components/sponsor-card"

import styles from "./sponsorer.module.css"

const Events = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(filter: { fileAbsolutePath: { regex: "/(/sponsors-page)/" } }) {
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
                sponsorcontent {
                  mainsponsorstitle
                  eventsponsorstitle
                }
              }
            }
          }
        }
        mainSponsors: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(sponsors/)/" }
            frontmatter: { sponsortype: { regex: "/(main)/" } }
          }
          sort: { fields: [frontmatter___title], order: ASC }
        ) {
          edges {
            node {
              body
              frontmatter {
                path
                title
                url
                color
                logo {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
        eventSponsors: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(sponsors/)/" }
            frontmatter: { sponsortype: { regex: "/(event)/" } }
          }
          sort: { fields: [frontmatter___title], order: ASC }
        ) {
          edges {
            node {
              body
              frontmatter {
                path
                title
                url
                color
                logo {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
        emojiHeartRed: file(relativePath: { eq: "emoji-heart.png" }) {
          childImageSharp {
            fixed(width: 28, height: 28) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        emojiHeartYellow: file(relativePath: { eq: "emoji-heart-yellow.png" }) {
          childImageSharp {
            fixed(width: 28, height: 28) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )
  const pageData = data.allMdx.edges[0].node.frontmatter
  const mainSponsors = data.mainSponsors.edges
  const eventSponsors = data.eventSponsors.edges
  const sponsorContent = data.allMdx.edges[0].node.frontmatter.sponsorcontent

  return (
    <Layout becomeSponsor title={data.site.siteMetadata.title}>
      <SEO
        title={pageData.title}
        description={pageData.description}
        canonical={pageData.canonical}
      />
      <PageHero
        shortTitle={pageData.shorttitle}
        title={pageData.hero.headingone}
        subheading={pageData.hero.subheading}
        location="/sponsorer"
        canonical={pageData.canonical}
      />
      <div className={styles.container}>
        <h3>
          <Img
            fixed={data.emojiHeartRed.childImageSharp.fixed}
            alt="Emoji Heart Red"
            style={{
              marginRight: "8px",
            }}
          />
          {sponsorContent.mainsponsorstitle}
        </h3>
        {mainSponsors.map(({ node }) => {
          return (
            <SponsorCard
              key={node.frontmatter.path}
              title={node.frontmatter.title}
              color={node.frontmatter.color}
              logo={node.frontmatter.logo.childImageSharp.fluid}
              description={node.body}
              url={node.frontmatter.url}
            />
          )
        })}
        <h3>
          <Img
            fixed={data.emojiHeartYellow.childImageSharp.fixed}
            alt="Emoji Heart Yellow"
            style={{
              marginRight: "8px",
            }}
          />
          {sponsorContent.eventsponsorstitle}
        </h3>
        {eventSponsors.map(({ node }) => {
          return (
            <SponsorCard
              key={node.frontmatter.path}
              title={node.frontmatter.title}
              color={node.frontmatter.color}
              logo={node.frontmatter.logo.childImageSharp.fluid}
              description={node.body}
              url={node.frontmatter.url}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export default Events
