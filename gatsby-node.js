const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const eventPost = path.resolve(`./src/templates/event-post.js`)
  const subPage = path.resolve(`./src/templates/subpage-template.js`)

  return graphql(
    `
      {
        comingEvents: allMdx(
          filter: { fileAbsolutePath: { regex: "/(coming-events)/" } }
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
        pastEvents: allMdx(
          filter: { fileAbsolutePath: { regex: "/(past-events)/" } }
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
        sponsors: allMdx(
          filter: { fileAbsolutePath: { regex: "/(sponsors)/" } }
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

    const comingEventPosts = result.data.comingEvents.edges
    const pastEventPosts = result.data.pastEvents.edges
    const infoPages = result.data.infopages.edges

    // Create event posts pages.
    comingEventPosts.forEach((post, index) => {
      const previous =
        index === comingEventPosts.length - 1
          ? null
          : comingEventPosts[index + 1].node
      const next = index === 0 ? null : comingEventPosts[index - 1].node

      createPage({
        path: `coming-events${post.node.fields.slug}`,
        component: eventPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    pastEventPosts.forEach((post, index) => {
      const previous =
        index === pastEventPosts.length - 1
          ? null
          : pastEventPosts[index + 1].node
      const next = index === 0 ? null : pastEventPosts[index - 1].node

      createPage({
        path: `past-events${post.node.fields.slug}`,
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
