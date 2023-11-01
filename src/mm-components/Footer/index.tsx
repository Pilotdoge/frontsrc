import React, { useState } from "react";

import L1ogo from '../../assets/pilot/images/twitter@2x.png'
import L1ogoActive from '../../assets/pilot/images/twitter-act@2x.png'
import ML1ogo from "./../../assets/pilot/m-images/twitter.png"
import ML1ogo2 from "./../../assets/pilot/m-images/twitter@2x.png"
import ML1ogo3 from "./../../assets/pilot/m-images/twitter@3x.png"
import AML1ogo from "./../../assets/pilot/m-images/twitter-act.png"
import AML1ogo2 from "./../../assets/pilot/m-images/twitter-act@2x.png"
import AML1ogo3 from "./../../assets/pilot/m-images/twitter-act@3x.png"


import L2ogo from '../../assets/pilot/images/telegram@2x.png'
import L2ogoActive from '../../assets/pilot/images/telegram-act@2x.png'
import ML2ogo from "./../../assets/pilot/m-images/telegram.png"
import ML2ogo2 from "./../../assets/pilot/m-images/telegram@2x.png"
import ML2ogo3 from "./../../assets/pilot/m-images/telegram@3x.png"

import AML2ogo from "./../../assets/pilot/m-images/telegram-act.png"
import AML2ogo2 from "./../../assets/pilot/m-images/telegram-act@2x.png"
import AML2ogo3 from "./../../assets/pilot/m-images/telegram-act@3x.png"


import styled from "styled-components";
import MobileImg from "mm-components/MobileImg";
import { useTranslation } from "react-i18next";


const FooterContainer = styled.div`
  width: 100%;
  background: linear-gradient(to top,#242B67,#0E092E);
  padding-top: 80px;
  .footer-content{
    padding-top: 60px;
    padding-bottom: 176px;
    box-sizing: border-box;
    p{
      text-align: center;
      margin: 0;
      padding: 0;
      color: #D9D9D9;
      &.footer-title{
        font-size: 18px;
        line-height: 33px;
        color: #D9D9D9;
        font-weight: bold;
        padding-bottom: 20px;
      }
      &.footer-desc{
        font-size: 14px;
        line-height: 1.5;
      }
    }
  }
  ${({theme})=>theme.mediaWidth.upToSmall`
    padding-top: 40px;
    .footer-content{
      padding-top: 39.5px;
      padding-bottom: 66.5px;
      p{
        padding: 0 22px;
        box-sizing: border-box;
        &.footer-title{
          font-size: 14px;
          padding-bottom: 0px;
        }
        &.footer-desc{
          font-size: 12px;
        }
      }
    }
  `}
`

const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex:none;
  width: 45%;
  margin: 0 auto;
  ${({ theme }) => theme.mediaWidth.upToLarge`
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  `};
  ${({theme})=>theme.mediaWidth.upToSmall`
    padding-bottom: 0;
    padding-top: 0;
  `}

`



const FooterLogo1 = ({actNum, onClick}:{
  actNum: number,
  onClick: Function
}) => {
  const [isHover, setHover] = useState(false)
  
  return (<>
    <MobileImg
      className="mobile"
      img1={actNum === 1? AML1ogo : ML1ogo}
      img2={actNum === 1? AML1ogo2 :ML1ogo2}
      img3={actNum === 1? AML1ogo3 :ML1ogo3}
      onClick={()=>onClick(1)}
    />
    <img className='pc'
      onMouseLeave={() => setHover(false)}
      onMouseOver={() => setHover(true)}
      onClick={()=>onClick(1)}
      style={{cursor:'pointer'}}
      width={'75px'} src={isHover||actNum === 1 ? L1ogoActive : L1ogo} alt="logo" />
  </>)
}
const FooterLogo2 = ({actNum, onClick}:{
  actNum: number,
  onClick: Function
}) => {
  const [isHover, setHover] = useState(false)
  return (<>
    <MobileImg
      className={"mobile"}
      img1={actNum === 2? AML2ogo :ML2ogo}
      img2={actNum === 2? AML2ogo2 :ML2ogo2}
      img3={actNum === 2? AML2ogo3 :ML2ogo3}
      onClick={()=>onClick(2)}
    />
    <img className='pc'
      onMouseLeave={() => setHover(false)}
      onMouseOver={() => setHover(true)}
      onClick={()=>onClick(2)}
      style={{cursor:'pointer'}}
      width={'75px'} src={isHover||actNum === 2 ? L2ogoActive : L2ogo} alt="logo" />
  </>)
}

export default function Footer() {
  const { t } = useTranslation()
  const [actNum, setActNum] = useState(1)
  const clickHander = (val:number)=>{
    setActNum(val)
    let url = 'https://twitter.com/Pilotdog2049'
    if(val === 2){
      url= "https://t.me/Pilotdoge2023"
    }
    window.open(url,'_blank')
  }
  return (<FooterContainer>
      <LeftDiv >
        <FooterLogo1 actNum={actNum} onClick={clickHander}/>
        <div style={{ width: '40px' }}></div>
        <FooterLogo2 actNum={actNum} onClick={clickHander}/>
      </LeftDiv>
      <div className="footer-content">
        <p className="footer-title">{t('footerTitle')}</p>
        <p className="footer-desc">{t('footerDesc1')}</p>
        <p className="footer-desc">{t('footerDesc2')}</p>
      </div>

    

  </FooterContainer>)
}