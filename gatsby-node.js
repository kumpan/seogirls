const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const eventPost = path.resolve(`./src/templates/event-post.js`)
  const pageTemplate = path.resolve(`./src/templates/page-template.js`)

  return graphql(
    `
      {
        blog: allMdx(
          filter: { fileAbsolutePath: { regex: "/(blog)/" } }
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
        pages: allMdx(
          filter: { fileAbsolutePath: { regex: "/(pages)/" } }
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

    // Create blog posts pages.
    const blogPosts = result.data.blog.edges
    const eventPosts = result.data.events.edges
    const pages = result.data.pages.edges

    blogPosts.forEach((post, index) => {
      const previous =
        index === blogPosts.length - 1 ? null : blogPosts[index + 1].node
      const next = index === 0 ? null : blogPosts[index - 1].node

      createPage({
        path: `blog${post.node.fields.slug}`,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

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

    // Create subpages.
    pages.forEach((page, index) => {
      createPage({
        path: `pages${page.node.fields.slug}`,
        component: pageTemplate,
        context: {
          slug: page.node.fields.slug,
          previous,
          next,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
