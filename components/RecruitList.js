import React from 'react'
import PropTypes from 'prop-types'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import RecruitCard from 'components/RecruitCard'

import styles from 'styles/RecruitBoard/RecruitBoard.module.scss'

const RecruitList = ({ list, recruits, cardOnClick = (recruit) => { console.log('clicked', recruit) } }) => {
  console.log(list, recruits)
  return (
    <div className={styles.boardGridList}>
      <h3>{list.name}  <small>{list.members.length}</small></h3>
      <Droppable droppableId={list._id}>
        {(provided) => (
          <MemberList
            innerRef={provided.innerRef}
            {...provided.droppableProps}
          >
            {recruits.map((recruit, index) => {
              if (!recruit) return null

              return (
                <Draggable key={recruit._id} draggableId={recruit._id} index={index}>
                  {provided => (
                    <div
                      onClick={() => cardOnClick(recruit)}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        backgroundColor: '#fff',
                        ...provided.draggableProps.style,
                      }}
                      className={styles.recruitCard}
                      ref={provided.innerRef}
                    >
                      <RecruitCard index={index} recruit={recruit} />
                    </div>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </MemberList>
        )}
      </Droppable>
    </div>
  )
}

const MemberList = ({ children, innerRef, ...rest }) => <div ref={innerRef} {...rest} className={styles.boardGridListBody}>{children}</div>

RecruitList.propTypes = {
  list: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
}

export default RecruitList
