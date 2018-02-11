import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

import { useUser } from '../providers/UserProvider'

const Warden = props => {
  const { requireAdmin = false, redirectTo, children } = props
  const { user, loadingUser } = useUser()
  const router = useRouter()

  // Display this while checking for a user. Needs updated to show something prettier
  if (loadingUser && !user) {
    return 'loading...'
  }

  // If user is present and does not need to be an admin, render children
  if (!requireAdmin && user) {
    return children
  }

  // If user is present, the user needs to be an admin, and the user is an admin
  // render children
  if (requireAdmin && user && user.isAdmin) {
    return children
  }

  // If the user is not present, or is present but is not an admin when they need to be
  // send to login page that will send them to home page upon successful login
  if (!redirectTo) {
    router.push('/login')
    return null
  }

  // If the user is not present, or is present but is not an admin when they need to be
  // and a redirectTo prop is passed
  // send to login page that will send them specified redirectTo URL upon successful login
  router.push(`/login?redirect=${redirectTo}`)
  return null
}

export default Warden

Warden.propTypes = {
  requireAdmin: PropTypes.bool,
  redirectTo: PropTypes.string,
  children: PropTypes.node,
}
