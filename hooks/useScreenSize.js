import React from 'react'
import { useMedia } from 'react-use'
import canUseDOM from 'can-use-dom'

const breakpoints = {
  xs: '0px',
  mobile: '450px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
}

// If you are on a page that is using SSR, you should use `useDevice` instead
// as SSR will cause inconsistent/delayed rendering when using this hook
const useScreenSize = () => {
  if (!canUseDOM) return { isDesktop: null, isMobile: null }

  const isCurrentlyMobile = useMedia(`(max-width: ${breakpoints.md})`)
  const isCurrentlyDesktop = useMedia(`(min-width: ${breakpoints.md})`)

  const [isMobile, setIsMobile] = React.useState(isCurrentlyMobile)
  const [isDesktop, setIsDesktop] = React.useState(isCurrentlyDesktop)

  React.useEffect(() => {
    if (isMobile !== isCurrentlyMobile) {
      setIsMobile(isCurrentlyMobile)
    }

    if (isDesktop !== isCurrentlyDesktop) {
      setIsDesktop(isCurrentlyDesktop)
    }
  }, [isMobile, isCurrentlyMobile, isDesktop, isCurrentlyDesktop, canUseDOM])
  return {
    isMobile,
    isDesktop,
  }
}

export default useScreenSize
