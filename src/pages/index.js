import React from 'react'
import { Link, graphql } from 'gatsby'
import SiteHeader from '../components/SiteHeader'
import './../sass/styles.scss'

const Layout = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <div>
      <SiteHeader className='is-size-1' />
      <section className='section has-text-centered'>
        <div className='container'>
          {edges.map(edge => {
            const { frontmatter } = edge.node
            return (
              <div key={frontmatter.path}>
                <div className='card'>
                  <div className='card-content'>
                    <Link to={frontmatter.path}>
                      <p className='title'>{frontmatter.title}</p>
                      <div className='card-image'>
                        <figure className='image is-5by4'>
                          <img
                            src={frontmatter.image.childImageSharp.sizes.src}
                            srcSet={frontmatter.image.childImageSharp.sizes.srcSet}
                            alt={`Pic for ${frontmatter.title}`} />
                        </figure>
                      </div>
                      <br />
                    </Link>
                    <div className='subtitle'>
                      {frontmatter.excerpt}
                    </div>
                  </div>
                </div>
                <br />
              </div>
            )
          })}
        </div>
        <div className='navabar is-size-4'>
          <br />
          <Link to='/tags'>Buscar notas por sus tags</Link>
        </div>
      </section>
    </div>
  )
}

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            excerpt
            path
            date
            image {
              childImageSharp {
                sizes(maxWidth: 720, quality: 85) {
                  ...GatsbyImageSharpSizes_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Layout
