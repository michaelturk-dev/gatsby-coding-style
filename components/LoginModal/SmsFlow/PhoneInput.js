import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { Button } from '@tradeschool/components'

import PhoneNumberField from 'components/PhoneNumberField'
import { useAuth } from 'providers/AuthProvider'

import loginModalStyles from 'styles/LoginModal.module.scss'

const PhoneInput = ({
  setPhoneNumber,
  setWaitingForCode,
  showDisclaimer,
  dataAttributeId,
}) => {
  const { webAuth } = useAuth()
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const dataAttribute = {}
  if (dataAttributeId) {
    dataAttribute[`data-${dataAttributeId}-phone-number-submission`] = true
  }

  const onSubmit = values => {
    // heap.track('Login Modal Phone Submission', { page: router.pathname })
    setLoading(true)
    setPhoneNumber(values.phone)
    webAuth.passwordlessStart(
      {
        connection: 'sms',
        send: 'code',
        phoneNumber: `+1${values.phone}`,
      },
      (err, res) => {
        if (err) {
          setError(err)
          console.error(err)
          setLoading(false)
          return
        }
        setWaitingForCode(true)
        setLoading(false)
      }
    )
  }

  return (
    <Formik
      initialValues={{ phone: '' }}
      onSubmit={onSubmit}
      validateOnChange={false}
    >
      {({ handleSubmit, values, setFieldError }) => {
        React.useEffect(() => {
          if (error) {
            setFieldError('phone', 'Invalid phone number')
          }
        }, [error])
        return (
          <form onSubmit={handleSubmit}>
            <div className={loginModalStyles.inputContainer}>
              <div className={loginModalStyles.phoneLabel}>+1</div>
              <PhoneNumberField
                data-login-modal-phone-input={true}
                name="phone"
                placeholder="Phone Number"
                sx={{ boxShadow: '0 1px 4px 0 #00000033' }}
              />
            </div>
            <Button
              type="submit"
              width="100%"
              disabled={values.phone.length < 10 || loading}
              marginTop="1rem"
              data-login-modal-continue={true}
              {...dataAttribute}
            >
              Continue
            </Button>
            {showDisclaimer && (
              <small className={loginModalStyles.smallText}>
                We’ll send you a confirmation code. Standard rates apply.
              </small>
            )}
          </form>
        )
      }}
    </Formik>
  )
}

PhoneInput.propTypes = {
  setPhoneNumber: PropTypes.func.isRequired,
  setWaitingForCode: PropTypes.func.isRequired,
  showDisclaimer: PropTypes.bool,
  dataAttributeId: PropTypes.string,
}

export default PhoneInput
