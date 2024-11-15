import React, { PureComponent} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './style.css'
const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];

export default class Linechar extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';
  //ajoute de l'opacité apres la souris 
  state = {
    activeDotX: null,
  };
  
  handleTooltip = (props) => {
    
    // Vérifiez si le tooltip est actif et mettez à jour la position de l'active dot
    if (props && props.active && props.coordinate) {
      this.setState({ activeDotX: props.coordinate.x });
    } else {
      this.setState({ activeDotX: null });
    }
  };

  render() {
    //import le data
    const { data } = this.props;
    const { activeDotX } = this.state;
    return (
      <div style={{width: '100%',
        height: '100%',
        borderRadius: '5px',position:'relative',  
        overflow: 'hidden'  }}>
          <ResponsiveContainer width="100%" height="100%">
          <p className='titre'>
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
                  this.handleTooltip({ active, coordinate }); // Mettez à jour la position de l'active dot
                  if (active && payload && payload.length) {
                      return (
                      <div className="custom-tooltip">
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

        {/* Overlay d’opacité dynamique */}
        {activeDotX !== null && (
          <div className='activeDotX'
            style={{left: `${activeDotX}px`}}
          />
        )}
      </div>
    );
  }
}
