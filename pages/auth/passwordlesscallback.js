import React from 'react'
import ErrorPage from 'next/error'
import canUseDom from 'can-use-dom'

import { useAuth } from 'providers/AuthProvider'

const PasswordlessCallback = () => {
  const { webAuth, onRedirectCallback } = useAuth()
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    webAuth.parseHash({ hash: window.location.hash }, (err, authResult) => {
      if (err || !authResult) {
        console.error('No authResult', err)
        setError(true)
        return
      }
      if (canUseDom && authResult.appState.callApi) {
        window.localStorage.setItem(
          'callApi',
          JSON.stringify(authResult.appState?.callApi)
        )
      }
      onRedirectCallback(authResult.appState)
    })
  }, [])

  return (
    <>
      {!error ? (
        <div>Logging you in. You will be redirected momentarily</div>

      ) : (
        <ErrorPage statusCode={400} />
      )}
    </>
  )
}

export default PasswordlessCallback
