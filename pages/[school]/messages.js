import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import Layout from 'components/common/Layout'
import LeftNav from 'components/LeftNav'
import { useUser } from 'providers/UserProvider'
import { useAuth } from 'providers/AuthProvider'
import Warden from 'components/Warden'
import ConversationTopBar from 'components/ConversationTopBar'
import ConversationBottomBar from 'components/ConversationBottomBar'

import callApi from 'lib/callApi'
import leftNavStyles from 'styles/LeftNavLayout.module.scss'
import conversation from 'styles/Conversations/index.module.scss'
import ConversationList from 'components/ConversationList'

const messages = [
  {
    content: 'This is a message1',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '1',
      name: 'Marta Yurkiv',
      image: 'https://randomuser.me/api/portraits/thumb/women/75.jpg',
    },
  },
  {
    content: 'This is a message2',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '1',
      name: 'Marta Yurkiv',
      image: 'https://randomuser.me/api/portraits/thumb/women/75.jpg',
    },
  },
  {
    content: 'This is a message3',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '1',
      name: 'Marta Yurkiv',
      image: 'https://randomuser.me/api/portraits/thumb/women/75.jpg',
    },
  },
  {
    content: 'This is a message4',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '2',
      name: 'Michael Turk',
      image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
  },
  {
    content: 'This is a message5',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '1',
      name: 'Marta Yurkiv',
      image: 'https://randomuser.me/api/portraits/thumb/women/75.jpg',
    },
  },
  {
    content: 'This is a message6',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '2',
      name: 'Michael Turk',
      image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
  },
  {
    content: 'This is a message7',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '2',
      name: 'Michael Turk',
      image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
  },
  {
    content: 'This is a message8',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '1',
      name: 'Marta Yurkiv',
      image: 'https://randomuser.me/api/portraits/thumb/women/75.jpg',
    },
  },
  {
    content: 'This is a message9',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '2',
      name: 'Michael Turk',
      image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
  },
  {
    content: 'This is a message10',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '2',
      name: 'Michael Turk',
      image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
  },
  {
    content: 'This is a message4',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '2',
      name: 'Michael Turk',
      image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
  },
  {
    content: 'This is a message5',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '1',
      name: 'Marta Yurkiv',
      image: 'https://randomuser.me/api/portraits/thumb/women/75.jpg',
    },
  },
  {
    content: 'This is a message6',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '2',
      name: 'Michael Turk',
      image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
  },
  {
    content: 'This is a message7',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '2',
      name: 'Michael Turk',
      image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
  },
  {
    content: 'This is a message8',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '1',
      name: 'Marta Yurkiv',
      image: 'https://randomuser.me/api/portraits/thumb/women/75.jpg',
    },
  },
  {
    content: 'This is a message9',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '2',
      name: 'Michael Turk',
      image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
  },
  {
    content: 'This is a message10',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '2',
      name: 'Michael Turk',
      image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
  },
]

const newMessages = [
  {
    content: 'This is a message9',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '2',
      name: 'Michael Turk',
      image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
  },
  {
    content: 'This is a message10',
    createdAt: '2020-12-19T13:55:46.666Z',
    user: {
      id: '2',
      name: 'Michael Turk',
      image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
  },
]

const BoardPage = () => {
  const router = useRouter()

  const [board, setBoard] = useState()
  const [trades, setTrades] = useState([])
  const [phases, setPhases] = useState([])
  const [recruits, setRecruits] = useState()
  const [loading, setLoading] = useState(false)

  const { getToken } = useAuth()
  const { loadingUser, user } = useUser()

  // React.useEffect(() => {
  //   if (user) {
  //     setLoading(false)
  //   }
  // }, [router.query, user])

  return (
    <div>
      <Head>
        <title>Messages - Tradeschool Recruiter</title>
      </Head>
      <Warden redirectTo={router.asPath}>
        <Layout showNav={true} showFooter={true}>
          <div className={leftNavStyles.leftNavLayoutGrid}>
            <div className={leftNavStyles.leftSideNav}>
              <LeftNav
                schoolId={router.query.school}
                trades={trades}
                header={{ text: 'MESSAGES' }}
              />
            </div>
            <div>
              {!loading && !loadingUser && (
                <div className={conversation.container}>
                  <ConversationTopBar
                    title="Marta Yurkiv"
                    description="Description here"
                    onSearch={() => {}}
                  />
                  <div className={conversation.messages}>
                    <ConversationList messages={messages} />
                    <div className={conversation.messagesSeperator}>
                      <p>New Messages</p>
                    </div>
                    <ConversationList messages={newMessages} />
                  </div>
                  <ConversationBottomBar onSend={() => {}} />
                </div>
              )}
            </div>
          </div>
        </Layout>
      </Warden>
    </div>
  )
}

BoardPage.get

export default BoardPage
