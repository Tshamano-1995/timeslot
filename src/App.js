import React, { useState } from 'react'

function App() {

  const [data, setdata] = useState([
    {
      "Date": "2016-05-18",
      "HoursAvailable": [9, 10, 11, 12, 13, 14, 17]
    },
    {
      "Date": "2016-05-19",
      "HoursAvailable": [9, 10, 11, 12, 13, 14, 15, 16, 17]
    },
    {
      "Date": "2016-05-20",
      "HoursAvailable": [9, 10, 14, 15, 16, 17]
    },
    {
      "Date": "2016-05-21",
      "HoursAvailable": [9, 10, 11, 12, 13]
    },
    {
      "Date": "2016-05-23",
      "HoursAvailable": [13, 14, 15, 16]
    },
    {
      "Date": "2016-05-24",
      "HoursAvailable": [11, 12, 15, 16, 17]
    }
  ])

  const [workhours, setworkhours] = useState([9,10,11,12,13,14,15,16,17])
  const [timeRane, settimeRane] = useState(1)
  const [reload, setreload] = useState(false)

  const checkSlotAvailability = (time, jobLength, date, availability) => {
    let isAvailable = availability.filter(el=>el===time+parseInt(jobLength));
    let isBuffer = availability.filter(el=>el===(time-jobLength));
   
    
    if(isAvailable.length===1){
      if(isBuffer.length===1 && (time>9 && time<17)){//
        return "Unavailable "
      }else{//
        return "Available "
      }
    }else{
      return "Full "
    }

  }

  const dayOfTheWeek = (date) => {
    var dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var day = dayName[new Date(date).getDay()];
    return day + ' ' + new Date(date).getDate() + 'th';
  }

  const hoursRange = (e)=>{
    settimeRane(e.target.value)
    // setworkhours([])

    // // setreload(true)
    // setTimeout(()=>{
    // setreload(false)
    //   setworkhours([9,10,11,12,13,14,15,16,17])
    // }, 1000)
  }



  return (
    <React.Fragment>
      <div className="slidecontainer">
        <input type="range" min="1" max="8" id="myRange" value={timeRane} onChange={hoursRange}/>
        <p>{timeRane}HR/s: <span id="demo"></span></p>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
      
       
        <table style={{ width: "100%" }}>
          <tr id="ROW1">
            <th></th>
            {data.map((item) => (<th>{dayOfTheWeek(item.Date)}</th>))}
          </tr>
          {workhours.map((item)=>(
            <tr>
                  <td>{item}:00 - {item+1}:00</td>
                  {data.map((i) => (<td>{checkSlotAvailability(item, timeRane, i.Date, i.HoursAvailable)}</td>))}
                  
                </tr>
          ))}
          

        </table>
      
      </div>
    </React.Fragment>
  );
}

export default App;
