import React from 'react'
import PropTypes from 'prop-types'
import { Field, useFormikContext } from 'formik'
import { TextInput } from '@tradeschool/components'

import textField from 'styles/FormFields/TextField.module.scss'

const getValidator = required => value => {
  if (required && !value) {
    return 'Required'
  }
  return undefined
}

const TextField = props => {
  const {
    name,
    label,
    id,
    placeholder,
    required,
    validate,
    ...restProps
  } = props
  const { errors } = useFormikContext()
  const fieldError = errors[name]

  return (
    <>
      <Field name={name} validate={validate || getValidator(required)}>
        {({ field, form }) => (
          <TextInput
            value={field.value}
            placeholder={placeholder}
            onChange={e => form.setFieldValue(name, e.target.value)}
            error={fieldError}
            label={label}
            id={id}
            className={textField.input}
            {...restProps}
          />
        )}
      </Field>
      {fieldError && <div className={textField.errorMessage}>{fieldError}</div>}
    </>
  )
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  validate: PropTypes.func,
  limit: PropTypes.number,
}

export default TextField
