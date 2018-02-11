import React, { useState } from 'react'
import PropTypes from 'prop-types'
import getConfig from 'next/config'
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd'

import RecruitList from './RecruitList'

import styles from 'styles/RecruitBoard/RecruitBoard.module.scss'
import { useAuth } from 'providers/AuthProvider'

const RecruitBoard = ({ board, recruits, phases, setCurrentRecruit = () => { } }) => {
  resetServerContext()
  const { publicRuntimeConfig } = getConfig()
  const [boardState, setBoardState] = useState(board)
  const [recruitsState, setRecruitsState] = useState(recruits)
  const { getToken } = useAuth()

  React.useEffect(() => {
    setBoardState(board)
    setRecruitsState(recruits)
  }, [board, recruits])

  const onDragEnd = async result => {
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return
    }

    const fromList = boardState.lists.find(l => l._id == source.droppableId)
    const toList = boardState.lists.find(l => l._id == destination.droppableId)
    const originalLists = Array.from(boardState.lists)
    console.log({ fromList, toList, originalLists })

    if (fromList._id === toList._id) {
      const recruitIds = Array.from(fromList.members)
      recruitIds.splice(source.index, 1)
      recruitIds.splice(destination.index, 0, draggableId)
      const newList = {
        ...fromList,
        members: recruitIds,
      }

      const newLists = originalLists.map(l => l._id == newList._id ? newList : l)
      const newBoardState = {
        ...boardState,
        lists: newLists,
      }
      setBoardState(newBoardState)
      const hostUrl = publicRuntimeConfig.hostUrl
      const requestUrl = `${hostUrl}/api/boards/${boardState.schoolId}/${boardState.trade.slug}/${boardState.phase.slug}/${fromList._id}/${draggableId}`
      const updateRequest = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ toList: newList }),
      })
      const updateData = await updateRequest.json()
      console.log(updateData)
    } else {
      const fromRecruitIds = Array.from(fromList.members)
      console.log({ fromRecruitIds })
      fromRecruitIds.splice(source.index, 1)
      console.log({ fromRecruitIds })
      const newFromList = {
        ...fromList,
        members: fromRecruitIds,
      }
      console.log({ newFromList })

      const toRecruitIds = Array.from(toList.members)
      console.log({ toRecruitIds })
      toRecruitIds.splice(destination.index, 0, draggableId)
      console.log({ toRecruitIds })
      const newToList = {
        ...toList,
        members: toRecruitIds,
      }

      const newLists = originalLists.map(l => {
        return l._id == newFromList._id ? newFromList : l._id == newToList._id ? newToList : l
      })

      const newBoardState = {
        ...boardState,
        lists: newLists,
      }
      setBoardState(newBoardState)
      const hostUrl = publicRuntimeConfig.hostUrl
      const requestUrl = `${hostUrl}/api/boards/${boardState.schoolId}/${boardState.trade.slug}/${boardState.phase.slug}/${fromList._id}/${draggableId}`
      const updateRequest = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ toList: newToList }),
      })
      const updateData = await updateRequest.json()
      console.log(updateData)
    }
  }

  return (<>
    <div className={styles.boardGrid}>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        {boardState.lists?.map(list => {
          const recruits = list.members.map(recruitId => recruitsState.find(r => r._id == recruitId))
          return <RecruitList
            key={list._id}
            list={list}
            recruits={recruits}
            cardOnClick={recruit => {
              console.log(recruit)
              setCurrentRecruit({ ...recruit, listId: list._id })
            }}
          />
        })}
      </DragDropContext>
    </div>
  </>)
}

RecruitBoard.propTypes = {
  // board: PropTypes.shape({
  //   lists: PropTypes.objectOf(PropTypes.shape({
  //     _id: PropTypes.string.isRequired,
  //     name: PropTypes.string.isRequired,
  //     members: PropTypes.arrayOf(PropTypes.string).isRequired,
  //   })).isRequired,
  // }),
}

export default RecruitBoard
