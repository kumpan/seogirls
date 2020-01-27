import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import remark from "remark"
import recommended from "remark-preset-lint-recommended"
import remarkHtml from "remark-html"

import styles from "./footer.module.css"

const Footer = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMdx(filter: { fileAbsolutePath: { regex: "/(footer)/" } }) {
          edges {
            node {
              frontmatter {
                title
                copyright
                linkscenter
                linksright
              }
            }
          }
        }
      }
    `
  )

  // Remark MD-content outside of body
  const copyright = remark()
    .use(recommended)
    .use(remarkHtml)
    .processSync(data.allMdx.edges[0].node.frontmatter.copyright)
    .toString()

  const footerLinksCenter = remark()
    .use(recommended)
    .use(remarkHtml)
    .processSync(data.allMdx.edges[0].node.frontmatter.linkscenter)
    .toString()

  const footerLinksRight = remark()
    .use(recommended)
    .use(remarkHtml)
    .processSync(data.allMdx.edges[0].node.frontmatter.linksright)
    .toString()

  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <h3>{data.allMdx.edges[0].node.frontmatter.title}</h3>
            <div
              className={styles.bottomInfo}
              dangerouslySetInnerHTML={{ __html: copyright }}
            />
          </div>
          <div
            className={styles.column}
            dangerouslySetInnerHTML={{ __html: footerLinksCenter }}
          />
          <div
            className={styles.column}
            dangerouslySetInnerHTML={{ __html: footerLinksRight }}
          />
        </div>
      </div>
    </div>
  )
}

export default Footer
