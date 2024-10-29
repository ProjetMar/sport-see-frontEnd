import './style.css'
function KeyData({imgSource, namekey, valeurkey}){
    return(
        <div className="KeyData">
            <img src={imgSource} alt={namekey}/>
            <div>
                <p className='keyData__valeur'>{valeurkey}</p>
                <p className='keyData__name'>{namekey}</p>
            </div>
        </div>
    )
}
export default KeyData