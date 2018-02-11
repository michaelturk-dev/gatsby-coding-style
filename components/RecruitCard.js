import React from 'react'
import PropTypes from 'prop-types'
import { Card, AvatarWithName } from '@tradeschool/components'

import styles from 'styles/RecruitBoard/RecruitCard.module.scss'

const scoreColors = {
  'Cold': '#1673be',
  'Warm': '#ff7b00',
  'Hot': '#ff1a34',
}

const RecruitCard = ({ recruit }) => {
  const name = recruit.firstName || recruit.lastName ? `${recruit.firstName} ${recruit.lastName}` : 'N/A'
  return (
    <Card width="100%" style={{
      borderRight: `3px solid ${scoreColors[recruit.score]}`,
    }}>
      <div>
        <AvatarWithName name={name} image={recruit.avatar} subText={`Score: ${recruit.score || 'N/A'}`} />
      </div>
      <div className={styles.iconRow}>
        {recruit.phone &&
          <div className={styles.cardIconWrapper}>
            <img className={styles.cardIcon} alt="phone" src="/recruiter/icons/phone.svg" />
          </div>
        }
        {recruit.email &&
          <div className={styles.cardIconWrapper}>
            <img className={styles.cardIcon} alt="email" src="/recruiter/icons/email.svg" />
          </div>
        }
      </div>
    </Card>
  )
}

RecruitCard.propTypes = {
  recruit: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    score: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
}

export default RecruitCard
