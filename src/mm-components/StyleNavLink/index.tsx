import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
const activeClassName = 'ACTIVE'

const StyledNavLink = styled.a.attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;
  word-break: keep-all;
  white-space: nowrap;
  font-size: 18px;
  &.dark-txt{
    color:#000000;
  }
  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    text-decoration: underline;
  }

  :hover{
    text-decoration: underline;
    // color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const StyleNavLinkComp = ({href, idName='', className,pathKey,isMenudraw=false, children,...rest}:{
  href: string, 
  idName?: string,
  className?: string,
  isMenudraw?:boolean,
  pathKey: string,
  target?: string,
  children: React.ReactNode
})=>{
   const [globalTxtColor, setGlobalTxtColor] = useState('')
   const [isActive, setIsActive] = useState(false)
   const scrolllistener = ()=>{
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    let compareValueStart = 1030//isMobile ? 60: 300;
    let compareValueEnd = 2146
    activeCheck()
    if(scrollTop > compareValueStart 
      && scrollTop < compareValueEnd){
      setGlobalTxtColor('dark-txt')
    }else{
      setGlobalTxtColor('')
    }
  }
  const activeCheck = ()=>{
    if( idName ){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let domScrollStart = document.getElementById(idName)?.offsetTop || 0
      let domHeight = document.getElementById(idName)?.offsetHeight || 0
      let domScrollEnd = (domScrollStart) + domHeight
      // let domDiv = 0
      if(idName === 'home' || idName === 'about'){
        domScrollEnd -= 63
      }
      // console.log(idName, domScrollEnd, domScrollStart, scrollTop)
      if(scrollTop >= domScrollStart && scrollTop < domScrollEnd){
        setIsActive(true)
      }else{
        setIsActive(false)
      }

    }
  }
  useEffect(()=>{
    activeCheck()
    window.addEventListener('scroll', scrolllistener)
    return ()=>{
      window.removeEventListener('scroll', scrolllistener)
    }
  })
  
  return (<StyledNavLink 
  href={href}
  className={`${className||''} ${isActive?'ACTIVE':''} ${globalTxtColor}`}
  {...rest}
  >
  {children}
</StyledNavLink>)
}

export default StyleNavLinkComp