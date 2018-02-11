import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { FacebookIcon } from 'react-share'
import canUseDom from 'can-use-dom'
import { Button } from '@tradeschool/components'

import { useAuth } from 'providers/AuthProvider'

import loginModalStyles from 'styles/LoginModal.module.scss'

const FacebookFlow = ({ state, shouldRedirect, dataAttributeId }) => {
  const {
    webAuth,
    popupRedirect,
    handleAuthResp,
    setLoginModalOpen,
  } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const dataAttribute = {}
  if (dataAttributeId) {
    dataAttribute[`data-${dataAttributeId}-facebook-login`] = true
  }

  const facebookLogin = () => {
    setLoading(true)
    webAuth.popup.authorize(
      {
        redirectUri: popupRedirect,
        connection: 'facebook',
        appState: state,
      },
      (err, res) => {
        if (err) {
          setError(err)
          console.error(err)
          setLoading(false)
          return
        }
        handleAuthResp(res)
        // Should not be possible to reach this on the server, but just to be safe
        if (canUseDom && res.appState?.callApi) {
          window.localStorage.setItem(
            'callApi',
            JSON.stringify(res.appState.callApi)
          )
        }
        setLoading(false)
        setLoginModalOpen(false)
        // If you want to send the user to a page after the login completes
        if (shouldRedirect && state.targetUrl) {
          router.push(state.targetUrl)
        }
      }
    )
  }

  return (
    <div className={loginModalStyles.faceBookContainer}>
      <Button
        size="none"
        variant="blueOutline"
        width="100%"
        onClick={facebookLogin}
        disabled={loading}
        height="40px"
        data-login-modal-facebook={true}
        {...dataAttribute}
      >
        <FacebookIcon
          borderRadius="3"
          size="2rem"
          iconFillColor="#104f81"
          bgStyle={{ fill: '#ffffff' }}
          size="35px"
        />
        Continue with Facebook
      </Button>
      {error && (
        <div className={loginModalStyles.error}>
          An error occurred. Please try again.
        </div>
      )}
    </div>
  )
}

FacebookFlow.propTypes = {
  state: PropTypes.object,
  shouldRedirect: PropTypes.bool,
  dataAttributeId: PropTypes.string,
}

export default FacebookFlow
