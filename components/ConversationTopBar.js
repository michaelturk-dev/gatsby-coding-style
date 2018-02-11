import React from 'react'
import PropTypes from 'prop-types'
import IconButton from './IconButton'
import SearchField from './SearchField'
import styles from './../styles/Conversations/ConversationTopBar.module.scss'

const ConversationTopBar = (props) => {
  const { title, description, onSearch } = props

  return (
    <div className={styles.topBar}>
      <div className={styles.topBarLeft}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={styles.topBarRight}>
        <SearchField
          name="conversations-search"
          placeholder="Search this conversation"
          onChange={onSearch}
        />
        <IconButton onClick={() => {}}>
          <img alt="phone" src="/recruiter/icons/phone.svg" />
        </IconButton>
        <IconButton onClick={() => {}}>
          <img alt="phone" src="/recruiter/icons/star.svg" />
        </IconButton>
      </div>
    </div>
  )
}

ConversationTopBar.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
}

export default ConversationTopBar
