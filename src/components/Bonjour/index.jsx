import './style.css'
function Bonjour({name}){
    return(
        <section className="Bonjour">
          <h1 className="Bonjour__titre">{`Bonjour ${name}`}</h1>
          <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </section>
    )
}
export default Bonjour