import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Aside from "../../components/Aside";
//import {USER_MAIN_DATA} from "../../data.js";
// import{USER_ACTIVITY} from "../../data.js";
// import {USER_AVERAGE_SESSIONS} from "../../data.js";
// import{USER_PERFORMANCE} from "../../data.js";
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
    if (isDataLoading) {
      return <div>Chargement...</div>; // Affiche un message de chargement
    }
    console.log(user)
    const { calorieCount= 0, proteinCount= 0, carbohydrateCount =0, lipidCount=0 } = keyData;
    console.log({ calorieCount, proteinCount, carbohydrateCount, lipidCount })
      
    return(
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
              
          </main>
          </>
      )
    

}
export default User