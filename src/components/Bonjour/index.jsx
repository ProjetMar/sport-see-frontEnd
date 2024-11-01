import './style.css'
function Bonjour({name}){
    return(
        <section className="Bonjour">
          <h1 className="Bonjour__titre">Bonjour <span>{name}</span></h1>
          <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </section>
    )
}
export default Bonjour