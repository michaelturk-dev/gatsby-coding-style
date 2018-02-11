import React, { useState } from 'react'
import Head from 'next/head'
import getConfig from 'next/config'
import Layout from 'components/common/Layout'

import RecruitBoardPage from 'components/RecruitBoardPage'
import LeftNav from 'components/LeftNav'
import { useRouter } from 'next/router'

import leftNavStyles from 'styles/LeftNavLayout.module.scss'
import Warden from 'components/Warden'
import { useUser } from 'providers/UserProvider'
import { useAuth } from 'providers/AuthProvider'
import callApi from 'lib/callApi'

const BoardPage = () => {
  const router = useRouter()

  const [board, setBoard] = useState()
  const [trades, setTrades] = useState([])
  const [phases, setPhases] = useState([])
  const [recruits, setRecruits] = useState()
  const [loading, setLoading] = useState(true)

  const { getToken } = useAuth()
  const { loadingUser, user } = useUser()
  const fetchBoard = async () => {
    const apiPath = `/boards/${router.query.school}/${router.query.trade}/${router.query.board}/`
    const token = getToken()
    const boardRequest = await callApi({
      apiPath,
      token,
    })
    const boardData = await boardRequest.json()
    console.log('boardData', boardData)
    setRecruits(boardData.data.recruits)
    setBoard(boardData.data.board)
  }

  const fetchTrades = async () => {
    try {
      const token = getToken()
      const tradesRequest = await callApi({
        apiPath: `/trades/${router.query.school}`,
        token,
      })
      const trades = await tradesRequest.json()
      const phaseRequest = await callApi({
        apiPath: `/phases/${router.query.school}/${router.query.trade}`,
        token,
      })
      const phases = await phaseRequest.json()
      console.log(trades, phases)
      setTrades(trades.data)
      setPhases(phases.data)
    } catch (e) {
      console.error(e)
    }
  }

  React.useEffect(() => {
    if (user) {
      setLoading(true)
      fetchBoard()
      fetchTrades()
    }
  }, [router.query, user])

  React.useEffect(() => {
    console.log('changed', board, recruits)
    if (board && recruits && trades && phases) {
      console.log('loaded', board, recruits)
      setLoading(false)
    }
  }, [board, recruits, trades, phases])

  console.log('render', { board, recruits })
  return (
    <div>
      <Head>
        <title>Tradeschool Recruiter</title>
      </Head>
      <Warden redirectTo={router.asPath}>
        <Layout showNav={true} showFooter={true}>
          <div className={leftNavStyles.leftNavLayoutGrid}>
            <div className={leftNavStyles.leftSideNav}>
              <LeftNav schoolId={router.query.school} trades={trades} header={{ text: 'TRADES', subText: trades.length }} />
            </div>
            <div>
              {!loading && !loadingUser &&
                <RecruitBoardPage board={board} recruits={recruits} phases={phases} reload={fetchBoard} />
              }
            </div>
          </div>
        </Layout>
      </Warden>
    </div>
  )
}

BoardPage.get

export default BoardPage
