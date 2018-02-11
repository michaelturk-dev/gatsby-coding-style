import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { TextInput } from '@tradeschool/components'

import messageField from 'styles/Conversations/MessageField.module.scss'

const MessageField = (props) => {
  const { label, id, placeholder, onChange, ...restProps } = props
  const [value, setValue] = useState('')

  useEffect(() => {
    onChange(value)
  }, [value])

  return (
    <div className={messageField.container}>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        label={label}
        id={id}
        className={messageField.input}
        {...restProps}
      />
      <div className={messageField.icons}>
        <img alt="settings" src="/recruiter/icons/phone.svg" />
        <img alt="emoji" src="/recruiter/icons/phone.svg" />
      </div>
    </div>
  )
}

MessageField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

export default MessageField
