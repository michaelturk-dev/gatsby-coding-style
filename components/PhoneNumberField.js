import React from 'react'
import PropTypes from 'prop-types'
import { Field, useFormikContext } from 'formik'
import { PhoneInput } from '@tradeschool/components'

import textField from 'styles/FormFields/TextField.module.scss'

const getValidator = required => value => {
  if (required && !value) {
    return 'Required'
  }
  if (value && !/^[0-9]{10}/.test(value)) {
    return 'Invalid Phone Number'
  }
  return undefined
}

const PhoneNumberField = props => {
  const {
    name,
    placeholder,
    required,
    validate,
    label,
    id,
    ...restProps
  } = props
  const { errors } = useFormikContext()
  const fieldError = errors[name]

  return (
    <div className={textField.container}>
      <Field
        name={name}
        autofocus
        validate={validate || getValidator(required)}
      >
        {({ field, form }) => (
          <PhoneInput
            value={field.value}
            onChange={input => form.setFieldValue(name, input)}
            placeholder={placeholder}
            error={fieldError}
            label={label}
            id={id}
            className={textField.input}
            type="tel"
            {...restProps}
          />
        )}
      </Field>
      {fieldError && <div className={textField.errorMessage}>{fieldError}</div>}
    </div>
  )
}

PhoneNumberField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  validate: PropTypes.func,
}

export default PhoneNumberField
