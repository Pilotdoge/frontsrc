import { useState, useEffect } from 'react';

const useCountdownTimer = ({ initialTime, onTimeout }:{
  initialTime: number,
  onTimeout?: Function
}) => {
  const [time, setTime] = useState(Number(initialTime));

  // 当 initialTime 发生变化时，更新倒计时时间
  useEffect(() => {
    setTime(Number(initialTime));
  }, [initialTime]);

  useEffect(() => {
    // 创建一个定时器，每秒减少一秒
    const timer = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(timer);
        // 时间到达0时触发回调函数
        if (onTimeout) {
          onTimeout();
        }
      }
    }, 1000);

    // 在组件卸载时清除定时器
    return () => {
      clearInterval(timer);
    };
  }, [time, onTimeout]);

   const formatTimeFn = (seconds: number) => {
    let leftSec = parseInt(seconds+'') % 86400;
    const hours = Math.floor( leftSec / 3600);

    const minutes = Math.floor((leftSec % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return { time, formatTimeFn}
};

export default useCountdownTimer;
