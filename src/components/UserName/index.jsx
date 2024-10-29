import { Link } from "react-router-dom"
function UserName({id, name}){
    return(
    <Link to={`/user/${id}`}> 
          <p>{name}</p>
    </Link>
    )
}
export default UserName