import React from 'react'
import PropTypes from 'prop-types'
import styles from './../styles/Conversations/IconButton.module.scss'

const IconButton = ({ onClick, children }) => (
  <button className={styles.iconButton} onClick={onClick}>
    {children}
  </button>
)

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default IconButton
