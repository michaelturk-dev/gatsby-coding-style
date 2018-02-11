import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useUser } from 'providers/UserProvider'
import LoginModal from 'components/LoginModal'

const Login = ({ redirectUrl }) => {
  const { loadingUser, user } = useUser()
  const router = useRouter()

  // Display this while checking for a user. Needs updated to show something prettier
  if (loadingUser) {
    return 'loading...'
  }

  // If there is already a user, just send them to the redirectUrl
  if (!loadingUser && user && redirectUrl) {
    router.push(redirectUrl)
    return null
  }

  // If no user, prompt login
  return (
    <div>
      <Head>
        <title>Tradeschool.com</title>
        <link rel="icon" href="/recruiter/favicon.png" />
      </Head>
      <LoginModal
        show={true}
        header={<h1>Log In</h1>}
        showCloseBar={false}
        closeOnOutsideClick={false}
        state={{ targetUrl: redirectUrl }}
      />
    </div>
  )
}

Login.propTypes = {
  redirectUrl: PropTypes.string,
}

export async function getServerSideProps(req) {
  // If no redirect query string is present in request URL, send to home page upon successful login
  const redirectUrl = req.query?.redirect || '/'
  return {
    props: { redirectUrl },
  }
}

export default Login
