import React, { useState,useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from "axios"


function FirstComponent() {
 useEffect(() => {
    // Good!
   axios.get('URL1').then(
    (response)=>(setDataState(response.data))
   ).catch(error =>((console.log(error))))
  }, []);
  const data1 = [
    { time: '00:00', value: 25 },
    { time: '01:00', value: 30 },
    { time: '02:00', value: 35 },
    // add more data here
  ];
  const data2 = [
    { time: '00:00', value: 10 },
    { time: '01:00', value: 20 },
    { time: '02:00', value: 15 },
    // add more data here
  ];
  const [dataState, setDataState] = useState(data1);
  const [optionDtate, setOptionData] = useState(
    [{ value: 'nb_humans', label: 'Number of humans' },
    { value: 'vel_humans', label: 'Velocities of humans' }]
  );

  const handleOptionChange = (e) => {
    if(e.target.value === 'nb_humans'){
      axios.get('URL1').then(
        (response)=>(setDataState(response.data))
       ).catch(error =>(console.log(error)))
    }else{
      axios.get('URL2').then(
        (response)=>(setDataState(response.data))
       ).catch(error =>((console.log(error))))
    }
    //e.target.value === 'nb_humans' ? setDataState(data1):setDataState(data2)
  }

  return (
    <div>
      <select onChange={handleOptionChange}>
      {optionDtate.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <LineChart width={600} height={300} data={dataState}>
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <XAxis dataKey="time" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
}

export default FirstComponent;