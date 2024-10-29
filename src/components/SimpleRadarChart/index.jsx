import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default class SimpleRadarChart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/simple-radar-chart-2p5sxm';

  render() {
    const { data } = this.props;
    // const {kind} = this.props;
    const kindInFrench = {
      1: 'cardio',
      2: 'énergie',
      3: 'endurance',
      4: 'force',
      5: 'vitesse',
      6: 'intensité'
    };
    return (
      <div style={{backgroundColor:'#282D30', width: '100%', borderRadius: 5}}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data} >
            <PolarGrid radialLines={false} stroke='white'/>
            <PolarAngleAxis dataKey="kind" tickLine={false} tickFormatter={(tick) => kindInFrench[tick]} /*tickFormatter={(tick) => kind[tick]}*/ stroke='white' fontSize='12px'/>
            <PolarRadiusAxis tick={false} axisLine={false}  />
            <Radar name="Mike" dataKey="value" fill="#FF0101B2" fillOpacity={0.7} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
