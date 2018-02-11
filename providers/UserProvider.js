import React from 'react'
import PropTypes from 'prop-types'
import canUseDom from 'can-use-dom'

import { useAuth } from './AuthProvider'
import callApi from 'lib/callApi'

export const UserContext = React.createContext()
export const useUser = () => React.useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState()
  const { identity, getToken, loadingIdentity } = useAuth()
  const [loadingUser, setLoadingUser] = React.useState(loadingIdentity)

  const fetchUser = async token => {
    try {
      const resp = await callApi({ token, apiPath: '/users/externalid' })
      if (resp.ok) {
        const user = await resp.json()
        return { didFetch: true, user, resp }
      }
      return { didFetch: false, user: null, resp }
    } catch (err) {
      console.error(err)
      return err
    }
  }

  const createUser = async token => {
    try {
      const resp = await callApi({
        token,
        apiPath: '/users',
        method: 'POST',
        body: identity,
      })

      if (resp.ok) {
        const user = await resp.json()
        return { didCreate: true, user, resp }
      }
      return { didCreate: false, user: null, resp }
    } catch (err) {
      console.error(err)
      return err
    }
  }

  const loadUser = async () => {
    if (!loadingIdentity && !identity) {
      setLoadingUser(false)
      return
    }
    if (!loadingIdentity && identity) {
      setLoadingUser(true)
      const token = getToken()

      try {
        const requestedUser = await fetchUser(token)
        if (requestedUser.didFetch) {
          setUser(requestedUser.user)
          return
        }
        const createdUser = await createUser(token)
        if (createdUser.didCreate) {
          setUser(createdUser.user)
          return
        }
        console.error('Unable to set user', createdUser.resp)
      } catch (e) {
        console.error(e)
      } finally {
        setLoadingUser(false)
      }
    }
  }

  React.useEffect(() => {
    loadUser()
    if (user && canUseDom) {
      heap.identify(user._id)
    }
  }, [identity, loadingIdentity])

  return (
    <UserContext.Provider
      value={{
        user,
        loadingUser,
        setUser: userToSet => setUser(userToSet),
        loadUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node,
}
