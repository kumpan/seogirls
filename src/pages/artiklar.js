import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHero from "../components/hero/page-hero"
import EventsList from "../components/events/events-list"

const Articles = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(filter: { fileAbsolutePath: { regex: "/(/articlespage)/" } }) {
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
        articles: allMdx(
          filter: { fileAbsolutePath: { regex: "/(/articles/)/" } }
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
  const articlePosts = data.articles.edges

  return (
    <Layout title={data.site.siteMetadata.title}>
      <SEO title={pageData.title} description={pageData.description} />
      <PageHero
        shortTitle={pageData.shorttitle}
        title={pageData.hero.headingone}
        subheading={pageData.hero.subheading}
        location="/artiklar"
      />
      <EventsList articles articlePosts={articlePosts} />
    </Layout>
  )
}

export default Articles
