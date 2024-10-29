import Header from "../../components/Header"
import Aside from "../../components/Aside";
import UserName from "../../components/UserName";
import {USER_MAIN_DATA} from "../../data.js";
import './style.css'
function Home() {
  return (
    <>
    <Header/>
    <main className="Main__home">
      <Aside/>
      <section>
        {USER_MAIN_DATA.map((user)=>(
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