import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { clearLocalStorage, getToken } from "../helpers/utils";
import { getPreferences, savePreferences } from "../actions/users.action";
import { UserContext } from "../context/user.context";
import { Dropdown } from "../components/Dropdown";
export const Home = () => {
  const token = getToken().theme;
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(token || "blue");
  const handleAuthClick = () => {
    clearLocalStorage("token");
    navigate(`/auth?page=login`, {
      replace: true,
    });
  };
  const handleThemeChange = (val) => {
    savePreferences(dispatch, { theme: val }).then(() => {
      getPreferences(dispatch).then(() => {
        const theme = getToken().theme;
        setTheme(theme || "blue");
      });
    });
  };
  useEffect(()=>{
    getPreferences(dispatch).then(() => {
      const theme = getToken().theme;
      setTheme(theme || "blue");
    });
    },[]);
  return (
    <div className={`main-container ${theme|| ''}`}>
      <header>
        <nav className="nav-bar">
          <h1>Theme-Selector</h1>
          <div className="d-flex align-center">
            <div className="d-flex mx-15 align-center">
              <label className="mx-5">Choose Color</label>
              <Dropdown {...theme} onChange={handleThemeChange}/>
            </div>
            <button onClick={handleAuthClick}>{"Log Out"}</button>
          </div>
        </nav>
      </header>
      <main>
        <h2>Hi!</h2>
        <div>You have chosen theme {theme}</div>
      </main>
    </div>
  );
};
