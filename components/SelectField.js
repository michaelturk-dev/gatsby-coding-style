import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useClickAway } from 'react-use'
import { Field, useFormikContext } from 'formik'

import styles from 'styles/FormFields/SelectField.module.scss'
import textField from 'styles/FormFields/TextField.module.scss'

const getValidator = required => value => {
  if (required && !value) {
    return 'Required'
  }
  return undefined
}

const SelectField = props => {
  const {
    name,
    label,
    id,
    required,
    validate,
    pickText,
    options = [],
    native = false,
    ...restProps
  } = props
  const { errors, values, setFieldValue } = useFormikContext()
  const fieldError = errors[name]

  return (
    <div className={styles.selectContainer}>
      {native &&
        <NativeSelectField id={id} name={name} pickText={pickText} options={options} validate={validate} required={required} label={label} {...restProps} />
      }
      {!native &&
        <StyledSelectField id={id} name={name} pickText={pickText} currentValue={values[name]} options={options} validate={validate} required={required} label={label} setFieldValue={setFieldValue} {...restProps} />
      }
      {fieldError && <div className={textField.errorMessage}>{fieldError}</div>}
    </div>
  )
}

const StyledSelectField = ({ id, name, pickText, options, currentValue, validate, required, setFieldValue, label, ...restProps }) => {
  const fullValue = options.find(v => v.value == currentValue) || ''
  if(!fullValue && !pickText && options.length) {
    setFieldValue(name, options[0].value)
  }
  const [open, setOpen] = useState(false)
  const buttonRef = React.useRef(null)
  useClickAway(buttonRef, () => {
    setOpen(false)
  })
  return (
    <div className={styles.buttonLabelGroup}>
      {label &&
        <label htmlFor={name} className={styles.selectFieldLabel}>{label}</label>
      }
      <div ref={buttonRef} className={styles.selectFieldAsButton}>
        <button type="button" className={styles.button} onClick={() => {
          setOpen(!open)
        }}>
          {fullValue.text ? fullValue.text : fullValue.value || pickText}
          <div className={styles.widthSetter}>
            {pickText &&
              <div className={styles.option}>{pickText}</div>}
            {options.map((v, index) => (
              <div key={index} className={styles.option}>{v.text ? v.text : v.value}</div>
            ))}
          </div>
        </button>
        <div style={{
          visibility: open ? 'visible' : 'hidden',
        }} className={styles.options}>
          {pickText &&
            <div className={styles.option}>{pickText}</div>}
          {options.map((v, index) => (
            <div
              onClick={() => {
                setFieldValue(name, v.value)
                setOpen(false)
                if (restProps && restProps.onChange) {
                  restProps.onChange(({ target: { value: v.value } }))
                }
              }}
              key={index}
              className={styles.option}>
              {v.text ? v.text : v.value}
            </div>
          ))}
        </div>
      </div>
      <Field type="hidden" id={id} name={name} className={styles.hiddenInput} validate={validate || getValidator(required)} {...restProps} />
    </div>
  )
}

const NativeSelectField = ({ id, name, pickText, options, validate, required, label, ...restProps }) => (<>
  {label &&
    <label htmlFor={name} className={styles.selectFieldLabel}>{label}</label>
  }
  <Field component="select" id={id} name={name} className={styles.selectField} validate={validate || getValidator(required)} {...restProps}>
    {pickText &&
      <option>{pickText}</option>
    }
    {options.map((v, index) => (
      <option key={index} value={v.value}>{v.text ? v.text : v.value}</option>
    ))}
  </Field>
</>)

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  validate: PropTypes.func,
  pickText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string,
  })),
  native: PropTypes.bool,
}

export default SelectField
