import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHero from "../components/hero/page-hero"
import SponsorCard from "../components/sponsor-card"

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
                hero {
                  headingone
                  subheading
                }
              }
            }
          }
        }
        sponsors: allMdx(
          filter: { fileAbsolutePath: { regex: "/(sponsors/)/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              body
              frontmatter {
                path
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
      }
    `
  )
  const pageData = data.allMdx.edges[0].node.frontmatter
  const sponsors = data.sponsors.edges

  return (
    <>
      <Layout becomeSponsor title={data.site.siteMetadata.title}>
        <SEO title={pageData.title} />
        <PageHero
          shortTitle={pageData.shorttitle}
          title={pageData.hero.headingone}
          subheading={pageData.hero.subheading}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "864px",
            marginTop: "-40px",
          }}
        >
          {sponsors.map(({ node }, index) => {
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
    </>
  )
}

export default Events
