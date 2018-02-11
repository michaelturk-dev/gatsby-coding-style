import React from 'react'
import ConversationMock from './ConversationMock.json'
import styles from 'styles/LeftNav.module.scss'

const ConversationRecruiters = () => {
    return (
        <>
            {/* select option */}
            <div className={styles.selectInputContainer}>
                <select className={styles.select}>
                    <option className={styles.options}>All Recruits</option>
                </select>
            </div>
            {/* recruiters section */}
            <div className={styles.conversationContainer}>
                {ConversationMock && ConversationMock.length !== 0 && ConversationMock.map((single, index) =>
                    <div className={single.userConversationBox ? styles.conversationUsersActive : styles.conversationUsersUnactive}>
                        <div className={styles.activeUser}>
                            {/* left-side image */}
                            <div style={{
                                backgroundImage: `url(${single.picture})`,
                                backgroundSize: "contain",
                                width: "23%",
                                backgroundRepeat: "no-repeat",
                                borderRadius: "10px"
                            }}>
                                <div className={styles.circleContainer} >
                                    <div className={styles.dotContainer}>
                                        <div className={single.isActive ? styles.greenDot : styles.orangeDot}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* right side section    */}
                            <div className={styles.rightSide}>
                                {/* userName and date */}
                                <div className={styles.userNameAndDate}>
                                    <h4 className={styles.heading4}>{single.name}</h4>
                                </div>
                                {/* short msg */}
                                <div className={styles.message}>
                                    <h6 className={styles.heading6}>{single.recruiterMessage}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
export default ConversationRecruiters;