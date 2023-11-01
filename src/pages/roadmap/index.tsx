import React from 'react'
import RoadmapImg1 from './../../assets/pilot/images/roadmap-img1.png'
import TitleDecorationImg from './../../assets/pilot/images/roadmap-title-decoration.png'
import styled from 'styled-components'
import BannerBg from '../../assets/pilot/images/bg4.png'
import MBannerBg1 from './../../assets/pilot/m-images/bg4.png'
import MBannerBg2 from './../../assets/pilot/m-images/bg4@2x.png'
import MBannerBg3 from './../../assets/pilot/m-images/bg4@3x.png'
import ComBgFra from 'mm-components/ComBgFra'
import { useTranslation } from 'react-i18next'
const BannerFrame = styled.div`
  width: 100%;
  &>.pc{
    background: url(${BannerBg}) no-repeat center center;
    background-position: center top;
    background-size: auto 1600px;
    width: 100%;
    min-height: 1600px;
    padding-top: 120px;
  }
  &>.mobile{
    padding-top: 38px;
    padding-bottom: 60px;
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
  .roadmap-line-content{
    position: relative;
    margin: 0 auto;
    margin-top: 492px;
    width: calc(100% - 40px);
    max-width: 1400px;
    max-height: 740px;
    background: #DFE8FF;
    border: 3px solid #000000;
    border-radius: 100px;
    display: flex;
    flex-direction: column;
    padding: 25px 0;
    box-sizing: border-box;
    .decoration-img{
      position: absolute;
      width: 412px;
      height: 447px;
      background: url(${RoadmapImg1}) no-repeat center center;
      background-size: 100% auto;
      top: -419px;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .decoration-line-pre{
      width: 2px;
      height: 54px;
      border: 1px solid #000000;
      margin: 0 auto;
    }
    ${({theme})=>theme.mediaWidth.upToSmall`
      border-radius: 50px;
      margin-top: 260px;
      padding-top: 10px;
      padding-bottom: 37px;
      .decoration-img{
        width: 206px;
        height: 223px;
        top: -209px;
      }
      .decoration-line-pre{
        height: 27px;
      }
      
    `}
    .road-line-item{
      width: 50%;
      height: 120px;
      margin-left: 50%;
      padding-left: 45px;
      position: relative;
      &::before{
        content:'';
        position: absolute;
        left: -6px;
        top:0;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #000000;
        background: transparent;
      }
      &::after{
        content: '';
        position: absolute;
        width: 2px;
        left: 0;
        top: 16px;
        bottom: 0;
        background: #000000;
      }
      p{
        margin: 0;
        padding: 0;
      }
      .title{
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 800;
        color: #333333;
        line-height: 1.2;
      }
      .desc{
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
        line-height: 1.5;
        margin-top: 20px;
      }
      &.item-1{
        height: 110px;
      }
      &.item-5{
        height: 101px;
      }
      &.item-2,&.item-4{
        margin-left: 0;
        padding-left: 0;
        padding-right: 45px;
        .title{
          text-align: right;
        }
        .desc{
          text-align: right;
        }
        &::before{
          left: calc(100% - 6px);
        }
        &::after{
          left: 100%;
        }
      }
      ${({theme})=>theme.mediaWidth.upToSLarge`
        padding-left: 30px;  
        .title{
          font-size: 20px;
        }
        .desc{
          font-size: 14px;
          margin-top: 15px;
        }
        
        &.item-2,&.item-4{
          margin-left: 0;
          padding-left: 0;
          padding-right: 30px;
        }
      `}
      ${({theme})=>theme.mediaWidth.upToSmall`
        padding-left: 13px;
        height: 80px;
        .title{
          font-size: 14px;
        }
        .desc{
          font-size: 12px;
          margin-top: 8px;
        }
        &.item-1{
          height: 96px;
        }
        &.item-5{
          height: 80px;
        }
        &.item-2,&.item-4{
          margin-left: 0;
          padding-left: 0;
          padding-right: 13px;
        }
      `}

    }
  }
 
`
export default function RoadmapComp({ idName }: { idName: string }) {
  const { t } = useTranslation()
  return (<BannerFrame id={idName}>
    <ComBgFra
      img1={MBannerBg1}
      img2={MBannerBg2}
      img3={MBannerBg3}
      isBackground={true}
      isFullScreen={true}>
      <div className='common-title'>
        {t('Roadmap')}
      </div>
      <div className='roadmap-line-content'>
        <div className='decoration-img'></div>
        <div className='decoration-line-pre'></div>
        {
          [1,2,3,4,5].map((item,index)=>{
            return (<div className={`road-line-item item-${item}`} key={`road-map-line-${index}`}>
              <p className='title'>{t('roadMapTitle'+item)}</p>
              <p className='desc'>{t('roadMapDesc'+item)}</p>
            </div>)
          })
        }
      </div>
    </ComBgFra>
  </BannerFrame>)
}