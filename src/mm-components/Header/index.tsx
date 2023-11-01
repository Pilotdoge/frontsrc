import { ChainId } from 'mm-hooks/chainId'
import React from 'react'
import { Text } from 'rebass'
import StyleNavLinkComp from 'mm-components/StyleNavLink'
import { useTranslation } from 'react-i18next'
import { AlignJustify } from 'react-feather'
import styled from 'styled-components'
import { Portal } from "../Portal";
import MenuDrawer, { useToggleMenuDrawer } from 'mm-components/MenuDrawer'
import Logo from '../../assets/pilot/images/logo.png'
import MLogo from  "./../../assets/pilot/m-images/logo.png"
import MLogo2 from   "./../../assets/pilot/m-images/logo@2x.png"
import MLogo3 from   "./../../assets/pilot/m-images/logo@3x.png"
import { useActiveWeb3React } from '../../mm-hooks'
import { useETHBalances } from '../../state/wallet/hooks'

import { YellowCard } from './../../mm-components/Card'
// import { Moon, Sun } from 'react-feather'

import Row, { RowFixed } from './../../mm-components/Row'
import Web3Status from './../Web3Status'
import MobileImg from 'mm-components/MobileImg'




const HeaderFrame = styled.div`
  display: block;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  padding: 12px;
  z-index: 2;
  transition: all 1s ease-in-out;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 0.5rem 1rem;
  `}
`



const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: center;
  `};
`

// const HeaderElementWrap = styled.div`
//   display: flex;
//   align-items: center;
// `

const HeaderRow = styled(RowFixed)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  
`

const HeaderLinks = styled(Row)`
  justify-content: center;
  
  
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display:none;
    padding: 1rem 0 1rem 1rem;
    justify-content: flex-end;
`};
`

const HeaderDropMenu = styled.div`
  display:none;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display:block;
    `
  }
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  // background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  background: transparent;
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const NetworkCard = styled(YellowCard)`
  border-radius: 12px;
  padding: 8px 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
  .pc-logo{
    display: block;
    height: 62px;
    width:200px;
  }
  .mobile-logo{
    display: none;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    .pc-logo{
      display: none;
    }
    .mobile-logo{
      display: block;
    }
  `};
`


export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover{
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`
enum NsChain { SCROLLALPHA = 534353 }
type NChainId = ChainId | NsChain
const NETWORK_LABELS: { [chainId in NChainId]?: string } = {
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  // [ChainId.BSCTEST]: 'BSCTest',
  // [ChainId.BSCMAIN]: 'BSCMain',
  [ChainId.SCROLL_ALPHA]: 'Scroll Alpha',
  [ChainId.SCROLL_SEPOLIA]: 'Scroll Sepolia',
  [ChainId.SCROLL]:''
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const toggleMenuDrawer = useToggleMenuDrawer()
 
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  

  return (
    <HeaderFrame style={{background:'transparent'}}>
      <HeaderRow>
        <Title href=".">
          <UniIcon>
              <MobileImg
                className="mobile-logo"
                img1={MLogo}
                img2={MLogo2}
                img3={MLogo3}
              />
              <div className='pc-logo' >
                <img width={'103px'} src={Logo} alt="logo" style={{position: 'absolute'}} />
              </div>
          </UniIcon>
        </Title>
        <HeaderLinks>
          <StyleNavLinkComp  idName={`home`} href={'/#home'} pathKey={'#home'}>
            {t('IDO&Airdrop')}
          </StyleNavLinkComp>
          <StyleNavLinkComp   idName={`about`} href={'/#about'} pathKey={'#about'}>
            {t('About')}
          </StyleNavLinkComp>
          <StyleNavLinkComp   idName={`tokenomics`} href={'/#tokenomics'}  pathKey={'#tokenomics'}>
            {t('Tokenomics')}
          </StyleNavLinkComp>
          <StyleNavLinkComp   idName={`roadmap`} href={'/#roadmap'} pathKey={'#roadmap'}>
            {t('Roadmap')}
          </StyleNavLinkComp>
          <StyleNavLinkComp  target="_blank"  href={'https://github.com/Pilotdoge/frontsrc'} pathKey={'#github'}>
            {t('Github')}
          </StyleNavLinkComp>
         

        </HeaderLinks>
        <HeaderElement>

          <HideSmall>
            {chainId && NETWORK_LABELS[chainId] && (
              <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
            )}
          </HideSmall>

          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            {account && userEthBalance ? (
              <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                {userEthBalance?.toSignificant(4)} ETH
              </BalanceText>
            ) : null}
            <Web3Status />
          </AccountElement>
          <HeaderDropMenu>
            <AlignJustify size={16} onClick={toggleMenuDrawer}/>
            <Portal>
              <MenuDrawer />
            </Portal>
          </HeaderDropMenu>


        </HeaderElement>
      </HeaderRow>

    </HeaderFrame>
  )
}
