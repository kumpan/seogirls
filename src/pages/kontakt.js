import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import styles from "./kontakt.module.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHero from "../components/hero/page-hero"

// Icons to import
import { PhoneIcon, EmailOutlineIcon } from "@icons/material"

const Events = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(filter: { fileAbsolutePath: { regex: "/(/contact-page)/" } }) {
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
                contactoptions {
                  call {
                    heading
                    contactinfo
                    contactlink
                  }
                  email {
                    heading
                    contactinfo
                    contactlink
                  }
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
        location="/kontakt"
      />
      <div className={styles.container}>
        <a
          href={`call:${pageData.frontmatter.contactoptions.call.contactlink}`}
          className={styles.contactCard}
        >
          <div className={styles.contactIcon}>
            <PhoneIcon />
          </div>
          <span className={styles.contactHeading}>
            {pageData.frontmatter.contactoptions.call.heading}
          </span>
          <h3>{pageData.frontmatter.contactoptions.call.contactinfo}</h3>
        </a>
        <a
          href={`mailto:${pageData.frontmatter.contactoptions.email.contactlink}`}
          className={styles.contactCard}
        >
          <div className={styles.contactIcon}>
            <EmailOutlineIcon />
          </div>
          <span className={styles.contactHeading}>
            {pageData.frontmatter.contactoptions.email.heading}
          </span>
          <h3>{pageData.frontmatter.contactoptions.email.contactinfo}</h3>
        </a>
      </div>
    </Layout>
  )
}

export default Events
