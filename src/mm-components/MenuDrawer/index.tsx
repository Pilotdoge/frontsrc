import React from 'react'
import useDisableScrolling from './../../mm-hooks/useDisableScrolling'
import { useWindowSize } from './../../mm-hooks/useWindowSize'
import { atom, useAtom } from 'jotai'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import StyleNavLinkComp from 'mm-components/StyleNavLink'

const StyledNavFrame = styled.div`
  display:flex;
  height: 80%;
  flex-direction:column;
  justify-content: space-around;
  padding: 60px 0;
  box-sizing: border-box;
  .menudraw-item{
    font-size: 14px;
    display: block;
  }

`

export const BREAKPOINTS = {
  xs: 396,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
  xxxl: 1920,
}

export enum Z_INDEX {
  deprecated_zero = 0,
  default = 1,
  hover = 2,
  active = 3,
  under_dropdown = 990,
  dropdown = 1000,
  sticky = 1020,
  fixed = 1030,
  modalBackdrop = 1040,
  offcanvas = 1050,
  modal = 1060,
  popover = 1070,
  tooltip = 1080,
  modalOverTooltip = 1090,
}

// import DefaultMenu from './DefaultMenu'

// const DRAWER_WIDTH_XL = '390px'
const DRAWER_WIDTH = '320px'
const DRAWER_MARGIN = '8px'
// const DRAWER_OFFSET = '10px'
// const DRAWER_TOP_MARGIN_MOBILE_WEB = '72px'

const accountDrawerOpenAtom = atom(false)

export function useToggleMenuDrawer() {
  const [open, updateMenuDrawerOpen] = useAtom(accountDrawerOpenAtom)
  return () => {
    updateMenuDrawerOpen(!open)
  }
}

export function useCloseMenuDrawer() {
  // @ts-ignore 
  const [, updateMenuDrawerOpen] = useAtom(accountDrawerOpenAtom)
  return useCallback(() => updateMenuDrawerOpen(false), [updateMenuDrawerOpen])
}

export function useMenuDrawer(): [boolean, () => void] {
  const [accountDrawerOpen] = useAtom(accountDrawerOpenAtom)
  return [accountDrawerOpen, useToggleMenuDrawer()]
}

