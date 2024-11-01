import Header from "../../components/Header"
import Aside from "../../components/Aside";
import UserName from "../../components/UserName";
// import {USER_MAIN_DATA} from "../../data.js";
import './style.css';
import { useState, useEffect } from "react";
function Home() {
  const [users, setUsers] = useState([]);
  const [usersData, setUsersData]=useState([]);
  useEffect(()=>{
    async function fectchUsers(){
      try {
        const response = await fetch('http://localhost:4000/users')
        const usersData = await response.json()
        console.log(usersData.data)
        setUsers(usersData.data);
        console.log(users)
      } catch(err) {
        console.log(err)
      } finally {
      }
    }
    fectchUsers()
    // eslint-disable-next-line
  },[])
  useEffect(() => {
    async function fetchAllUsersData() {
      try {
        const allUsersData = await Promise.all(
          users.map(async (userId) => {
            const response = await fetch(`http://localhost:4000/user/${userId}`);
            const userData = await response.json();
            return userData.data; // Par exemple, les données complètes pour chaque utilisateur
          })
        );
        setUsersData(allUsersData); // Stocker toutes les données récupérées
      } catch (err) {
        console.log("Erreur de récupération des données des utilisateurs:", err);
      }
    }

    if (users.length > 0) {
      fetchAllUsersData();
    }
  }, [users]);
  return (
    <>
    <Header/>
    <main className="Main__home">
      <Aside/>
      {/* <section>
        {USER_MAIN_DATA.map((user)=>(
            <UserName key={user.id}
                  id={user.id}
                  name={user.userInfos.firstName}
            />
        ))}
      </section> */}
      <section>
        {/* {users[0].map((user)=>(
            <UserName key={user.id}
                  id={user.id}
                  name={user.userInfos.firstName}
            />
        ))} */}
        {usersData.map((user) => (
          <UserName key={user.id}
          id={user.id}
          name={user.userInfos.firstName}
          />
        ))}
      </section>
    </main>
    </>
  );
}

export default Home;