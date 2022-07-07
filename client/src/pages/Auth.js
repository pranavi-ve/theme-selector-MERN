import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { registerUser, loginUser } from "../actions/users.action";
import { useNavigate, useLocation } from "react-router-dom";
export const Auth = () => {
  const initialState = {
    email: "",
    username: "",
    password: "",
    cfpassword: "",
  };
  const [user, setUser] = useState(initialState);
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const search = useLocation().search;
  const page = new URLSearchParams(search).get("page");

  const handleSubmit = (e) => {
    e.preventDefault();
    //showerrormessage
    const error = validate();
    if (error) {
      setError(error);
      return;
    }
    isSignUp() ? registerApi() : loginApi();
  };
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const validate = () => {
    if (!isSignUp()) return false;
    if (user.password !== user.cfpassword) {
      return "password doesnot match";
    }
  };

  const isSignUp = () => page === "signup";
  const getFooterLink = () => {
    const footerText = {
      label: "New User?",
      to: "signup",
      clickText: "Sign Up",
    };
    if (isSignUp()) {
      footerText.label = "Already registered?";
      footerText.to = "login";
      footerText.clickText = "Log In";
    }
    return (
      <div>
        <label>{footerText.label}</label>
        <span
          onClick={() =>
            navigate(`/auth?page=${footerText.to}`, {
              replace: true,
            })
          }
          className="link"
        >
          {footerText.clickText}
        </span>
      </div>
    );
  };

  const registerApi = () => {
    registerUser(dispatch, user);
  };
  const loginApi = () => {
    loginUser(dispatch, {
      username: user.username,
      password: user.password,
    });
  };

  useEffect(() => {
    setUser(initialState);
  }, [page]);
  return (
    <div className="form-wrapper">
      <form autoValidate onSubmit={handleSubmit} className="login-form" >
        <h2>{isSignUp() ? "Sign Up" : "Log In"}</h2>
        {isSignUp() && (
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            minLength="5"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        {isSignUp() && (
          <div className="form-group">
            <label htmlFor="cfpassword">Confirm Password</label>
            <input
              type="password"
              name="cfpassword"
              id="cfpassword"
              value={user.cfpassword}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button type="submit">Submit</button>
        {getFooterLink()}
        {error && <div className="err-msg">{error}</div>}
      </form>
    </div>
  );
};
