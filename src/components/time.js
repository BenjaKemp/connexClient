import '../App.css';
import React, { useEffect, useState } from 'react';
const { DateTime } = require("luxon");

const Time = ({time}) => {
  
  const initialTimeDiff = () => {
    const serverTime = DateTime.fromMillis(time.epoch)
    return DateTime.local().diff(serverTime, 'seconds')
  }
  
  const [count, setCount] = useState(initialTimeDiff);

  useEffect(() => {
      setInterval(() => {
        setCount(count => count.plus(1000))
      }, 1000);
  }, []);

    return (
      <div className="time">
        <h1>{count.toFormat('hh:mm:ss')}</h1>
      </div>
    )
  };

export default Time
   