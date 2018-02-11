import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useUser } from 'providers/UserProvider'
import callApi from 'lib/callApi'
import { useAuth } from 'providers/AuthProvider'

const Home = () => {
  const { getToken, logout } = useAuth()
  const { loadingUser, user } = useUser()
  const router = useRouter()

  React.useEffect(() => {
    console.log(user, loadingUser)
    if (!loadingUser && user && user.school) {
      callApi({
        apiPath: `/trades/${user.school}`,
        token: getToken(),
      }).then((res) => {
        res.json().then((trades) => {
          let firstTrade = trades.data.sort((a, b) => {
            let nameA = a.name.toUpperCase()
            let nameB = b.name.toUpperCase()
            if (nameA < nameB) {
              return -1
            }
            if (nameA > nameB) {
              return 1
            }
            return 0
          })[0]
          router.push(`/${user.school}/${trades.data[0].slug}/${firstTrade.defaultPhase.slug}`)
        })
      })
    } else if (!loadingUser && user && !user.school) {
      logout()
    } else if (!loadingUser && !user) {
      router.push('/login')
    }
  }, [user, loadingUser, getToken, logout, router])


  // Display this while checking for a user. Needs updated to show something prettier
  if (loadingUser) {
    return 'loading...'
  }

  return (
    <div>
      <Head>
        <title>Traderecruiter.com</title>
        <link rel="icon" href="/recruiter/favicon.png" />
      </Head>

    </div>
  )
}

export default Home
