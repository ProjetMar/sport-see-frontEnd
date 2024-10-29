import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class Poids extends PureComponent {
    static demoUrl = 'https://codesandbox.io/p/sandbox/bar-chart-with-double-yaxis-39dhps';

  render() {
    const { data } = this.props;
    const formatDay = (day) => {
        const date = new Date(day);
        return date.getDate(); // Récupère seulement le jour
    };
    const CustomLegend = (props) => {
      const { payload } = props;
      return (
        <ul style={{ display: 'flex', listStyleType: 'none', padding: 0, justifyContent: 'flex-end', marginBottom:64.5, marginTop: 0 }}>
          {payload.map((entry, index) => (
            <li key={`item-${index}`} style={{ marginRight: 32, color: '#74798C', fontSize:14, fontWeight:500 }}> {/* Change la couleur ici */}
              <span style={{ color: entry.color, width: 8, height: 8, marginRight: 7 }}>⬤</span> {/* Cercle de la même couleur que la barre */}
              {entry.value}
            </li>
          ))}
        </ul>
      );
    };
    return (
      <ResponsiveContainer width="100%" height="100%">
        <p style={{ margin: '0px', position:'absolute',zIndex: 100,  fontSize: 15, color: '#20253A', fontWeight: 500 }}>Activité quotidienne</p>
        <BarChart
          // width={600}
          // height={300}
          radius={5}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis dataKey="day" stroke='#9B9EAC' tickFormatter={formatDay} tickLine={false}/>
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" tickCount={3} hide="true" />
          <YAxis yAxisId="right" orientation="right" stroke="#9B9EAC" tickLine={false} domain={['dataMin-5', "auto"]} tickCount={3} axisLine={false}/>
          <Tooltip cursor={{color:'#C4C4C480'}} position={{ y: 0 }} content={({ payload, label, active }) => {
                if (active && payload && payload.length) {
                    return (
                    <div className="custom-tooltip" style={{ backgroundColor: '#E60000', 
                    padding: '5px 12px', 
                    color: 'white', 
                    marginLeft: '47px', marginRight: '47px',
                    marginBottom: '20px', fontSize: '7px', lineHeight :'24px' }}>
                        {payload.map((entry, index) => (
                        <p key={index} style={{ color: 'white'}}>
                            {`${entry.value}${index===1 ? 'kCal' : 'g' }`}
                        </p>
                        ))}
                    </div>
                    );
                }

                return null;
           }} />
          <Legend content={<CustomLegend />} verticalAlign="top"/* align='right' iconType='circle' height={36} wrapperStyle={{ color: '#74798C' }}*//>
          <Bar yAxisId="right" dataKey="kilogram" name="Poids (kg)" fill="#282D30" barSize={7} radius={[20, 20, 0, 0]}/>
          <Bar yAxisId="left" dataKey="calories" name="Calories brûlées (kCal)" fill="#E60000" barSize={7} radius={[20, 20, 0, 0]}/>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
