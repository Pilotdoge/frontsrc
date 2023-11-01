import React, { useEffect, useState,  useRef, useMemo } from 'react'
import styled from 'styled-components'
import BannerBg from '../../assets/pilot/images/bg1.png'
import MBannerBg1 from './../../assets/pilot/m-images/bg1.png'
import MBannerBg2 from './../../assets/pilot/m-images/bg1@2x.png'
import MBannerBg3 from './../../assets/pilot/m-images/bg1@3x.png'

import IdoTweetImg from './../../assets/pilot/images/retweet-tip.png'
import IdoImg1 from './../../assets/pilot/images/ido-img1.png'
import Img1 from './../../assets/pilot/m-images/ido-img1.png'
import Img2 from './../../assets/pilot/m-images/ido-img1@2x.png'
import Img3 from './../../assets/pilot/m-images/ido-img1@3x.png'
import ComBgFra from 'mm-components/ComBgFra'
import { useTranslation } from 'react-i18next'
import MobileImg from 'mm-components/MobileImg'
import { useWeb3React } from '@web3-react/core'
import Loader from 'mm-components/Loader'
import BigNumber from 'bignumber.js'
import { usePilotDogContract } from 'mm-hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useSingleContractMultipleMethodData } from "state/multicall/hooks";
import { useWalletModalToggle } from 'state/application/hooks'
import { toast } from "react-toastify";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)

const BannerFrame = styled.div`
  width: 100%;
  &>.pc{
    background: url(${BannerBg}) no-repeat center center;
    background-position: center top;
    background-size: auto 1097px;
    width: 100%;
    min-height: 1097px
    padding-top: 258px;
  }
  &>.mobile{
    padding-top: 110px;
    padding-bottom: 50px;
    height: auto !important;
    background-position: center bottom !important;
  }
  .ido-content-wrap{
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    aling-items: center;
    .left{
      width: 44%;
      flex: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      img{
        width: 100%;
        display:block;
      }
    }
    .right{
      flex: auto;
      padding-left: 53px;
      box-sizing: border-box;
      .title{
        width: 100%;
        font-size: 52px;
        font-weight: 800;
        color: #FCA426;
        line-height: 59px;
      }
      .desc{
        width: 90%;
        font-size: 22px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 31px;
        padding-top: 10px;
      }
      .mobile-img1{
        margin: 0 auto;
        margin-top: 27px;
      }
      .value-wrap{
        .val{
          font-size: 60px;
          font-weight: 800;
          color: #FCA426;
          line-height: 1;
          margin-right: 10px;
        }
        .unit{
          font-family: PingFang SC;
          font-size: 26px;
          line-height: 1;
          font-weight: 800;
          color: #FCA426;

        }

      }
      .ido-tip{
        width: 90%;
        font-size: 16px;
        font-weight: 500;
        color: #D9D9D9;
        line-height: 25px;
        margin-top: 20px;
      }
      .ido-error-msg{
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #F34848;
        line-height: 25px;
      }
      .btn-wrap{
        display: flex;
        flex-direction: row;
        justify-content:space-between;
        width: 90%;
        padding-top: 43px;
        align-items: center;
        .common-btn{
          border:none;
          outline: none;
          background: transparent;
          width: 180px;
          height: 50px;
          background: #FCA426;
          border-radius: 10px;
          font-size: 28px;
          font-weight: bold;
          color: #000;
          cursor: pointer;
          &.disable{
            background: #888996;
          }
          &.hidden{
            display: none;
          }
          &.hidden{
            display: none;
          }
          &:hover{
            opacity:.8;
          }
          &.retweet{
            position: relative;
            &::after{
              position: absolute;
              content:'';
              background: url(${IdoTweetImg}) no-repeat center center;
              background-size: 87px 64px;
              width: 87px;
              height: 64px;
              right: - 33px;
              top: -64px;
            }
          }
        }
      }
    }

    ${({theme})=>theme.mediaWidth.upToSLarge`
      .right{
        padding-left: 30px;
        .title{
          font-size: 42px;
        }
        .desc{
          font-size: 20px;
        }
        .btn-wrap{
          .common-btn{
            width: 32%;
          }
        }
      }
    `}
    
    
    ${({theme})=>theme.mediaWidth.upToSmall`
      width: 100%;
      flex-wrap: wrap;
      .left{
        display: none;
      }
      .right{
        width: 100%;
        .title{
          font-size: 37px;
          line-height: 1.2;
          width: calc(100% - 40px);
          padding-top:0;
          text-align: center;
          margin: 0 auto;
        }
        .desc{
          font-size: 14px;
          line-height: 1.3;
          padding-top: 20px;
          width: calc(100% - 40px);
          text-align: center;
          margin: 0 auto;
        }
        .value-wrap{
          padding-top: 27px;
          text-align: center;
          .val{
            font-size: 40px;
          }
          .unit{
            font-size: 20px;
          }

        }
        .ido-tip{
          width: calc(100% - 40px);
          text-align: center;
          margin: 0 auto;
          font-size: 12px;
          line-height: 1.5;
          margin-top: 13px;
        }
        .ido-error-msg{
          text-align: center;
          font-size: 12px;
        }
        .btn-wrap{
          flex-direction: column;
          width: 100%;
          height: 130px;
          padding-top: 20px;
          .common-btn{
            width; 140px;
            height: 25px;
            border-radius: 5px;
            font-size: 14px;
            &.retweet::after{
              right: -62.5px;
              top: -28px;
              width: 63.5px;
              height: 41.5px;
              background-size: 100% auto;
            }
          }
        }
      }

    `}
  }
  .ido-bottom{
    padding-top: 59px;
    p{
      text-align: center;
      padding: 0;
      margin: 0;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #D9D9D9;
      line-height: 18px;
      text-align: center;
    }
    ${({theme})=>theme.mediaWidth.upToSmall`
      padding-top: 55px;
      padding-bottom: 47px;
      p{
        transform: scale(0.9);
        transform-origin: center top;
        line-height: 1;
      }
    
    `}
  }
 
`

