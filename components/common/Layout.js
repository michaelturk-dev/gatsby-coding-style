import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

import Nav from './Nav'
// import Footer from './Footer'

const Layout = ({ children, stickyNav, showNav = true, showFooter = true }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/recruiter/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div>
        {showNav && <Nav sticky={true} />}
        <section className="ts-grid-main">{children}</section>

        {showFooter && (
          <footer className="ts-grid-footer">
            {/* <Footer
              socialLinks={{
                facebookUrl: publicRuntimeConfig.facebookUrl || '#',
                twitterUrl: publicRuntimeConfig.twitterUrl || '#',
                instagramUrl: publicRuntimeConfig.instagramUrl || '#',
              }}
            /> */}
          </footer>
        )}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  stickyNav: PropTypes.bool,
  showNav: PropTypes.bool,
  showFooter: PropTypes.bool,
  navComponent: PropTypes.node,
}

export default Layout
