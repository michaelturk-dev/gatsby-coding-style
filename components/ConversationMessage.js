import React from 'react'
import PropTypes from 'prop-types'
import { AvatarWithName } from '@tradeschool/components'
import ReactTimeago from 'react-timeago'
import styles from './../styles/Conversations/ConversationMessage.module.scss'

const ConversationMessage = (props) => {
  const { message, isFirst, inSequence, hasDelay } = props

  return (
    <div
      className={styles.message}
      style={{
        marginTop: isFirst || !inSequence ? 20 : 0,
      }}
    >
      <div className={styles.avatar}>
        {(isFirst || !inSequence) && (
          <AvatarWithName image={message.user.image} />
        )}
      </div>
      <div className={styles.text}>
        {(isFirst || !inSequence) && <h6>{message.user.name}</h6>}
        <div className={styles.content}>
          <p>{message.content}</p>
          {(isFirst || !inSequence || hasDelay) && (
            <ReactTimeago
              minPeriod="60"
              date={new Date(message.createdAt)}
              formatter={(value, unit, suffix, epochSeconds, nextFormatter) => {
                if (unit == 'second') {
                  return 'just now'
                } else if (unit == 'minute' && value == 1) {
                  return 'a minute ago'
                }
                return nextFormatter(
                  value,
                  unit,
                  suffix,
                  epochSeconds,
                  nextFormatter
                )
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

ConversationMessage.propTypes = {
  isFirst: PropTypes.bool,
  inSequence: PropTypes.bool,
  hasDelay: PropTypes.bool,
  message: PropTypes.shape({
    content: PropTypes.string,
    createdAt: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
    }),
  }),
}

ConversationMessage.defaultProps = {
  isFirst: false,
  inSequence: false,
  hasDelay: false,
}

export default ConversationMessage