const ScrimBackground = styled.div<{ open: boolean }>`
  z-index: ${Z_INDEX.modalBackdrop};
  overflow: hidden;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(13,17,28);
  display:  ${({ open }) => (open ? 'block' : 'none')};

  opacity: 0;
  @media only screen and (max-width: 640px) {
    opacity: ${({ open }) => (open ? 0.5 : 0)};
    transition: opacity 250ms ease-in-out;
  }
`
export const Scrim = ({ onClick, open, testId }: { onClick: () => void; open: boolean; testId?: string }) => {
  const { width } = useWindowSize()

  useEffect(() => {
    if (width && width < BREAKPOINTS.sm && open) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [open, width])

  return <ScrimBackground data-testid={testId} onClick={onClick} open={open} />
}

const ScrollBarStyles = css<{ $isHorizontalScroll?: boolean }>`
  // Firefox scrollbar styling
  scrollbar-width: thin;
  scrollbar-color: ${`#293249 transparent`};
  height: 100%;

  // safari and chrome scrollbar styling
  ::-webkit-scrollbar {
    background: transparent;

    // Set height for horizontal scrolls
    ${({ $isHorizontalScroll }) => {
    return $isHorizontalScroll
      ? css`
            height: 4px;
            overflow-x: scroll;
          `
      : css`
            width: 4px;
            overflow-y: scroll;
          `
  }}
  }

  ::-webkit-scrollbar-thumb {
    background: #293249;
    border-radius: 8px;
  }
`

const MenuDrawerScrollWrapper = styled.div`
  overflow: hidden;
  &:hover {
    overflow-y: auto;
  }

   ${ScrollBarStyles}

  scrollbar-gutter: stable;
  overscroll-behavior: contain;
  border-radius: 0px;
`

const Container = styled.div`
  display: none;
  flex-direction: row;
  height: calc(100% - 2 * ${DRAWER_MARGIN});
  overflow: hidden;
  position: fixed;
  left:0;
  top: 0;
  z-index: ${Z_INDEX.fixed};
  
  ${({ theme }) => theme.mediaWidth.upToLarge`
      display:block;
  `}
  
`

const MenuDrawerWrapper = styled.div<{ open: boolean }>`
  margin-left: 0;
  height: 100%;
  overflow: hidden;
  position: ${({ open }) => (open ? 'fixed' : 'absolute')};
  top: 0;
  left: ${({ open }) => (open ? 0 : '-' + DRAWER_WIDTH)};
  height: 100%;
  z-index: ${Z_INDEX.modal};

  // border-radius: 12px;
  width: ${DRAWER_WIDTH};
  font-size: 16px;
  background-color: rgba(0,0,0,.7);//#0D111C;
  border: none;//1px solid #98A1C0;

  // box-shadow: 12px 16px 24px rgba(0, 0, 0, 0.24), 12px 8px 12px rgba(0, 0, 0, 0.24), 4px 4px 8px rgba(0, 0, 0, 0.32);
  transition: left 250ms;
`



function MenuDrawer() {
  const [walletDrawerOpen, toggleWalletDrawer] = useMenuDrawer()
  const scrollRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  useEffect(() => {
    if (!walletDrawerOpen) {
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [walletDrawerOpen])

  // close on escape keypress
  useEffect(() => {
    const escapeKeyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && walletDrawerOpen) {
        event.preventDefault()
        toggleWalletDrawer()
      }
    }

    document.addEventListener('keydown', escapeKeyDownHandler)

    return () => {
      document.removeEventListener('keydown', escapeKeyDownHandler)
    }
  }, [walletDrawerOpen, toggleWalletDrawer])

  // useStates for detecting swipe gestures
  // @ts-ignore 
  const [yPosition] = useState(0)
  // const [dragStartTop, setDragStartTop] = useState(true)
  useDisableScrolling(walletDrawerOpen)



  return (
    <Container>
      <Scrim onClick={toggleWalletDrawer} open={walletDrawerOpen} />
      <MenuDrawerWrapper
        open={walletDrawerOpen}
        {...(isMobile
          ? {
            style: { transform: `translateX(${yPosition}px)` },
          }
          : {})}
      >
        {/* id used for child InfiniteScrolls to reference when it has reached the bottom of the component */}
        <MenuDrawerScrollWrapper ref={scrollRef}
          id="wallet-dropdown-scroll-wrapper"
        >
          {/* <DefaultMenu drawerOpen={walletDrawerOpen} /> */}
          <StyledNavFrame onClick={toggleWalletDrawer}>
            <StyleNavLinkComp isMenudraw={true} className='menudraw-item' idName={`home`} href={'/#home'} pathKey={'#home'}>
              {t('IDO&Airdrop')}
            </StyleNavLinkComp>
            <StyleNavLinkComp isMenudraw={true} className='menudraw-item' idName={`about`} href={'/#about'} pathKey={'#about'}>
              {t('About')}
            </StyleNavLinkComp>
            <StyleNavLinkComp isMenudraw={true} className='menudraw-item' idName={`tokenomics`} href={'/#tokenomics'} pathKey={'#tokenomics'}>
              {t('Tokenomics')}
            </StyleNavLinkComp>
            <StyleNavLinkComp isMenudraw={true} className='menudraw-item' idName={`roadmap`} href={'/#roadmap'} pathKey={'#roadmap'}>
              {t('Roadmap')}
            </StyleNavLinkComp>
            <StyleNavLinkComp isMenudraw={true} className='menudraw-item'  target="_blank"  href={'https://github.com/orgs/Pilotdoge/repositories'} pathKey={'#github'}>
              {t('Github')}
            </StyleNavLinkComp>
          </StyledNavFrame>


        </MenuDrawerScrollWrapper>
      </MenuDrawerWrapper>
    </Container>
  )
}

export default MenuDrawer
