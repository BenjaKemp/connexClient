import '../App.css';
import React from 'react';

const Metrics = ({metrics}) => {

  const stripHtml = (html) => {
   let tmp = document.createElement("div");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || ""
  }

    return (
      <div className="metrics">
        <pre>
        {stripHtml(metrics)}
        </pre>
      </div>
    )
  };

export default Metrics
   