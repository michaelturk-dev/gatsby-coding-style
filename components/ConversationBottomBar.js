import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IconButton from './IconButton'
import MessageField from './MessageField'
import styles from './../styles/Conversations/ConversationBottomBar.module.scss'
import { Button } from '@tradeschool/components'

const ConversationBottomBar = (props) => {
  const [message, setMessage] = useState('')
  const { onSend } = props

  return (
    <div className={styles.bottomBar}>
      <button className={styles.fileIconButton}>
        <img alt="file" src="/recruiter/icons/phone.svg" />
      </button>
      <MessageField
        name="send-message"
        placeholder="Type your message"
        onChange={setMessage}
      />
      <Button variant="red" size="default" onClick={onSend}>
        Send
      </Button>
    </div>
  )
}

ConversationBottomBar.propTypes = {
  onSend: PropTypes.func.isRequired,
}

export default ConversationBottomBar
