import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';


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
      <div style={{backgroundColor:'#FBFBFB', width: '100%', position:'relative', borderRadius: 5}}>
        <p style={{position:'absolute'}}>Score</p>
        <div style={{
          position: 'absolute',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',// Centrer le texte
          backgroundColor: '#FFFFFF',  // Couleur de fond circulaire
          borderRadius: '50%',          // Forme circulaire
          width:'165px',
          height:'165px',   // Espacement autour du texte
          textAlign: 'center',          // Centrer le texte
        }}>
          <p style={{ margin: 0, fontWeight: '700', fontSize:'26px' }}>{normalizedData[0].score}%</p> 
          <p style={{color:"#74798C", fontSize:'16px', fontWeight:'500'}}>de votre<br />objectif</p>
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
