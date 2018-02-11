import React from 'react'
import PropTypes from 'prop-types'
import { Field, useFormikContext } from 'formik'
import { SMSCodeInput } from '@tradeschool/components'

import textField from 'styles/FormFields/TextField.module.scss'

const getValidator = required => value => {
  if (required && !value) {
    return 'Required'
  }
  return undefined
}

const SMSCodeField = props => {
  const {
    name,
    required,
    validate,
    label,
    id,
    codeLength = 6,
    ...restProps
  } = props
  const { errors } = useFormikContext()
  const fieldError = errors[name]

  return (
    <div className={textField.container}>
      <Field name={name} validate={validate || getValidator(required)}>
        {({ field, form }) => (
          <SMSCodeInput
            value={field.value}
            onChange={input => form.setFieldValue(name, input)}
            error={fieldError}
            label={label}
            id={id}
            codeLength={codeLength}
            {...restProps}
          />
        )}
      </Field>
      {fieldError && <div className={textField.errorMessage}>{fieldError}</div>}
    </div>
  )
}

SMSCodeField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  validate: PropTypes.func,
  codeLength: PropTypes.number,
}

export default SMSCodeField
