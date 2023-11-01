import React from 'react'

import styled from 'styled-components'
import MTokenomicsImg1 from './../../assets/pilot/m-images/tokenomics-img1.png'
import MTokenomicsImg2 from './../../assets/pilot/m-images/tokenomics-img1@2x.png'
import MTokenomicsImg3 from './../../assets/pilot/m-images/tokenomics-img1@3x.png'


import TokenomicsImg from './../../assets/pilot/images/tokenomics-img1.png'
import TitleDecorationImg from './../../assets/pilot/images/tokenomics-title-decoration.png'
import BannerBg from '../../assets/pilot/images/bg3.png'
import MBannerBg1 from './../../assets/pilot/m-images/bg3.png'
import MBannerBg2 from './../../assets/pilot/m-images/bg3@2x.png'
import MBannerBg3 from './../../assets/pilot/m-images/bg3@3x.png'
import ComBgFra from 'mm-components/ComBgFra'
import { useTranslation } from 'react-i18next'
import MobileImg from 'mm-components/MobileImg'
const BannerFrame = styled.div`
  width: 100%;
  margin-top: -63px;
  z-index: -1;
  &>.pc{
    background: url(${BannerBg}) no-repeat center center;
    background-position: center top;
    background-size: auto 1097px;
    width: 100%;
    min-height: 1097px
    padding-top: 180px;
  }
  &>.mobile{
    padding-top: 81px;
    height: auto !important;
    background-position: top center !important;
  }

  .common-title{
    width: 254px;
    font-size: 50px;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1;
    text-align: center;
    display: block;
    margin: 0 auto;
    &::after{
      content: '';
      width: 254px;
      height: 23px;
      background: url(${TitleDecorationImg}) no-repeat center center;
      background-size: 100% auto;
      display: block;
      margin: 0 auto;
    }
    ${({theme})=>theme.mediaWidth.upToSmall`
    font-size: 25px;
    &::after{
      width: 127px;
      height: 11.5px;
    }
  `}
  }
  .tokenomics-bot-tip{
    margin: 0 auto;
    margin-top: 102px;
    max-width: 600px;
    width: calc(100% - 30px);
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #E6E6E6;
    line-height: 18px;
    text-align: center;
    padding-bottom: 30px;
    ${({theme})=>theme.mediaWidth.upToExtraSmall`
      box-sizing: border-box;
      margin-top: 150px;
      padding-bottom: 72px;
    `}
  }
  .token-content-wrap{
    padding-top: 144px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    .left{
      width: 602px;
    }
    .right{
      width: 560px;
      padding-top: 4%;
      padding-left: 16px;
      box-sizing: border-box;
      .item{
        margin: 0;
        padding: 0;
        height: 19.4%;
        &:nth-child(1){
          height: 16.6%;
        }
        &:nth-child(2){
          height: 16.6%;
        }
        &:nth-child(3){
          height: 16.6%;
        }
        &:nth-child(4){
          height: 16.4%;
        }
        &:nth-child(5){
          height: 16.6%;
        }
        span{
          color: #ffffff;
          font-size: 16px;
          &.value{
            font-size: 24px;
            font-weight: bold;
          }
          &.after-value{
            display: block;
          }
        }
      }
    }
    ${({theme})=>theme.mediaWidth.upToLarge`
    .left{
      width: 50.1%;
    }
    .right{
      width: 46%;
      .item{
        text-align: left;
        
      }
    }
   
    `}
    ${({theme})=>theme.mediaWidth.upToSmall`
    .left{
      width: 100%;
      .mobile{
        margin: 0 auto;
      }
    }
    .right{
      width: 100%;
      padding-top: 39px;
      padding-left: 0;
      .item{
        text-align: center;
        min-height: 45px !important;
        span{
          font-size: 12px;
          &.value{
            font-size: 18px;
          }
        }
      }
    }
    
    `}
  }
 
`
export default function TokenomicsComp({ idName }: { idName: string }) {
  const { t } = useTranslation()
  return (<BannerFrame id={idName}>
    <ComBgFra
      img1={MBannerBg1}
      img2={MBannerBg2}
      img3={MBannerBg3}
      isBackground={true}
      isFullScreen={true}>
      <div className='common-title'>
        {t('Tokenomics')}
      </div>
      <div className='token-content-wrap'>
        <div className='left'>
          <img src={TokenomicsImg} style={{width:'100%'}} className='pc' alt="tokenomics"/>
          <MobileImg
            className="mobile"
            img1={MTokenomicsImg1}
            img2={MTokenomicsImg2}
            img3={MTokenomicsImg3}/>
        </div>
        <div className='right'>
          <p className='item'>
            <span className='key'>{t('Mint')}：</span>
            <span className='value'>20%</span>
            <span className='append'>{t('Locked for 180 days')}</span>
          </p>
          <p className='item'>
            <span className='key'>{t('Liquidity Support')}：</span>
            <span className='value'>20%</span>
            <span className='append'>{t('Locked for 180 days')}</span>
          </p>
          <p className='item'>
            <span className='key'>{t('CEX Liquidity Support and Events')}：</span>
            <span className='value'>10%</span>
          </p>
          <p className='item'>
            <span className='key'>{t('ZadaFinance Ecosystem Support')}：</span>
            <span className='value'>10%</span>
          </p>
          <p className='item'>
            <span className='key'>{t('OrbiterFinance User Airdrop')}：</span>
            <span className='value'>20%</span>
          </p>
          <p className='item'>
            <span className='key'>{t('Staking Mining')}：</span>
            <span className='value'>20%</span>
            <span className='after-value'>{t('tokenomicsStip')}</span>
          </p>
          
        </div>
      </div>
      <div className='tokenomics-bot-tip' dangerouslySetInnerHTML={{
        __html:t('tokenomicsBotTip')
      }}></div>
    </ComBgFra>
  </BannerFrame>)
}