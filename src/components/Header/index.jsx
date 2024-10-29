 import logo from "../../assets/logo.png"
 import "./style.css"
function Header(){
    return(
        <header>
            <img className="logo" src={logo} alt="logo"/>
            <nav>
                <ul className="Nav__horizontale">
                    <li>Accueil</li>
                    <li>Profil</li>
                    <li>Réglage</li>
                    <li>Communauté</li>
                </ul>
            </nav>
        </header>
    )
}
export default Header