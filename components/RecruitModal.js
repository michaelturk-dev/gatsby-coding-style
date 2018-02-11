import React, { useState } from 'react'
import getConfig from 'next/config'
import { Modal, Button, AvatarWithName } from '@tradeschool/components'
import { Formik, Form } from 'formik'
import TimeAgo from 'react-timeago'

import styles from 'styles/RecruitBoard/RecruitModal.module.scss'
import TextField from './TextField'
import PhoneNumberField from './PhoneNumberField'
import EmailField from './EmailField'
import SelectField from './SelectField'
import { useAuth } from 'providers/AuthProvider'
import callApi from 'lib/callApi'
import { useUser } from 'providers/UserProvider'

const RecruitModal = ({ recruit = {}, board, phases, onUpdate = () => { }, handleClose, ...props }) => {
  const { publicRuntimeConfig } = getConfig()
  const [logs, setLogs] = useState([])
  const [logAuthors, setLogAuthors] = useState([])
  const [lists, setLists] = useState([])
  const { getToken } = useAuth()
  const { user } = useUser()

  const getLogs = async () => {
    const hostUrl = publicRuntimeConfig.hostUrl
    const requestUrl = new URL(`${hostUrl}/api/recruits/${recruit._id}/logs`)
    const token = getToken()
    const logsRequest = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    const logsData = await logsRequest.json()
    console.log(logsData)
    if (!logsData.errors) {
      setLogAuthors(logsData.authors)
      setLogs(logsData.logs.data)
    }
  }

  const getListsForBoard = async phaseSlug => {
    const hostUrl = publicRuntimeConfig.hostUrl
    const requestUrl = new URL(`${hostUrl}/api/boards/${board.schoolId}/${board.trade.slug}/${phaseSlug}`)
    const token = getToken()
    const boardRequest = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    const boardData = await boardRequest.json()
    console.log(boardData)
    if (!boardData.errors) {
      const newLists = boardData.data.board.lists.map(l => { return { value: l._id, text: l.name } })
      setLists(newLists)
    }
  }

  React.useEffect(() => {
    setLists(board.lists.map(l => { return { value: l._id, text: l.name } }))
  }, [board.lists])

  React.useEffect(() => {
    if (recruit._id) {
      getLogs()
    }
  }, [recruit])

  const moveToPhase = async (phase, listId) => {
    console.log(phase)
    const hostUrl = publicRuntimeConfig.hostUrl
    const requestUrl = `${hostUrl}/api/boards/${board.schoolId}/${board.trade.slug}/${board.phase.slug}/${recruit.listId}/${recruit._id}`
    const token = getToken()
    const updateRequest = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ toPhase: phase, toList: listId }),
    })
    const updateData = await updateRequest.json()
    console.log(updateData)
  }

  return (
    <Modal
      show={props.show}
      handleClose={handleClose}
      className={styles.modal}
      content={
        <div className={styles.modalBody}>
          <div>
            <Formik
              initialValues={{
                firstName: recruit.firstName || '',
                lastName: recruit.lastName || '',
                phone: recruit.phone,
                email: recruit.email,
                score: recruit.score,
                phase: board.phase.slug,
                list: recruit.listId,
              }}
              onSubmit={async values => {
                console.log('submit:', values)
                if (recruit._id && (values.phase !== board.phase.slug || values.list !== recruit.listId)) {
                  console.log('phase changed')
                  await moveToPhase(values.phase, { _id: values.list })
                }
                const token = getToken()
                const apiPath = recruit._id ? `/recruits/${recruit._id}` : `/recruits`
                const recruitRequest = await callApi({
                  method: 'POST',
                  token,
                  body: {
                    recruit: values,
                    board: {
                      schoolId: board.schoolId,
                      trade: board.trade.slug,
                      phase: board.phase.slug,
                    },
                  },
                  apiPath,
                })
                const recruitData = await recruitRequest.json()
                console.log(recruitData)
                onUpdate()
                handleClose()
              }}
            >
              {({ isSubmitting }) =>
                <Form className={styles.editForm}>
                  <div className={styles.nameGroup}>
                    <AvatarWithName showName={false} image={recruit.avatar} width="60px" height="60px" />
                    <div className={styles.name}>
                      <div className={styles.nameFields}>
                        <div>
                          <TextField
                            name="firstName"
                            id="firstName"
                            placeholder="First Name"
                            maxLength={30}
                            disabled={isSubmitting}
                            required
                          />
                        </div>

                        <div>
                          <TextField
                            name="lastName"
                            id="lastName"
                            placeholder="Last Name"
                            maxLength={30}
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div className={styles.score}>
                        <SelectField
                          name="score"
                          id="score"
                          pickText="Pick a score..."
                          options={[{ value: 'Cold' }, { value: 'Warm' }, { value: 'Hot' }]}
                          label="Score:"
                          required
                        />
                      </div>
                    </div>

                  </div>
                  <div className={styles.cardLocation}>
                    <SelectField
                      id="phase"
                      name="phase"
                      label="Phase:"
                      onChange={e => getListsForBoard(e.target.value)}
                      options={phases.map(p => { return { value: p.phase.slug, text: p.phase.name } })}
                    />

                    <SelectField
                      id="list"
                      name="list"
                      label="List:"
                      options={lists}
                    />
                  </div>
                  <hr />
                  <div className={styles.propsGroup}>
                    <div className={styles.prop}>
                      <img className={styles.propIcon} alt="phone" src="/recruiter/icons/phone.svg" />
                      <div className={styles.labelGroup}>
                        <label htmlFor="phone">Phone</label>
                        <PhoneNumberField
                          name="phone"
                          id="phone"
                          placeholder="(555) 555-1234"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className={styles.prop}>
                      <img className={styles.propIcon} alt="phone" src="/recruiter/icons/email.svg" />
                      <div className={styles.labelGroup}>
                        <label htmlFor="email">Email</label>
                        <EmailField
                          name="email"
                          id="email"
                          placeholder="someone@example.com"
                          maxLength={50}
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <Button type="submit">Save</Button>
                </Form>
              }
            </Formik>
          </div>
          {recruit._id && <div className={styles.notesWrapper}>
            <Formik
              initialValues={{
                note: '',
              }}
              onSubmit={async (values, { resetForm }) => {
                console.log(values)
                const hostUrl = publicRuntimeConfig.hostUrl
                const requestUrl = `${hostUrl}/api/recruits/${recruit._id}/logs`
                const token = getToken()
                const noteRequest = await fetch(requestUrl, {
                  method: 'POST',
                  body: JSON.stringify({
                    schoolId: board.schoolId,
                    boardId: board._id,
                    listId: recruit.listId,
                    log: values.note,
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
                })
                const noteData = await noteRequest.json()
                console.log(noteData)
                const newAuthors = new Set([user, ...Array.from(logAuthors)])
                setLogAuthors(Array.from(newAuthors))
                const newNotes = Array.from(logs)
                newNotes.push(noteData.data)
                setLogs(newNotes)
                resetForm()
              }}
            >
              {({ isSubmitting, dirty }) =>
                <Form className={styles.notesFormGroup}>
                  <TextField
                    name="note"
                    id="note"
                    placeholder="+ Add notes"
                    maxLength={500}
                    disabled={isSubmitting}
                    className={styles.input}
                    required
                  />
                  <Button className={styles.button} disabled={!dirty} type="submit" variant="red">Add</Button>
                </Form>
              }
            </Formik>
            <div className={styles.notesList}>
              {logs.sort((a, b) => a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0).map(log => {
                const author = logAuthors?.find(a => a._id == log.author)
                return (
                  <div className={styles.note} key={log._id}>
                    <div className={styles.noteBody}>
                      {author &&
                        <div className={styles.noteAuthor}>
                          {`${author.givenName.charAt(0)}${author.familyName.charAt(0)}`.toUpperCase()}:
                        </div>
                      }
                      <div>
                        {log.log}
                      </div>
                    </div>
                    <div className={styles.timeAgo}>
                      <TimeAgo
                        minPeriod="60"
                        date={new Date(log.createdAt)}
                        formatter={(value, unit, suffix, epochSeconds, nextFormatter) => {
                          if (unit == 'second') {
                            return 'just now'
                          } else if (unit == 'minute' && value == 1) {
                            return 'a minute ago'
                          }
                          return nextFormatter(value, unit, suffix, epochSeconds, nextFormatter)
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>}
        </div >
      }
    />
  )
}

export default RecruitModal
