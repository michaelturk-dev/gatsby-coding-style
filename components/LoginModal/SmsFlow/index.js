import React from 'react'
import PropTypes from 'prop-types'

import PhoneInput from './PhoneInput'
import CodeInput from './CodeInput'

const SmsFlow = ({
  state,
  waitingForCode,
  setWaitingForCode,
  showDisclaimer = true,
  dataAttributeId,
}) => {
  const [phoneNumber, setPhoneNumber] = React.useState(null)

  return (
    <>
      {waitingForCode ? (
        <CodeInput
          phoneNumber={phoneNumber}
          state={state}
          setWaitingForCode={setWaitingForCode}
          dataAttributeId={dataAttributeId}
        />
      ) : (
        <PhoneInput
          setPhoneNumber={setPhoneNumber}
          setWaitingForCode={setWaitingForCode}
          showDisclaimer={showDisclaimer}
          dataAttributeId={dataAttributeId}
        />
      )}
    </>
  )
}

SmsFlow.propTypes = {
  state: PropTypes.object,
  waitingForCode: PropTypes.bool,
  setWaitingForCode: PropTypes.func,
  showDisclaimer: PropTypes.bool,
  dataAttributeId: PropTypes.string,
}

export default SmsFlow
