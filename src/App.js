import { useState } from "react";
import "./App.css";

function App() {

  const [screen, setScreen] = useState("login");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [logs, setLogs] = useState([]);

  const [garageStatusOverrides, setGarageStatusOverrides] = useState({}); // NEW

  const [garages, setGarages] = useState({
    garageA: 70,
    garageB: 30,
    garageC: 10,
    garageD: 5,
    garageH: 2,
    garageI: 0
  });

  // ================= STATUS LOGIC =================
  function getGarageStatus(key, spots){

    // CHECK OVERRIDE FIRST
    if(garageStatusOverrides[key]){
      const status = garageStatusOverrides[key];

      if(status === "empty") return { color: "limegreen", text: "Empty" };
      if(status === "limited") return { color: "goldenrod", text: "Limited" };
      if(status === "full") return { color: "red", text: "Full" };
    }

    // DEFAULT AUTO LOGIC
    if(spots > 50){
      return { color: "limegreen", text: "Empty" };
    } else if(spots > 10){
      return { color: "goldenrod", text: "Limited" };
    } else {
      return { color: "red", text: "Full" };
    }
  }

  // ================= LOGIN =================
  function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("userPass").value;

    let found = users.find(user => user.username === u && user.password === p);

    if(found){
      setCurrentUser(found);

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

    setUsers([
      ...users,
      { username: u, password: p, role: r, favorites: [] }
    ]);

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

    setLogs([...logs, `${currentUser.username} created ${key}`]);
  }

  function deleteGarage(){
    let key = prompt("Enter key like garageA");

    let copy = {...garages};
    delete copy[key];
    setGarages(copy);

    setLogs([...logs, `${currentUser.username} deleted ${key}`]);
  }

  // ================= ADMIN STATUS CHANGE =================
  function updateGarageStatus(key, newStatus){
    setGarageStatusOverrides({
      ...garageStatusOverrides,
      [key]: newStatus
    });

    setLogs([...logs, `${currentUser.username} set ${key} to ${newStatus}`]);
  }

  // ================= FAVORITES =================
  function addFavorite(){
    let g = document.getElementById("garageSelect").value;

    if(!currentUser.favorites.includes(g)){

      const updatedUsers = users.map(user => {
        if(user.username === currentUser.username){
          return {
            ...user,
            favorites: [...user.favorites, g]
          };
        }
        return user;
      });

      setUsers(updatedUsers);

      const updatedCurrent = updatedUsers.find(u => u.username === currentUser.username);
      setCurrentUser(updatedCurrent);

      setLogs([...logs, `${currentUser.username} added favorite ${g}`]);
    }
  }

  function removeFavorite(){
    let g = prompt("Garage to remove");

    const updatedUsers = users.map(user => {
      if(user.username === currentUser.username){
        return {
          ...user,
          favorites: user.favorites.filter(f => f !== g)
        };
      }
      return user;
    });

    setUsers(updatedUsers);

    const updatedCurrent = updatedUsers.find(u => u.username === currentUser.username);
    setCurrentUser(updatedCurrent);

    setLogs([...logs, `${currentUser.username} removed favorite ${g}`]);
  }

  function logout(){
    setCurrentUser(null);
    setScreen("login");
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
                {Object.keys(garages).map(g => {
                  const status = getGarageStatus(g, garages[g]);

                  return (
                    <div key={g}>
                      <p style={{ color: status.color }}>
                        {g.replace("garage", "Garage ")} — {status.text}
                      </p>

                      {/* ADMIN CONTROL */}
                      <select onChange={(e) => updateGarageStatus(g, e.target.value)}>
                        <option value="">Auto</option>
                        <option value="empty">Empty</option>
                        <option value="limited">Limited</option>
                        <option value="full">Full</option>
                      </select>
                    </div>
                  );
                })}
              </article>
            </section>

            <section>
              <h3>Activity Logs</h3>
              <article className="admin">
                {logs.length === 0 && <p>No activity yet</p>}
                {logs.map((log, i) => (
                  <p key={i}>{log}</p>
                ))}
              </article>
            </section>

            <section>
              <button onClick={logout}>Logout</button>
            </section>

          </main>
        </section>
      )}

      {/* USER DASHBOARD */}
      {screen === "user" && currentUser && (
        <section className="screen" id="userDashboard">
          <header>
            <h2>Student Dashboard</h2>
          </header>

          <main>

            <section>
              <h3>Garage Availability</h3>
              <article className="user">
                {Object.keys(garages).map(g => {
                  const status = getGarageStatus(g, garages[g]);
                  return (
                    <p key={g} style={{ color: status.color }}>
                      {g.replace("garage", "Garage ")} — {status.text}
                    </p>
                  );
                })}
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

                {currentUser.favorites.length === 0 && <p>No favorites yet</p>}

                {currentUser.favorites.map(f => (
                  <p key={f}>{f}</p>
                ))}

                <button onClick={addFavorite}>Add Favorite</button>
                <button onClick={removeFavorite}>Remove Favorite</button>

              </article>
            </section>

            <section>
              <button onClick={logout}>Logout</button>
            </section>

          </main>
        </section>
      )}

    </div>
  );
}

export default App;