const useGetIsClaimed = ()=>{
  const contract = usePilotDogContract(process.env.REACT_APP_PILOT_CONTRACT)
  let { account } = useWeb3React()
  // @ts-ignore 
  let res = useSingleContractMultipleMethodData(contract, ['claimed'],[[account]])
  console.log('getisclaimed res', res)
  return useMemo(()=>{
    return res.reduce((dresult: boolean, item)=>{
      if(item.result && item.result.length){
        return (item.result[0])
      }else{
        return (false)
      }
    },false)
  },[res])
}

export default function IdoComp({ idName }: { idName: string }) {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const contract = usePilotDogContract(process.env.REACT_APP_PILOT_CONTRACT, true)
  const addTransaction = useTransactionAdder()
  // @ts-ignore 
  const [errMsg, setErrMsg] = useState('')
  
  const [num, setNum] = useState('')
  const [isFit, setIsFit] = useState<boolean|string>('')
  // @ts-ignore 
  const [tweetContent, setTweetContent] = useState('')
  const startTime =  new Date("2023-11-15T00:00:00")
  const endTime =  new Date("2023-11-22T00:00:00")
  const isClaimed = useGetIsClaimed()
  const [checkBtnCls, setCheckBtnCls] = useState('')
  const [tamount, setTAmount] = useState('0')
  const [merkleproof, setMerkleproof] = useState([])
  const toggleWalletModal = useWalletModalToggle()
  const isClaiming = useRef(false)
  useEffect(()=>{
    if(isFit === ''){
      setErrMsg('')
      setCheckBtnCls('') 
      return 
    }
    if(isFit){
      // is in 
      let now = Date.now()
      if(now <= endTime.getTime() && now > startTime.getTime()){
        if(isClaimed){
          setErrMsg('You have already claimed it')
          setCheckBtnCls('disable') 
        }else{
          setErrMsg('')
          setCheckBtnCls('') 
        }
      }else{
        // unstart
        setErrMsg('')
        setCheckBtnCls('disable') 
      }
    }else{
      setErrMsg('You do not meet the eligibility criteria')
      setCheckBtnCls('disable')
    }
  },[isFit, isClaimed])
  const getClaimNum = async()=>{
    let accountStr = (account || '').toLowerCase()
    try{
      let response = await fetch(`${process.env.REACT_APP_NET_API}/get_eligible?address=${accountStr}`)
      let result = await response.json()
      if(result.code === 'Ok'){
        let { claimable_amount = '0', eth_gas_cost='' } = result.data
        setNum(claimable_amount)
        let tweetstr = `@Pilotdog2049 I have spent a total of ${eth_gas_cost} Gas fees on Orbiter Finance and can claim ${claimable_amount} PLD airdrop.\n\nPilotdog is the first MEME project on Scroll.The website is https://pilotdog.tech/.
        `
        // `我已经在Orbiter Finance上一共花费${eth_gas_cost}枚Gas费，可以领取${claimable_amount}枚PLD空投，`
        setTweetContent(encodeURIComponent(tweetstr) )
        if(new BigNumber(eth_gas_cost||0).comparedTo('0') < 1){
          setIsFit(false)
        }else{
          setIsFit(true)
        }

        openTweet(encodeURIComponent(tweetstr))
      }else{
        setNum('0')
      }
    }catch(err){
      console.log('getclaimnum has error', err)
      setNum('0')
    }
  }
  const getProof = async()=>{
    let accountStr = (account || '').toLowerCase()
    try{
      let response = await fetch(`${process.env.REACT_APP_NET_API}/get_eligible_proof?address=${accountStr}`)
      let result = await response.json()
      if(result.code === 'Ok'){
        let {proof = [], amount='0'} = result.data 
        setMerkleproof(proof)
        setTAmount(amount)
      }else{
        setMerkleproof([])
        setTAmount('0')
      }
    }catch(error){
      setMerkleproof([])
      setTAmount('0')
    }
    
  }
 
  useEffect(()=>{
    if(account){
      getClaimNum()
      getProof()
    }
  },[account])
  const toCheck = ()=>{
    if(!account){
      toggleWalletModal()
      return 
    }
  }
  const toClaimClick = async()=>{
    
    if(checkBtnCls === 'disable' || !contract ){
      return
    }
    if(isClaiming.current){
      return 
    }
    isClaiming.current = true
    try{
      console.log('claimed params = ',tamount, merkleproof)
      // @ts-ignore 
      let response = await contract?.claim(tamount, merkleproof)
      addTransaction(response, {
        summary: 'Claim'
      })
      toast.success(t('Transaction Submitted'))

    }catch(error){

    }finally{
      isClaiming.current = false
    }

  }
  const toIDO = ()=>{
    let tempUrl = process.env.REACT_APP_MINT_BTN_URL || '';
    console.log('toIDO=',tempUrl, process.env.REACT_APP_MINT_BTN_URL)
    if(tempUrl){
      window.location.href = tempUrl
    }
    
  }
  const showTweet = (str: string)=>{
    const twitterText = `https://twitter.com/intent/tweet?text=${tweetContent|| str}`
    window.open(twitterText, '_blank');
  }
  const openTweet = (str: string)=>{
    if(process.env.NODE_ENV === 'development'){
      return
    }
    document.getElementById('openLink')?.addEventListener('click', function(event) {
      event.preventDefault(); // 防止链接默认跳转
      showTweet(str)
    });
    document.getElementById('openLink')?.click()
  }

  


  return (<BannerFrame id={idName}>
    <ComBgFra
      img1={MBannerBg1}
      img2={MBannerBg2}
      img3={MBannerBg3}
      isBackground={true}
      isFullScreen={true}>
        <div id="openLink" style={{display:'none'}}></div>
      <div className='ido-content-wrap'>
        <div className='left pc'>
          <img src={IdoImg1} />
        </div>
        <div className='right'>
          <div className='title'>{t('idoTitle')}</div>
          <p className='desc' >{t('idoDesc')}</p>
          <MobileImg img1={Img1}
          img2={Img2}
          img3={Img3}
          isBackground={true}
          isFullScreen={false}
          className={`mobile mobile-img1`} />
          <div className='value-wrap'>
            <span className='val'>
              {!account?'--':(num===''?<Loader size={'48px'} stroke='#FCA426'/>:(num))}
            </span>
            <span className='unit'>PLD</span>
          </div>
          <div className='ido-tip'>{
            t('idotip1', {
              startTime: dayjs(startTime).format('YYYY/MM/DD HH:mm'),
              endTime: dayjs(endTime).format('YYYY/MM/DD HH:mm'),
            })
          }</div>
          <div className='ido-error-msg'>
            {errMsg}
          </div>
          <div className='btn-wrap'>
            <button className={`common-btn disable ${!!account?'hidden':''}`} onClick={()=>toCheck()}>
             {t('Check')} 
            </button>
            <button disabled className={`common-btn disable ${checkBtnCls}`} onClick={()=>toClaimClick()}>
             {t('Mint')}{isClaiming.current?<Loader/>:''} 
            </button>
            <button disabled className='common-btn disable' onClick={()=>toIDO()}>{t('IDO')}</button>
            <button  className={`common-btn retweet ${!!account?'':'hidden'}`} style={{visibility:'hidden'}} >{t('retweet')}</button>
          </div>

        </div>
       

      </div>

      <div className='ido-bottom'>
        <p className='common-tip'>{t('commonBotTip')}</p>
        <p className='ido-tip'>{t('idoBottip')}</p>
      </div>
    </ComBgFra>
  </BannerFrame>)
}