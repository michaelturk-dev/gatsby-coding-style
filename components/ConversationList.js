import React from 'react'
import PropTypes from 'prop-types'
import ConversationMessage from './ConversationMessage'

const ConversationList = ({ messages }) => (
  <div>
    {messages.map((message, idx) => {
      console.log('MESSAGE', message)
      const previous = Math.max(0, idx - 1)
      const previousMessage = messages[previous]

      const isFirst = previous === idx
      const inSequence = message.user.id === previousMessage.user.id
      const hasDelay =
        Math.ceil(
          (message.createdAt - previousMessage.createdAt) / (1000 * 60)
        ) > 1

      return (
        <ConversationMessage
          key={idx}
          message={message}
          isFirst={isFirst}
          inSequence={inSequence}
          hasDelay={hasDelay}
        />
      )
    })}
  </div>
)

ConversationList.propTypes = {
  messages: PropTypes.array,
}

export default ConversationList
