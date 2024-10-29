import Icone1 from "../../assets/icon1.png"
import Icone2 from "../../assets/icon2.png"
import Icone3 from "../../assets/icon3.png"
import Icone4 from "../../assets/icon4.png"
import "./style.css"
function Aside(){
    return(
        <aside>
            <nav>
                <ul className="Nav__verticale">
                    <li><img src={Icone1} alt="icone1"/></li>
                    <li><img src={Icone2} alt="icone2"/></li>
                    <li><img src={Icone3} alt="icone3"/></li>
                    <li><img src={Icone4} alt="icone4"/></li>
                </ul>
            </nav>
            <p>Copiryght, SportSee 2020</p>
        </aside>
    )
}
export default Aside