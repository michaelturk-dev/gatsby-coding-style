import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  NavBar,
  DropDown,
  DropDownHeader,
  DropDownList,
  DropDownItem,
  Button,
  AvatarWithName,
  Theme,
} from '@tradeschool/components'

import { ChevronVertical } from '@tradeschool/icons'

import { useAuth } from 'providers/AuthProvider'
import { useUser } from 'providers/UserProvider'

import navStyles from 'styles/ui/Nav.module.scss'

const Nav = ({ sticky = true }) => {
  const { loadingIdentity, logout, loginWithModal, signUpWithModal } = useAuth()
  const router = useRouter()
  const { user, loadingUser } = useUser()

  return (
    <NavBar
      zIndex={99}
      sticky={sticky}
      navLeft={
        <a href="/">
          <img
            src="https://fonts.tradeschool.com/assets/traderecruiter-logo.png"
            alt="Trade Recruiter logo"
            className={navStyles.headerLogo}
          />
        </a>
      }
      navRight={
        !loadingIdentity && (
          <>
            {!loadingUser && !loadingIdentity && !user && (
              <div className="hide-b-sm">
                <div className={navStyles.navButtons}>
                  <Button
                    variant="transparent"
                    size="none"
                    marginRight="1rem"
                    fontSize="0.9rem"
                    onClick={() => {
                      modalView('login')
                      loginWithModal({
                        appState: { targetUrl: router.asPath },
                      })
                    }}
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => {
                      modalView('signup')
                      signUpWithModal({
                        appState: { targetUrl: router.asPath },
                      })
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            )}

            {user && (
              <DropDown>
                {({ isOpen, toggleOpen }) => (
                  <>
                    <DropDownHeader onClick={toggleOpen} color="#333">
                      <>
                        <AvatarWithName
                          name={user.givenName}
                          image={user.image}
                        />
                        <ChevronVertical
                          size="0.75rem"
                          style={{
                            transform: isOpen ? '' : 'rotate(180deg)',
                            marginLeft: '0.4rem',
                          }}
                        />
                      </>
                    </DropDownHeader>
                    {isOpen && (
                      <DropDownList
                        top="70px"
                        width="150px"
                        className={navStyles.dropDown}
                      >
                        {/* <DropDownItem>
                          <Link href="/profile/index" as="/profile">
                            <a className={navStyles.link}>Profile</a>
                          </Link>
                        </DropDownItem>
                        <DropDownItem>
                          <Link
                            href="/profile/savedtrades"
                            as="/profile/savedtrades"
                          >
                            <a className={navStyles.link}>
                              Saved Trades (
                              {savedTrades ? savedTrades.length : 0})
                            </a>
                          </Link>
                        </DropDownItem>
                        <DropDownItem>
                          <Link href="/profile/edit" as="/profile/edit">
                            <a className={navStyles.link}>Settings</a>
                          </Link>
                        </DropDownItem> */}
                        <DropDownItem>
                          <Button
                            variant="transparent"
                            fontSize="0.9rem"
                            size="none"
                            onClick={() => logout()}
                            color={Theme.colors.tradeschoolRed}
                          >
                            Log out
                          </Button>
                        </DropDownItem>
                      </DropDownList>
                    )}
                  </>
                )}
              </DropDown>
            )}
          </>
        )
      }
    />
  )
}

Nav.propTypes = {
  sticky: PropTypes.bool,
}

export default Nav
