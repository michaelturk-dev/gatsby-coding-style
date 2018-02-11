import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import auth0 from 'auth0-js'
import { useCookie } from 'react-use'
import jwtDecode from 'jwt-decode'

import LoginModal from 'components/LoginModal'

export const AuthContext = React.createContext()
export const useAuth = () => React.useContext(AuthContext)

export const AuthProvider = props => {
  const {
    children,
    domain,
    clientId,
    popupRedirect,
    passwordlessRedirect,
    audience,
  } = props

  const router = useRouter()

  const [tokenCookie, setTokenCookie, deleteTokenCookie] = useCookie('token')

  const [identity, setIdentity] = React.useState()
  const [loadingIdentity, setLoadingIdentity] = React.useState(true)
  const [loginModalOpen, setLoginModalOpen] = React.useState(false)
  const [modalTitle, setModalTitle] = React.useState()
  const [loginParams, setLoginParams] = React.useState()

  // In order to use passwordlessLogin, the options redirectUri and
  // responseType must be specified when first initializing WebAuth.
  // See https://auth0.com/docs/libraries/auth0js/v9#passwordless-login
  //
  // However, popup login redirectUri's can be configured after initialization
  // See https://auth0.com/docs/libraries/auth0js/v9#webauth-popup-authorize-
  const webAuth = new auth0.WebAuth({
    redirectUri: passwordlessRedirect,
    domain: domain,
    clientID: clientId,
    audience: audience,
    responseType: 'token id_token',
    scope: 'openid profile email',
  })

  const handleAuthResp = res => {
    // Order matters here. Cookie needs to be set before identity for UserProvider
    // to be able to properly fetch the user
    setTokenCookie(res.accessToken)
    setIdentity(res.idTokenPayload)
  }

  React.useEffect(() => {
    setLoadingIdentity(true)
    webAuth.checkSession({}, (err, res) => {
      if (res) {
        handleAuthResp(res)
      }
      setLoadingIdentity(false)
    })
  }, [])

  const getToken = () => {
    // If there is no token in the `token` cookie, fetch one and set the cookie
    if (!tokenCookie) {
      webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          return null
        }
        setTokenCookie(authResult.accessToken)
        return authResult.accessToken
      })
    }
    // If the cookie is present, ensure it has not expired.
    // If it has, fetch a new one and set the cookie.
    // The expiration time is a unix timestamp in seconds.
    // Date.now() returns a timestamp in miliseconds.
    // To account for this, we devide Date.now() / 1000
    if (jwtDecode(tokenCookie)?.exp < Math.floor(Date.now() / 1000)) {
      webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          return null
        }
        setTokenCookie(authResult.accessToken)
        return authResult.accessToken
      })
    }

    return tokenCookie
  }

  const signUpWithModal = async (params = {}) => {
    setLoginParams(params)
    setModalTitle('Sign Up')
    setLoginModalOpen(true)
  }

  const loginWithModal = async (params = {}) => {
    setLoginParams(params)
    setModalTitle('Log In')
    setLoginModalOpen(true)
  }

  const onModalClose = () => {
    setLoginModalOpen(false)
    setLoginParams(null)
  }

  const onRedirectCallback = appState => {
    const redirectUrl = appState?.targetUrl
      ? appState.targetUrl
      : window.location.pathname
    router.push(redirectUrl)
  }

  const logout = () => {
    deleteTokenCookie()
    webAuth.logout()
  }

  return (
    <AuthContext.Provider
      value={{
        identity,
        loadingIdentity,
        loginWithModal: (...p) => loginWithModal(...p),
        signUpWithModal: (...p) => signUpWithModal(...p),
        loginModalOpen,
        setLoginModalOpen,
        getToken,
        webAuth,
        logout,
        onRedirectCallback,
        popupRedirect,
        handleAuthResp,
      }}
    >
      <LoginModal
        state={loginParams?.appState}
        title={modalTitle}
        handleClose={onModalClose}
      />
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node,
  domain: PropTypes.string,
  clientId: PropTypes.string,
  popupRedirect: PropTypes.string,
  passwordlessRedirect: PropTypes.string,
  audience: PropTypes.string,
}
