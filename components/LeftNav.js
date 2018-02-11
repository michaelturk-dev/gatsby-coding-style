import React, { useState } from 'react'
import Link from 'next/link'
import styles from 'styles/LeftNav.module.scss'
import { useRouter } from 'next/router'
import ConversationUsers from './ConversationUsers'
import ConversationRecruiters from './ConversationRecruiters'

const LeftNav = ({ trades = [], schoolId = '', header }) => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(false);
  return (
    <div className={styles.tradeNav}>
      {header &&
        <div className={styles.sideNavContainer}>
          <div className={styles.buttonAndSelectInputContiner}>
            {/* button main container */}
            <div className={styles.tradeNavHeader}>
              <div className={styles.buttonsContainer}>
                <button className={!activeTab ? styles.activeButton : styles.unActiveButton} onClick={() => setActiveTab(false)}>
                  <div><img src="/recruiter/images/chat.png" width="16px" /><span className={styles.buttonText}>Messages</span> </div>
                </button>
                <button className={activeTab ? styles.activeButton : styles.unActiveButton} onClick={() => setActiveTab(true)}>
                  <div><img src="/recruiter/images/user.png" width="16px" /><span className={styles.buttonText}>Recruiters</span> </div>
                </button>
              </div>
            </div>
          </div>
          {/* conversaton components */}
          {!activeTab ?
            <ConversationUsers />
            :
            <ConversationRecruiters />
          }
        </div>

      }
      <ul className={styles.tradeNavList}>
        {Array.from(trades).sort((a, b) => {
          if (router.asPath.startsWith(`/${schoolId}/${a.slug}`)) {
            return -1
          }
          if (router.asPath.startsWith(`/${schoolId}/${b.slug}`)) {
            return 1
          }
          let nameA = a.name.toUpperCase()
          let nameB = b.name.toUpperCase()
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
        }).map((t, index) => <NavListItem key={index} schoolId={schoolId} trade={t} />)}
      </ul>
    </div >
  )
}

const NavListItem = ({ trade, schoolId }) => {
  const router = useRouter()
  let isActive = router.asPath.startsWith(`/${schoolId}/${trade.slug}`)
  return (
    <li className={isActive ? styles.active : null}>
      <Link as={`/${schoolId}/${trade.slug}/pre-enrollment`} href="/[school]/[trade]/[board]" >
        <a className={styles.navItemLink}>
          <NavItem trade={trade} />
        </a>
      </Link>
      {!isActive && (<hr />)}
    </li>
  )
}

const NavItem = ({ trade }) => (
  <div>
    <h3>{trade.name}</h3>
    <div className={styles.navItemLinkCount}>Recruits: <span>{trade.count}</span></div>
  </div>
)

export default LeftNav
