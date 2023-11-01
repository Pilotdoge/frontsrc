import React,{ useState } from 'react';
import { isMobile } from 'react-device-detect';

const MobileImg = ({img1, img2, img3, isBackground=false,isFullScreen=false,children,onClick, ...rest}:{
  img1: any,
  img2: any,
  img3: any,
  isBackground?: boolean,
  isFullScreen?:boolean,
  className?: string,
  children?: React.ReactNode ,
  onClick?:Function
}) => {
  const devicePixelRatio = window.devicePixelRatio;
  let imagePath: any;
  let imgArr = [img1,img2, img3]

  if (devicePixelRatio >= 3) {
    imagePath = imgArr.length>2?imgArr[2]:null;
  } else if (devicePixelRatio >= 2) {
    imagePath = imgArr.length>1?imgArr[1]:null;
  } else {
    imagePath = imgArr.length>0?imgArr[0]:null;
  }
  let [width, setWidth] = useState('auto')
  let [height, setHeight] =  useState('auto')
  if(imagePath){
    let img = new Image()
    img.src = isMobile? img1 : img2
    img.onload = () => {
      setWidth( img.width + 'px');
      setHeight( img.height + 'px');
    };
  }
  const clickHander = ()=>{
    onClick&&onClick()
  }
  return (
    <div
     style={{
      width:`${isFullScreen?'100%':width}`,
      height,
      background:`${isBackground?'url('+imagePath+')  center center / 100% '+ height+' no-repeat':''}`,
    }}
    {...rest}
    onClick={clickHander}
    >
      {
        isBackground ?(children) : (<img src={imagePath} alt="" style={
          {
            width,
            height
          }
        } />)
      }
      
    </div>
  );
};

export default MobileImg;
