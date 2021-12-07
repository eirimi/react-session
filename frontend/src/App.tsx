import React, { createContext, useContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const loginUrl = "http://localhost:8080/login";
const logoutUrl = "http://localhost:8080/logout";

const IsLoggedIn = createContext(
  {} as {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

const LoginButton = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedIn);
  const login = () => {
    fetch(loginUrl, { method: "POST", credentials: "include" })
      .then((response) => {
        console.log(response);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return <input type="button" value="Login" onClick={login} />;
};
const LogoutButton = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedIn);
  const logout = () => {
    fetch(logoutUrl, { method: "GET" })
      .then((response) => {
        console.log(response);
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoggedIn(false);
      });
  };
  return <input type="button" value="Logout" onClick={logout} />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value = {
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <IsLoggedIn.Provider value={value}>
          {isLoggedIn ? (
            <LogoutButton></LogoutButton>
          ) : (
            <LoginButton></LoginButton>
          )}
        </IsLoggedIn.Provider>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
