import { useState } from "react";
import "./App.css";

function App() {

  const [screen, setScreen] = useState("login");
  const [users, setUsers] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [garages, setGarages] = useState({
    garageA: 70,
    garageB: 30,
    garageC: 10,
    garageD: 5,
    garageH: 2,
    garageI: 0
  });

  // ================= GARAGE COLOR LOGIC =================
  function getGarageColor(spots){
    if(spots >= 50) return "green";
    if(spots >= 20) return "yellow";
    return "red";
  }

  // ================= LOGIN =================
  function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("userPass").value;

    let found = users.find(user => user.username === u && user.password === p);

    if(found){
      if(found.role === "admin"){
        setScreen("admin");
      } else {
        setScreen("user");
      }
    } else {
      alert("User not found");
    }
  }

  // ================= CREATE USER =================
  function createUser(){
    let u = document.getElementById("createUsername").value;
    let p = document.getElementById("createPass").value;
    let r = document.getElementById("roleSelect").value;

    if(users.some(user => user.username === u)){
      alert("Duplicate username");
      return;
    }

    setUsers([...users, { username: u, password: p, role: r }]);
    setScreen("login");
  }

  // ================= ADMIN GARAGE CRUD =================
  function createGarage(){
    let letter = prompt("Garage letter (E, F, etc)");
    if(!letter) return;

    let key = "garage" + letter.toUpperCase();

    setGarages({
      ...garages,
      [key]: 50
    });
  }

  function deleteGarage(){
    let key = prompt("Enter key like garageA");
    let copy = {...garages};
    delete copy[key];
    setGarages(copy);
  }

  // ================= FAVORITES =================
  function addFavorite(){
    let g = document.getElementById("garageSelect").value;

    if(!favorites.includes(g)){
      setFavorites([...favorites, g]);
    }
  }

  function removeFavorite(){
    let g = prompt("Garage to remove");
    setFavorites(favorites.filter(f => f !== g));
  }

  return (
    <div>

      {/* LOGIN */}
      {screen === "login" && (
        <section className="screen" id="loginScreen">
          <header>
            <h1>Capital Parking</h1>
            <h2>Login</h2>
          </header>

          <main>
            <section>
              <article>
                <label>Username</label>
                <input id="username"/>

                <label>Password</label>
                <input id="userPass" type="password"/>

                <button onClick={login}>Login</button>
                <button onClick={() => setScreen("register")}>Create Account</button>
              </article>
            </section>
          </main>
        </section>
      )}

      {/* REGISTER */}
      {screen === "register" && (
        <section className="screen" id="registerScreen">
          <header>
            <h2>Create Account</h2>
          </header>

          <main>
            <section>
              <article>
                <label>Username</label>
                <input id="createUsername"/>

                <label>Password</label>
                <input id="createPass" type="password"/>

                <label>Account Type</label>
                <select id="roleSelect">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>

                <button onClick={createUser}>Create</button>
                <button onClick={() => setScreen("login")}>Back</button>
              </article>
            </section>
          </main>
        </section>
      )}

      {/* ADMIN DASHBOARD */}
      {screen === "admin" && (
        <section className="screen" id="adminDashboard">
          <header>
            <h2>Administrator Dashboard</h2>
          </header>

          <main>

            <section>
              <h3>Garage Management (CRUD)</h3>
              <article className="admin">
                <button onClick={createGarage}>Create Garage</button>
                <button onClick={deleteGarage}>Delete Garage</button>
              </article>
            </section>

            <section>
              <h3>Garages</h3>
              <article className="admin">
                {Object.keys(garages).map(g => (
                  <p key={g} style={{ color: getGarageColor(garages[g]) }}>
                    {g.replace("garage", "Garage ")} – {garages[g]} spots
                  </p>
                ))}
              </article>
            </section>

            <section>
              <button onClick={() => setScreen("login")}>Logout</button>
            </section>

          </main>
        </section>
      )}

      {/* USER DASHBOARD */}
      {screen === "user" && (
        <section className="screen" id="userDashboard">
          <header>
            <h2>Student Dashboard</h2>
          </header>

          <main>

            <section>
              <h3>Garage Availability</h3>
              <article className="user">

                {Object.keys(garages).map(g => (
                  <p key={g} style={{ color: getGarageColor(garages[g]) }}>
                    {g.replace("garage", "Garage ")} – {garages[g]} spots
                  </p>
                ))}

              </article>
            </section>

            <section>
              <h3>Favorites</h3>
              <article className="user">

                <select id="garageSelect">
                  {Object.keys(garages).map(g => (
                    <option key={g}>
                      {g.replace("garage", "Garage ")}
                    </option>
                  ))}
                </select>

                {favorites.length === 0 && <p>No favorites yet</p>}
                {favorites.map(f => <p key={f}>{f}</p>)}

                <button onClick={addFavorite}>Add Favorite</button>
                <button onClick={removeFavorite}>Remove Favorite</button>

              </article>
            </section>

            <section>
              <button onClick={() => setScreen("login")}>Logout</button>
            </section>

          </main>
        </section>
      )}

    </div>
  );
}

export default App;