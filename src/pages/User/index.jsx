import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Aside from "../../components/Aside";
import {USER_MAIN_DATA} from "../../data.js";
import{USER_ACTIVITY} from "../../data.js";
import {USER_AVERAGE_SESSIONS} from "../../data.js";
import{USER_PERFORMANCE} from "../../data.js";
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

function User(){
    const {id} = useParams()
    console.log(id)
    const user = USER_MAIN_DATA.find(item => item.id === Number(id));
    const dataPoid = USER_ACTIVITY.find(item => item.userId === Number(id));
    const dataAverage = USER_AVERAGE_SESSIONS.find(item => item.userId === Number(id))
    const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = user.keyData;
    const dataRadar = USER_PERFORMANCE.find(item => item.userId === Number(id))
    console.log(user)
    return(<>
        <Header/>
        <main className="Main__user">
            <Aside/>
            <div className="contenu">
              <Bonjour name={user.userInfos.firstName}/>
              <section className="contenu2">
                <div className="contenu2__gauche">
                    <div className="Poid">
                      <Poids data={dataPoid.sessions}/>
                    </div>
                    <div className="SousPoid">
                        <Linechar data={dataAverage.sessions}/>
                        <SimpleRadarChart data={dataRadar.data} kind={dataRadar.kind}/>
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