import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import './style.css'

export default class Example extends PureComponent {
  normalizeUserData = (data) => {
    return [{
      ...data,
      score: (data.todayScore || data.score)*100, // Utilise todayScore ou score, selon ce qui est présent
    }];
  };
  static demoUrl = 'https://codesandbox.io/p/sandbox/simple-radial-bar-chart-gnwjjg';

  render() {
    const { data } = this.props;
     // Normaliser la donnée pour avoir une clé "score"
     const normalizedData = this.normalizeUserData(data);
    return (
      <div className="conteneur-radar">
        <p className='conteneur-radar-titre'>Score</p>
        <div className='conteneur-radar-text'>
          <p className='conteneur-radar-text-one'>{normalizedData[0].score}%</p> 
          <p className='conteneur-radar-text-two'>de votre<br />objectif</p>
        </div>
        <ResponsiveContainer width="100%" height="100%" >
          <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="80%" barSize={10}  startAngle={90}    // Point de départ à 90°
            endAngle={90 + (normalizedData[0].score * 3.6)} data={normalizedData} >
            <RadialBar
              minAngle={15}
              background={{ fill: '#FBFBFB' }}
              clockWise
              dataKey = "score"
              fill="#FF0000"
              cornerRadius={10} 
            />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ display: 'none' }} />
          </RadialBarChart>
       </ResponsiveContainer>
      </div>
      
    );
  }
}
