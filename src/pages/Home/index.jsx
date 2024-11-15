import Header from "../../components/Header"
import Aside from "../../components/Aside";
import UserName from "../../components/UserName";
import {fetchUsers } from "../../services/homeService.js";
// import {USER_MAIN_DATA} from "../../data.js";
import './style.css';
import { useState, useEffect } from "react";
function Home() {
  const [users, setUsers] = useState([]);
  // const [usersData, setUsersData]=useState([]);
  useEffect(() => {
    async function loadData() {
        try {
            const usersData = await fetchUsers();
            setUsers(usersData);
          } catch (err) {
              console.error(err);
          } finally {
          }
      }
      loadData();
  }, []);
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
        {users.map((user) => (
          <UserName key={user[0].id}
          id={user[0].id}
          name={user[0].firstName}
          />
        ))}
      </section>
    </main>
    </>
  );
}

export default Home;