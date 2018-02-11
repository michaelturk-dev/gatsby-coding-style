import React from 'react'
import PropTypes from 'prop-types'
import App from 'next/app'
import getConfig from 'next/config'

import { AuthProvider } from 'providers/AuthProvider'
import { UserProvider } from '../providers/UserProvider'
// import { CallApiOnRedirectProvider } from '../providers/CallApiOnRedirectProvider'
// import { GoogleAnalyticsProvider } from '../providers/GoogleAnalyticsProvider'

import '../styles/base.scss'

var RecruiterApp = ({ Component, pageProps }) => {
  const { publicRuntimeConfig } = getConfig()
  return (
    <AuthProvider
      domain={publicRuntimeConfig.auth0Domain}
      clientId={publicRuntimeConfig.auth0ClientId}
      popupRedirect={`${publicRuntimeConfig.auth0Origin}/auth/embeddedcallback`}
      passwordlessRedirect={`${publicRuntimeConfig.auth0Origin}/auth/passwordlesscallback`}
      audience={`${publicRuntimeConfig.auth0Origin}/api`}
    >
      <UserProvider>
        {/*//     <GoogleAnalyticsProvider
    //       trackingId={publicRuntimeConfig.googleAnalyticsTrackingId}
    //     >
    //       <CallApiOnRedirectProvider> */}
        <Component {...pageProps} />
        {/* //       </CallApiOnRedirectProvider>
    //     </GoogleAnalyticsProvider>*/}
      </UserProvider>
    </AuthProvider>
  )
}

RecruiterApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

RecruiterApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default RecruiterApp
