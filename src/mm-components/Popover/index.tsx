import { Placement } from '@popperjs/core'
import { transparentize } from 'polished'
import React, { useCallback, useState } from 'react'
import { usePopper } from 'react-popper'
import styled from 'styled-components'
import useInterval from '../../mm-hooks/useInterval'
import Portal from '@reach/portal'

const PopoverContainer = styled.div<{ show: boolean }>`
  z-index: 9999;

  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  opacity: ${props => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;

  background: ${({ theme }) => theme.bg2};
  border: 1px solid #FFD352;//${({ theme }) => theme.bg3};
  box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.9, theme.shadow1)};
  color: ${({ theme }) => theme.text2};
  border-radius: 8px;
  &.title-tip-content{
    border-color: #FFD352;
    border-radius: 25px;
    .arrow-top::before, .arrow-bottom::before{
      border-color: #FFD352;
    }
    .tooltip-table{
      border-spacing: 0;
      tr{
        td{
          text-align: center;
          font-size: 16px;
          line-height: 1;
        }
  
      }
      thead{
        tr{
          td{
            color: #ffffff;
            padding: 23px 30px;
            border-bottom: 1px solid #FFD352;
            border-right: 1px solid #FFD352;
            &:last-child{
              border-right: none;
            }
            
          }
        }
      }
      tbody{
        tr{
          td{
            color: #cccccc;
            padding-top: 20px;
            border-right: 1px solid #FFD352;
            &:last-child{
              border-right: none;
            }
          }
          &:last-child{
            td{
              padding-bottom: 20px;
            }
          }
        }
      }
    }

  }
  ${({theme})=>theme.mediaWidth.upToSmall`
    &.title-tip-content{
      border-radius: 10px;
      .tooltip-table{
        tr{
          td{
            font-size: 14px;
          }
        }
        thead{
          tr{
            td{
              padding: 8px 10px;
              box-sizing: border-box;
            }
          }
        }
        tbody{
          tr{
            td{
              padding-top: 15p;x
            }
            &:last-child{
              padding-bottom: 15px;
            }
          }

        }
      }
    }
  
  `}
  
`

const ReferenceElement = styled.div`
  display: inline-block;
`

const Arrow = styled.div`
  width: 8px;
  height: 8px;
  z-index: 9998;

  ::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: 9998;

    content: '';
    border: 1px solid #FFD352;//${({ theme }) => theme.bg3};
    transform: rotate(45deg);
    background: ${({ theme }) => theme.bg2};
  }

  &.arrow-top {
    bottom: -5px;
    ::before {
      border-top: none;
      border-left: none;
    }
  }

  &.arrow-bottom {
    top: -5px;
    ::before {
      border-bottom: none;
      border-right: none;
    }
  }

  &.arrow-left {
    right: -5px;

    ::before {
      border-bottom: none;
      border-left: none;
    }
  }

  &.arrow-right {
    left: -5px;
    ::before {
      border-right: none;
      border-top: none;
    }
  }
`

export interface PopoverProps {
  content: React.ReactNode
  show: boolean
  children: React.ReactNode
  placement?: Placement,
  className?: string,
  popClassName?: string
}

export default function Popover({ content, show, children, placement = 'auto' , className="",popClassName=""}: PopoverProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
  const { styles, update, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset: [8, 8] } },
      { name: 'arrow', options: { element: arrowElement } }
    ]
  })
  const updateCallback = useCallback(() => {
    update && update()
  }, [update])
  useInterval(updateCallback, show ? 100 : null)

  return (
    <>
      <ReferenceElement className={className} ref={setReferenceElement as any}>{children}</ReferenceElement>
      <Portal>
        <PopoverContainer className={popClassName} show={show} ref={setPopperElement as any} style={styles.popper} {...attributes.popper}>
          {content}
          <Arrow
            className={`arrow-${attributes.popper?.['data-popper-placement'] ?? ''}`}
            ref={setArrowElement as any}
            style={styles.arrow}
            {...attributes.arrow}
          />
        </PopoverContainer>
      </Portal>
    </>
  )
}
