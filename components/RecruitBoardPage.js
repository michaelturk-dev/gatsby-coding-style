import React, { useEffect, useState } from 'react'

import RecruitBoard from 'components/RecruitBoard'
import { Button } from '@tradeschool/components'
import { useRouter } from 'next/router'

import RecruitModal from 'components/RecruitModal'

import styles from 'styles/RecruitBoard/RecruitBoardPage.module.scss'
import SelectField from './SelectField'
import { Form, Formik } from 'formik'

const RecruitBoardPage = ({ board, recruits, phases = [], reload = () => { } }) => {
  const router = useRouter()
  const [currentRecruit, setCurrentRecruit] = useState()
  const [showRecruitModal, setShowRecruitModal] = useState(false)

  const navigatePhase = (e) => {
    console.log(e.target.value)
    router.push(`/${board.schoolId}/${board.trade.slug}/${e.target.value}`)
  }

  return (<>
    <RecruitModal
      show={showRecruitModal}
      handleClose={() => setShowRecruitModal(false)}
      recruit={currentRecruit}
      board={board}
      phases={phases}
      onUpdate={() => reload()}
    />
    <div className={styles.recruitBoardPage}>
      <div className={styles.heading}>
        <h1>Recruits <Button className={styles.addRecruitButton} onClick={() => {
          setCurrentRecruit()
          setShowRecruitModal(true)
        }}>+</Button></h1>
        <Formik
          initialValues={{
            phase: board.phase.slug,
          }}
        >
          <Form>
            <SelectField
              label="Phase:"
              id="phase"
              name="phase"
              options={phases.map(p => { return { value: p.phase.slug, text: p.phase.name } })}
              onChange={navigatePhase}
            />
          </Form>
        </Formik>
      </div>
      <RecruitBoard board={board} recruits={recruits} phases={phases} setCurrentRecruit={r => {
        setCurrentRecruit(r)
        setShowRecruitModal(true)
      }} />
    </div>
  </>)
}

export default RecruitBoardPage
