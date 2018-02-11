import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { Button } from '@tradeschool/components'

import SMSCodeField from 'components/SMSCodeField'
import { useAuth } from 'providers/AuthProvider'

import styles from 'styles/LoginModal.module.scss'

const CodeInput = ({
  phoneNumber,
  state,
  setWaitingForCode,
  dataAttributeId,
}) => {
  const { webAuth } = useAuth()
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const dataAttribute = {}
  if (dataAttributeId) {
    dataAttribute[`data-${dataAttributeId}-sms-code-submission`] = true
  }

  const reset = () => {
    setLoading(false)
    setWaitingForCode(false)
  }

  const loginPasswordless = values => {
    // heap.track('Login Modal Code submission', { page: router.pathname })
    setLoading(true)
    if (values.verification_code) {
      webAuth.passwordlessLogin(
        {
          connection: 'sms',
          phoneNumber: `+1${phoneNumber}`,
          verificationCode: values.verification_code,
          appState: state,
        },
        (err, res) => {
          if (err) {
            setError(err)
            console.error(err)
            setLoading(false)
            return
          }
          setWaitingForCode(false)
          setLoading(false)
        }
      )
    }
  }
  return (
    <>
      <Formik
        onSubmit={loginPasswordless}
        initialValues={{ verification_code: '' }}
      >
        {({ handleSubmit, values, setFieldError }) => {
          React.useEffect(() => {
            if (error) {
              setFieldError('verification_code', 'Invalid Code')
            }
          }, [error])

          return (
            <form onSubmit={handleSubmit} className={styles.codeForm}>
              <SMSCodeField
                data-login-modal-code-input={true}
                required
                name="verification_code"
              />
              <div className={styles.verifyContainer}>
                <Button
                  type="submit"
                  width="100%"
                  marginTop="1rem"
                  disabled={values.verification_code.length < 6 || loading}
                  data-login-modal-verify={true}
                  {...dataAttribute}
                >
                  Verify
                </Button>
              </div>
            </form>
          )
        }}
      </Formik>
      <div className={styles.reset}>
        Didn't receive code?{' '}
        <Button
          display="inline-block"
          variant="link"
          size="none"
          text="Try Again"
          onClick={() => reset()}
          data-login-modal-try-again={true}
        />
      </div>
    </>
  )
}

CodeInput.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  setWaitingForCode: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  dataAttributeId: PropTypes.string,
}

export default CodeInput
