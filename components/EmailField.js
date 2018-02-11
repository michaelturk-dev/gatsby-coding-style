import React from 'react'
import PropTypes from 'prop-types'
import { Field, useFormikContext } from 'formik'
import { TextInput } from '@tradeschool/components'

import textField from 'styles/FormFields/TextField.module.scss'

const getValidator = required => value => {
  if (required && !value) {
    return 'Required'
  }
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return 'Invalid Email Address'
  }
  return undefined
}

const EmailField = props => {
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
        validate={validate || getValidator(required)}
      >
        {({ form, field }) => (
          <TextInput
            placeholder={placeholder}
            value={field.value}
            onChange={e => form.setFieldValue(name, e.target.value)}
            error={fieldError}
            label={label}
            id={id}
            type="email"
            className={textField.input}
            {...restProps}
          />
        )}
      </Field>
      {fieldError && <div className={textField.errorMessage}>{fieldError}</div>}
    </div>
  )
}

EmailField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  validate: PropTypes.func,
}

export default EmailField
