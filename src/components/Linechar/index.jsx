import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];

export default class Linechar extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';

  render() {
    //import le data
    const { data } = this.props;
    return (
      <div style={{width: '100%',
        height: '100%',
        borderRadius: '5px',  
        overflow: 'hidden'  }}>
          <ResponsiveContainer width="100%" height="100%">
          <p style={{margin:'0px', position:'absolute',  color: '#FFFFFF', opacity: '0.52', width:'147px',
            fontSize:'15px', zIndex: '100', lineHeight:'24px', marginLeft:'34px', marginTop:'29px'}}>
              Durée moyenne des sessions
          </p>
          <LineChart
            // width={500}
            // height={300}
            data={data}
            margin={{ top: 0, right: 0, bottom: -30, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical = {false} horizontal = {false} fill='#FF0000' />
            <XAxis dataKey="day"  tickLine={false} dy={-25} axisLine={false}  tickFormatter={(day) => daysOfWeek[day - 1]} 
            padding={{ left: 10, right: 10 }} tick={{ fill: 'rgba(255,255,255,0.52)', fontSize: 12}} style={{backgroundColor: '#FF0000'}}/>
            <YAxis domain={['dataMin-20', "dataMax+20"]} hide={true}/>
            <Tooltip cursor={{color:'#C4C4C480'}}  content={({ payload, label, active, coordinate }) => {
                  if (active && payload && payload.length) {
                      return (
                      <div className="custom-tooltip" style={{background: 'black', backgroundColor: 'white', 
                      padding: '0px 5px', 
                      color: 'white', fontSize: '8px', lineHeight :'24px', position: 'relative', 
                      top: '-40px',   }}>
                          {payload.map((entry, index) => (
                          <p key={index} style={{ color: 'black'}}>
                              {`${entry.value}min`}
                          </p>
                          ))}
                      </div>
                      );
                  }

                  return null;
            }} />
            
            <Line type="monotone" dataKey="sessionLength" stroke='white' strokeWidth={2}  dot={false}  
            activeDot={{ fill: 'white', stroke: 'rgba(255,0,0,0.6)',strokeWidth: 8 , r:8 }} />
          </LineChart>
        </ResponsiveContainer>  
      </div>
    );
  }
}
