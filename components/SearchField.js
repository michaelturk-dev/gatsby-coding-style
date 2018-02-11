import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { TextInput } from '@tradeschool/components'

import searchField from 'styles/Conversations/SearchField.module.scss'

const SearchField = (props) => {
  const { label, id, placeholder, onChange, ...restProps } = props
  const [value, setValue] = useState('')

  useEffect(() => {
    onChange(value)
  }, [value])

  return (
    <div className={searchField.container}>
      <img
        className={searchField.icon}
        alt="search"
        src="/recruiter/icons/phone.svg"
      />
      <TextInput
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        label={label}
        id={id}
        className={searchField.input}
        {...restProps}
      />
    </div>
  )
}

SearchField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

export default SearchField
