import './App.css';
import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import { createInteraction } from "./services/logs-service";

function navWithClickLog(data={}) {

  // log interaction
  let interaction = {
    username: window.localStorage.getItem('user'),
    data: JSON.stringify(data)
  }

  createInteraction(interaction)
    .then(window.history.back
    )
    .catch(e => console.log(e))

}

function Login(props) {

  let [pass, setPass] = useState("");

  let style = {
    label: {
      display: "block",
      fontSize: ".75rem",
      marginBottom: "4pt"
    },
    inputBlock: {
      width: "100%",
    },
    input: {
      width: "100%",
      padding: "10pt 4pt",
      borderRadius: "5pt",
      border: 'none',
    },
    main: {
      color: "white",
      padding: "20pt",
      border: "1px solid gray",
      borderRadius: "10pt"
    },
    button: {
      width: "100%",
      padding: "15pt",
      backgroundColor: "rgb(100, 200, 230)",
      border: "none",
      color: "white",
      cursor: "pointer",
      borderRadius: "5pt",
    }
  }
  
  let pwLookup = {
    "abc123": "v1",
    "catdog": "v2",
    "thanks": "v3",
    "goodie": "v4",
  }

  return (
    <main style={style.main}>
    <h1>Log in</h1>
    <div style={style.inputBlock}>
      <label style={style.label} htmlFor="user">Username</label>
      <input style={style.input} name="user" onChange={e => props.setUser(e.target.value)} type="text" placeholder="ex: user01929"/>
    </div>
    <div style={style.inputBlock}>
      <label style={style.label} htmlFor="pass">Password</label>
      <input style={style.input} name="pass" onChange={e => setPass(e.target.value)} type="password"/>
    </div>
    <button type="submit" style={style.button} onClick={_ => {
        let path = pwLookup[pass]
        if (!path) {
          path = "v1"
        }
      
        createInteraction({ username: props.user, version: pwLookup[pass], data: "leaked" } )
        .then(navWithClickLog())
        .catch(e => console.log(e))

    }}>Login</button>
  </main>
  )
}

function App() {
  let [user, setUser] = useState("")
  let login = <Login setUser={setUser} user={user}/>
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={login}/>
          <Route exact path='/login' element={login}/>
        </Routes>
      </BrowserRouter>
  );
}



export default App;
