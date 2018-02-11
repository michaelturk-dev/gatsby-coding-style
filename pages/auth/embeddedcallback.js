import React from 'react'

import { useAuth } from 'providers/AuthProvider'

const EmbeddedCallback = () => {
  const { webAuth } = useAuth()

  React.useEffect(() => {
    webAuth.popup.callback()
  })

  return (
    <div>Logging you in. You will be redirected momentarily</div>
  )
}

export default EmbeddedCallback
