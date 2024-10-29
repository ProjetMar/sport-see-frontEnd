import Header from "./components/Header"
import './App.css';
import Aside from "./components/Aside";
import { Link } from "react-router-dom"
function App({id, name}) {
  return (
    <>
    <Header/>
    <Aside/>
    <Link to={`pages/User/${id}`}> 
          <p>{name}</p>
    </Link>
    </>
  );
}

export default App;
