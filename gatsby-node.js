const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const eventPost = path.resolve(`./src/templates/event-post.js`)

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
                path
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
                path
              }
            }
          }
        }
        articles: allMdx(
          filter: { fileAbsolutePath: { regex: "/(articles/)/" } }
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
                path
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
    const articlePosts = result.data.articles.edges

    // Create event posts pages.
    comingEventPosts.forEach((post, index) => {
      createPage({
        path: `coming-events/${post.node.frontmatter.path}`,
        component: eventPost,
        context: {
          slug: post.node.fields.slug,
        },
      })
    })

    pastEventPosts.forEach((post, index) => {
      createPage({
        path: `past-events/${post.node.frontmatter.path}`,
        component: eventPost,
        context: {
          slug: post.node.fields.slug,
        },
      })
    })

    articlePosts.forEach((post, index) => {
      createPage({
        path: `articles/${post.node.frontmatter.path}`,
        component: eventPost,
        context: {
          slug: post.node.fields.slug,
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
