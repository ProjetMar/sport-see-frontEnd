import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Aside from "../../components/Aside";
//import {USER_MAIN_DATA} from "../../data.js";
// import{USER_ACTIVITY} from "../../data.js";
// import {USER_AVERAGE_SESSIONS} from "../../data.js";
// import{USER_PERFORMANCE} from "../../data.js";
import Loader from "../../utils/Loader/Loader.jsx";
 import Bonjour from "../../components/Bonjour";
import "./style.css"
import Poids from "../../components/Poids/index.jsx";
import KeyData from "../../components/KeyData/idex.jsx";
import iconKcal from"../../assets/calories-icon.png";
import iconProt from"../../assets/protein-icon.png" ;
import iconCarb from "../../assets/carbs-icon.png";
import iconFat from "../../assets/fat-icon.png";
import Linechar from "../../components/Linechar/index.jsx";
import SimpleRadarChart from "../../components/SimpleRadarChart/index.jsx";
import SimpleRadialBarChart from "../../components/SimpleRadialBarChart/index.jsx";
import { useState, useEffect } from "react";
// import exportFromJSON from 'export-from-json';

function User(){
    const {id} = useParams()
    console.log(id)
    //const user = USER_MAIN_DATA.find(item => item.id === Number(id));
    // const dataPoid = USER_ACTIVITY.find(item => item.userId === Number(id));
    // const dataAverage = USER_AVERAGE_SESSIONS.find(item => item.userId === Number(id))
    //const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = user.keyData;
    // const dataRadar = USER_PERFORMANCE.find(item => item.userId === Number(id))
    // console.log(user)
    const [user, setUser]=useState({})
    const [userActivites, setUserActivies]=useState({});
    const[userAverageSessions, setUserAverageSessions]= useState([]);
    const [userPerformance, setUserPerformance]=useState([]);
    const [isDataLoading, setDataLoading] = useState(false);
      // États pour keyData et userInfos
    const [keyData, setKeyData] = useState({});
    const [userInfos, setUserInfos] = useState({});
    useEffect(()=>{
      async function fectchuserInfo(){
        setDataLoading(true)
        try {
          const response = await fetch(`http://localhost:4000/user/${id}`)
          const userData = await response.json()
          console.log(userData.data)
          setUser(userData.data);
          // Mettez à jour keyData et userInfos séparément
         setKeyData(userData.data.keyData);
         setUserInfos(userData.data.userInfos);
        } catch(err) {
          console.log(err)
        } finally {
          setDataLoading(false)
        }
      }
      fectchuserInfo()
      async function fectchactivities(){
        try {
          const response = await fetch(`http://localhost:4000/user/${id}/activity`)
          const userData = await response.json()
          console.log(userData.data)
          setUserActivies(userData.data);
        } catch(err) {
          console.log(err)
        } finally {
        }
      }
      fectchactivities()
      async function fetchAverageSessions(){
        try{
          const response = await fetch(`http://localhost:4000/user/${id}/average-sessions`)
          const userData = await response.json()
          setUserAverageSessions(userData.data)
          console.log(userData.data)
        }catch(err){
          console.log(err)
        }finally{
        }
      }
      fetchAverageSessions()
      async function fectchPerformance(){
        try {
          const response = await fetch(`http://localhost:4000/user/${id}/performance`)
          const userData = await response.json()
          console.log(userData.data)
          setUserPerformance(userData.data);
        } catch(err) {
          console.log(err)
        } finally {
        }
      }
      fectchPerformance()
    },[id])

    const downloadFile = ({ data, fileName, fileType }) => {
      // Create a blob with the data we want to download as a file
      const blob = new Blob([data], { type: fileType })
      // Create an anchor element and dispatch a click event on it
      // to trigger a download
      const a = document.createElement('a')
      a.download = fileName
      a.href = window.URL.createObjectURL(blob)
      const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      })
      a.dispatchEvent(clickEvt)
      a.remove()
    }
    const exportToJson = e => {
      e.preventDefault()
      downloadFile({
        data: JSON.stringify(userActivites),
        fileName: 'users.json',
        fileType: 'text/json',
      })
    }
    const exportToCsv = e => {
      e.preventDefault();

      // En-têtes pour chaque colonne
      const headers = ['UserId,Day,Kilogram,Calories'];
    
      // Accéder directement à `userActivites`
      const { userId, sessions } = userActivites;
    
      // Créer les lignes de données pour le CSV
      const usersCsv = sessions.map((session) => {
        const { day, kilogram, calories } = session;
        return [userId, day, kilogram, calories].join(',');
      });
     
      downloadFile({
        data: [...headers, ...usersCsv].join('\n'),
        fileName: 'users.csv',
        fileType: 'text/csv',
      })
    }
    const exportToCsvUser = e => {
      e.preventDefault();

      // En-têtes pour chaque colonne
      const headers = ['UserId,TodayScore'];
      const { id } = user;
      const score = user.todayScore === undefined ? user.score : user.todayScore;
      
      const usersCsv = [id, score*100].join(',');
      downloadFile({
        data: [...headers, usersCsv].join('\n'),
        fileName: 'usersScore.csv',
        fileType: 'text/csv',
      });
    }
    const exportToCsvAverage = e => {
      e.preventDefault();

      // En-têtes pour chaque colonne
      const headers = ['UserId,Day,SessionLength'];
    
      // Accéder directement à `userActivites`
      const { userId, sessions } = userAverageSessions;
    
      // Créer les lignes de données pour le CSV
      const usersCsv = sessions.map((session) => {
        const { day, sessionLength} = session;
        return [userId, day, sessionLength].join(',');
      });
     
      downloadFile({
        data: [...headers, ...usersCsv].join('\n'),
        fileName: 'usersAvreage.csv',
        fileType: 'text/csv',
      })
    }
    const exportToCsvPerformance = e => {
      e.preventDefault();

      // En-têtes pour chaque colonne
      const headers = ['UserId,kind,value'];
    
      // Accéder directement à `userActivites`
      const { userId, kind, data } = userPerformance;
    
      // Créer les lignes de données pour le CSV
      const usersCsv = data.map((val) => {
        const activityType = kind[val.kind]; // Traduire le numéro en nom de type
        return [userId, activityType, val.value].join(',');
      });
     
      downloadFile({
        data: [...headers, ...usersCsv].join('\n'),
        fileName: 'usersPerformance.csv',
        fileType: 'text/csv',
      })
    }
    const exportToCsvKeyData = e => {
      e.preventDefault();

      // En-têtes pour chaque colonne
      const headers = ['UserId,calorie,protein,carbohydrate,lipid'];
    
      // Accéder directement à `userActivites`
      const { id, keyData} = user;
    
      // Créer les lignes de données pour le CSV
      const usersCsv = [id, keyData["calorieCount"], keyData["proteinCount"],keyData["carbohydrateCount"],keyData["lipidCount"]].join(',');
      
     
      downloadFile({
        data: [...headers,usersCsv].join('\n'),
        fileName: 'usersKeyData.csv',
        fileType: 'text/csv',
      })
    }
    // const exportNpmCsv=()=>{
    //   const fileName = 'download'
    //  const exportType =  exportFromJSON.types.csv
    //  exportFromJSON({ userAverageSessions, fileName, exportType })
    // }
    console.log(user)
    const { calorieCount= 0, proteinCount= 0, carbohydrateCount =0, lipidCount=0 } = keyData;
    console.log({ calorieCount, proteinCount, carbohydrateCount, lipidCount })
    return(
      
      <>{isDataLoading ? (<Loader/>) : (
        <>
          <Header/>
          <main className="Main__user">
              <Aside/>
              <div className="contenu">
                <Bonjour name={userInfos.firstName}/>
                <section className="contenu2">
                  <div className="contenu2__gauche">
                      <div className="Poid">
                        <Poids data={userActivites.sessions}/>
                      </div>
                      <div className="SousPoid">
                          <Linechar data={userAverageSessions.sessions}/>
                          <SimpleRadarChart data={userPerformance.data} kind={userPerformance.kind}/>
                          <SimpleRadialBarChart data={user}/>
                      </div>
                  </div>
                  <div className="key">
                      <KeyData 
                        imgSource={iconKcal} 
                        namekey="Calories" 
                        valeurkey={`${calorieCount.toLocaleString()}kCal`}
                      />
                      <KeyData 
                        imgSource={iconProt} 
                        namekey="Protines" 
                        valeurkey={`${proteinCount}g`}
                      />
                      <KeyData 
                        imgSource={iconCarb} 
                        namekey="Glucides" 
                        valeurkey={`${carbohydrateCount}g`}
                      />
                      <KeyData 
                        imgSource={iconFat} 
                        namekey="Lipides" 
                        valeurkey={`${lipidCount}g`}
                      />
                  </div>
                </section>
              </div>
              <div className='actionBtns'>
                <button type='button' onClick={exportToJson}>
                  Export to JSON
                 </button>
                 <button type='button' onClick={exportToCsv}>
                    Export to CSV Activité quotidienne
                 </button>
                 <button type='button' onClick={exportToCsvUser}>
                    Export to CSV Score
                 </button>
                 <button type='button' onClick={exportToCsvAverage}>
                    Export to CSV Average
                 </button>
                 <button type='button' onClick={exportToCsvPerformance}>
                    Export to CSV Performance
                 </button>
                 <button type='button' onClick={exportToCsvKeyData}>
                    Export to CSV KeyData
                 </button>
                 {/* <button onClick={exportNpmCsv}>eport csv npm</button> */}
              </div>
          </main>
          </>
          )}
          </>
      )
    

}
export default User