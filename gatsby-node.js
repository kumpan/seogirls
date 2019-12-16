const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const eventPost = path.resolve(`./src/templates/event-post.js`)
  const subPage = path.resolve(`./src/templates/subpage-template.js`)

  return graphql(
    `
      {
        events: allMdx(
          filter: { fileAbsolutePath: { regex: "/(events)/" } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        infopages: allMdx(
          filter: { fileAbsolutePath: { regex: "/(info-pages)/" } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const eventPosts = result.data.events.edges
    const infoPages = result.data.infopages.edges

    // Create event posts pages.
    eventPosts.forEach((post, index) => {
      const previous =
        index === eventPosts.length - 1 ? null : eventPosts[index + 1].node
      const next = index === 0 ? null : eventPosts[index - 1].node

      createPage({
        path: `events${post.node.fields.slug}`,
        component: eventPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    // Create infopages.
    infoPages.forEach((post, index) => {
      const previous =
        index === infoPages.length - 1 ? null : infoPages[index + 1].node
      const next = index === 0 ? null : infoPages[index - 1].node

      createPage({
        path: `${post.node.fields.slug}`,
        component: subPage,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    return null
  })
}

const { fmImagesToRelative } = require("gatsby-remark-relative-images")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node)

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
