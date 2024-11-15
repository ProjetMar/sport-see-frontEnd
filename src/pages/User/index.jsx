import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Aside from "../../components/Aside";
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
import { fetchUserInfo, fetchUserActivities, fetchAverageSessions, fetchUserPerformance } from "../../services/userService.js"
import { exportToJson, exportToCsv,  exportToCsvUser, exportToCsvAverage, exportToCsvPerformance, exportToCsvKeyData} from "../../utils/fileExport";
import { useState, useEffect } from "react";
// import exportFromJSON from 'export-from-json';

function User(){
    const {id} = useParams()
    console.log(id)
    const [user, setUser]=useState({})
    const [userActivites, setUserActivies]=useState({});
    const[userAverageSessions, setUserAverageSessions]= useState([]);
    const [userPerformance, setUserPerformance]=useState([]);
    const [isDataLoading, setDataLoading] = useState(false);
      // États pour keyData et userInfos
    const [keyData, setKeyData] = useState({});
    const [userInfos, setUserInfos] = useState({});
    useEffect(() => {
      async function loadData() {
          setDataLoading(true);
          try {
              const userData = await fetchUserInfo(id);
              setUser(userData);
              setKeyData(userData.keyData);
              setUserInfos(userData.userInfos);
              
              const activities = await fetchUserActivities(id);
              setUserActivies(activities);

              const averageSessions = await fetchAverageSessions(id);
              setUserAverageSessions(averageSessions);

              const performance = await fetchUserPerformance(id);
              setUserPerformance(performance);
            } catch (err) {
                console.error(err);
            } finally {
                setDataLoading(false);
            }
        }
        loadData();
    }, [id]);

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
                <button type='button' onClick={() => exportToJson(userActivites)}>
                  Export to JSON
                 </button>
                 <button type='button' onClick={()=>exportToCsv(userActivites)}>
                    Export to CSV Activité quotidienne
                 </button>
                 <button type='button' onClick={()=>exportToCsvUser(user)}>
                    Export to CSV Score
                 </button>
                 <button type='button' onClick={()=>exportToCsvAverage(userAverageSessions)}>
                    Export to CSV Average
                 </button>
                 <button type='button' onClick={()=>exportToCsvPerformance(userPerformance)}>
                    Export to CSV Performance
                 </button>
                 <button type='button' onClick={()=>exportToCsvKeyData(user)}>
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