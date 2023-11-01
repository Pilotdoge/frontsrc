import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import styled from 'styled-components'
import AboutImg1 from './../../assets/pilot/images/about-img1.png'
import TitleDecorationImg from './../../assets/pilot/images/about-title-decoration.png'
import BannerBg from '../../assets/pilot/images/bg2.png'
import MBannerBg1 from './../../assets/pilot/m-images/bg2.png'
import MBannerBg2 from './../../assets/pilot/m-images/bg2@2x.png'
import MBannerBg3 from './../../assets/pilot/m-images/bg2@3x.png'
import ComBgFra from 'mm-components/ComBgFra'
import { useTranslation } from 'react-i18next'
import Loader from 'mm-components/Loader'
const BannerFrame = styled.div`
  width: 100%;
  margin-top: -63px;
  &>.pc{
    background: url(${BannerBg}) no-repeat center center;
    background-position: center top;
    background-size: auto 1160px;
    width: 100%;
    min-height: 1160px
    padding-top: 159px;
  }
  &>.mobile{
    padding-top: 68px;
    padding-bottom: 77.5px;
    height: auto !important;
    background-position: top center !important;
  }
  .common-title{
    width: 254px;
    font-size: 50px;
    font-weight: 800;
    color: #000000;
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
  .desc{
    margin: 0 auto;
    margin-top: 111px;
    width: calc(100% - 40px);
    max-width: 1200px;
    // max-height: 240px;
    background: #DFE8FF;
    border: 3px solid #000000;
    border-radius: 120px;
    padding: 60px 110px;
    padding-bottom: 40px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 33px;
    position: relative;
    &::after{
      content:'';
      position: absolute;
      width: 262px;
      height: 320px;
      background: url(${AboutImg1}) no-repeat center center;
      background-size: 100% auto;
      right: 45px;
      top: -219px;
    }
    ${({theme})=>theme.mediaWidth.upToMedium`
      padding: 40px 70px;
    `}
    ${({theme})=>theme.mediaWidth.upToSmall`
      margin-top: 56.5px;
      font-size: 12px;
      line-height: 1.5;
      padding: 40px 19.5px;
      border-radius: 40px;
      &::after{
        width: 121px;
        height: 160px;
        right: 0;
        top: -103.5px;
      }
    `}
  }
  .sub-desc-wrap{
    display: flex;
    flex-direction: row;
    max-width: 1200px;
    width: calc(100% - 40px);
    justify-content: space-between;
    margin: 0 auto;
    padding-top: 80px;
    box-sizing: border-box;
    flex-wrap: nowrap;
    .sub-desc-item{
      max-width: 255px;
      width: 23%;
      background: #DFE8FF;
      border: 3px solid #000000;
      border-radius: 50px 50px 0px 0px;
      .num-val{
        display: block;
        text-align: center;
        font-size: 42px;
        font-weight: bold;
        height: 140px;
        line-height: 140px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #000000;
      }
      .num-label{
        width: 100%;
        height: 60px;
        text-align: center;
        background: #798CC9;
        border-top: 3px solid #000000;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 60px;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    ${({theme})=>theme.mediaWidth.upToSmall`
      padding: 0 20px;
      padding-top: 30px;
      justify-content: space-between;
      flex-wrap: wrap;
      .sub-desc-item{
        width:45.5%;
        height: 104px;
        margin-bottom: 30px;
        .num-val{
          width: 100%;
          height: 70px;
          font-size: 21px;
          line-height: 70px;
        }
        .num-label{
          width: 100%;
          height: 28px;
          font-size: 12px;
          line-height: 28px;
        }

      }
    `}
  }

  .common-bottom-tip{
    text-align: center;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    margin: 0 auto;
    margin-top: 155px;
    ${({theme})=>theme.mediaWidth.upToMedium`
      margin-top: 100px;
    `}
    ${({theme})=>theme.mediaWidth.upToSmall`
      margin-top: 10px;
    `}
  }
 
`
type AboutNumType = {
  queryCount: string,
  addrNum: string,
  airdrop: string,
  fundAmount: string
}
export default function AboutComp({idName}:{idName: string}){
  const { t } = useTranslation()
  const [aboutNum, updateAboutNum] = useImmer<AboutNumType>({
    queryCount:'',
    addrNum:'',
    airdrop:'',
    fundAmount:''
  })
  useEffect(()=>{
    getNetData('queryCount','/get_queried_addresses_number')
    getNetData('addrNum','/get_total_claimed_number')
    getNetData('airdrop','/get_total_claimed_amount')
    getNetData('fundAmount','')

  },[])
  
  const getNetData = async(key: string, api: string)=>{
    try{
      let response = await fetch(`${process.env.REACT_APP_NET_API}${api}`)
      let result = await response.json()
      if(result.code === 'Ok'){
        updateAboutNum(data=>{
          data[key as keyof AboutNumType ] = result.data
        })
      }else{
        updateAboutNum(data=>{
          data[key as keyof AboutNumType] = '0'
        })
      }
    }catch(err){
      console.log('getNetData has error', err)
      updateAboutNum(data=>{
        data[key as keyof AboutNumType] = '0'
      })
    }
  }
  return (<BannerFrame id={idName}>
     <ComBgFra
    img1={MBannerBg1} 
    img2={MBannerBg2}
    img3={MBannerBg3}
    isBackground={true}
    isFullScreen={true}>
      <div className='common-title'>
        {t('About')}
      </div>
      <div className='desc'>
        {t('aboutDesc')}
      </div>
      <div className='sub-desc-wrap'>
        <div className='sub-desc-item'>
          <span className='num-val'>{aboutNum.queryCount===''?<Loader size="40px" stroke="#000" />:aboutNum.queryCount}</span>
          <div className='num-label'>{t('Query Count')}</div>
        </div>
        <div className='sub-desc-item'>
          <span className='num-val'>{aboutNum.addrNum===''?<Loader size="40px" stroke="#000" />:aboutNum.addrNum}</span>
          <div className='num-label'>{t('Receiving Address')}</div>
        </div>
        <div className='sub-desc-item'>
          <span className='num-val'>{aboutNum.airdrop===''?<Loader size="40px" stroke="#000" />:aboutNum.airdrop}</span>
          <div className='num-label'>{t('Distribute Airdrop')}</div>
        </div>
        <div className='sub-desc-item'>
          <span className='num-val'>{aboutNum.fundAmount===''?<Loader size="40px" stroke="#000" />:aboutNum.fundAmount}</span>
          <div className='num-label'>{t('Amount of Funding')}</div>
        </div>
      </div>
      <div className='common-bottom-tip'>{t('commonBotTip')}</div>
    </ComBgFra>
  </BannerFrame>)
}