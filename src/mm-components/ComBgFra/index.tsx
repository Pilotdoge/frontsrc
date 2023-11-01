import React from 'react'
import MobileImg from 'mm-components/MobileImg'
export default function ComBgFra({img1, img2, img3, isBackground=false,isFullScreen=false,className="",children, onClick, ...rest}:{
  img1: any,
  img2: any,
  img3: any,
  isBackground?: boolean,
  isFullScreen?:boolean,
  className?: string,
  children?: React.ReactNode ,
  onClick?:Function
}){
  const clickHander = ()=>{
    onClick&&onClick()
  }
  return (<>
  <div className={`pc ${className}`} onClick={clickHander}>
    {children}
  </div>
  <MobileImg 
    img1={img1} 
    img2={img2}
    img3={img3}
    isBackground={isBackground}
    isFullScreen={isFullScreen}
    className={`mobile ${className}`}
    onClick={clickHander}>
    {children}
    </MobileImg>
  </>)
}