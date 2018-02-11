import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from '@tradeschool/components'

import useScreenSize from 'hooks/useScreenSize'
import { useAuth } from 'providers/AuthProvider'

import LoginModalBody from './LoginModalBody'

const LoginModal = props => {
  const { handleClose, title, state, ...restProps } = props
  const { isMobile } = useScreenSize()
  const { loginModalOpen } = useAuth()

  return (
    <Modal
      show={loginModalOpen}
      variant={isMobile ? 'fullScreen' : 'medium'}
      modalWidth={!isMobile && '500px'}
      handleClose={handleClose}
      closeButtonSide={isMobile ? 'left' : 'right'}
      content={<LoginModalBody title={title} state={state} />}
      {...restProps}
    />
  )
}

LoginModal.propTypes = {
  state: PropTypes.object,
  title: PropTypes.string,
  handleClose: PropTypes.func,
}

export default LoginModal
