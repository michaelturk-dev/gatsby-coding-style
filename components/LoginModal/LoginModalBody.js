import React from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { Button } from '@tradeschool/components'
import { TradeschoolLogo } from '@tradeschool/icons'

import SmsFlow from './SmsFlow'
import FacebookFlow from './FacebookFlow'

import styles from 'styles/LoginModal.module.scss'

const LoginModalBody = props => {
  const { title, state } = props
  const [waitingForCode, setWaitingForCode] = React.useState(false)
  const [header, setHeader] = React.useState(title)
  const router = useRouter()

  const isSignUp = header == 'Sign Up'

  // React.useEffect(
  //   () => heap.track('Login Modal Opened', { page: router.pathname }),
  //   []
  // )

  return (
    <div className={styles.loginModal}>
      <div className={styles.header}>
        <TradeschoolLogo size="50px" className={styles.icon} />
        {header}
      </div>
      <div className={styles.subHeader}>
        {isSignUp ? <>Let's get you started</> : 'Welcome back'}
      </div>
      <div className={styles.stepIndicatorContainer}>
        <div className={`${styles.stepIndicator} ${styles.activeStep}`} />
        <div
          className={`${styles.stepIndicator} ${
            waitingForCode && styles.activeStep
          }`}
        />
      </div>
      <SmsFlow
        state={state}
        waitingForCode={waitingForCode}
        setWaitingForCode={setWaitingForCode}
      />
      {!waitingForCode && (
        <>
          <div className={styles.divider}>
            <span className={styles.dividerText}>Or</span>{' '}
          </div>
          <FacebookFlow state={state} />
        </>
      )}
      {!waitingForCode && (
        <div className={styles.reset}>
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <Button
                variant="link"
                size="none"
                text="Log in"
                display="inline-block"
                onClick={() => setHeader('Log In')}
                data-login-modal-log-in={true}
              />
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <Button
                variant="link"
                size="none"
                text="Sign Up"
                display="inline-block"
                onClick={() => setHeader('Sign Up')}
                data-login-modal-sign-up={true}
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}

LoginModalBody.propTypes = {
  state: PropTypes.object,
  title: PropTypes.string,
}

export default LoginModalBody
