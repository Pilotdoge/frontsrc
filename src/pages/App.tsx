import React, { Suspense } from 'react'
import styled from 'styled-components'
import Header from '../mm-components/Header'
import Polling from '../mm-components/Header/Polling'
import Web3ReactManager from '../mm-components/Web3ReactManager'
import Footer from 'mm-components/Footer'
import { isMobile } from 'react-device-detect'
import IdoComp from './ido'
import AboutComp from './about'
import TokenomicsComp from './tokenomics'
import RoadmapComp from './roadmap'
import DarkModeQueryParamReader from 'theme/DarkModeQueryParamReader'
const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  
  
`

const HeaderWrapper = styled.div`
  width: 100%;
  .header-content{
    width: 1440px;
    margin: 0 auto;
    position: relative;
  }
 
  @media (max-width: 1400px){
    .header-content{
      width: 100%;
    }
  }

`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;
  
  .common-container{
    width: 1440px;
    margin: 0 auto;
    position: relative;
  }
  @media (max-width: 1400px){
    .common-container{
      width: 100%;
    }
  }

  .pc{
    display: block;
  }
  .mobile{
    display: none;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0;
    .pc{
      display: none;
    }
    .mobile{
      display: block;
    }
  `};
  

  z-index: 1;
`

// const Marginer = styled.div`
//   margin-top: 5rem;
// `



export default function App() {
  return (
    <Suspense fallback={null}>
     
      <AppWrapper>
        {/* <URLWarning /> */}
        <DarkModeQueryParamReader/>
        <HeaderWrapper>
          <div className='header-content' >
            <Header />
          </div>
        </HeaderWrapper>
        <BodyWrapper className={`${isMobile?'mobile-browser':'pc-browser'}`}>
          <Polling />
          <Web3ReactManager>
            <IdoComp idName="home"/>
            <AboutComp idName="about"/>
            <TokenomicsComp idName="tokenomics"/>
            <RoadmapComp idName='roadmap'/>
            {/* <Switch>
              <Route exact strict path="/home" component={React.lazy(() => import('./home'))} />
              <Route exact strict path="/leaderboard" component={React.lazy(() => import('./leaderboard'))} />
              <Route exact strict path="/liquidity" component={React.lazy(() => import('./liquidity'))} />
              <Route exact strict path="/lottery" component={React.lazy(() => import('./lottery'))} />
              <Route exact strict path="/referral-rewards" component={React.lazy(() => import('./referral-rewards'))} />
              <Route exact strict path="/staking" component={React.lazy(() => import('./staking'))} />
              <Route exact strict path="/story" component={React.lazy(() => import('./story'))} />
              <Route component={RedirectPathToSwapOnly} />
            </Switch> */}
          </Web3ReactManager>
          {/* <Marginer /> */}
          <HeaderWrapper>
            <div className='header-content'>
              <Footer />
            </div>
          </HeaderWrapper>
        </BodyWrapper>

      </AppWrapper>
    </Suspense>
  )
}
