import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function LineChartsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://roadhealthmap.vercel.app/classified');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{display:"flex", paddingTop:"40px", marginLeft:"40px"}}>
      <ResponsiveContainer width="33%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Class" interval={999999999}/>
          <YAxis domain={[-4, 4]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Acc X" stroke="lightblue" />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="33%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Class" interval={999999999}/>
          <YAxis domain={[-4, 4]}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Acc Y" stroke="blue" />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="33%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Class" interval={999999999}/>
          <YAxis domain={[-4, 4]}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Acc Z" stroke="grey" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartsPage;
