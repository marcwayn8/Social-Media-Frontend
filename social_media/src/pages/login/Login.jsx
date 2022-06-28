import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AppContext from "../../context/appContext";
import "./login.css";

export default function Login({ setAuth }) {
  const { setUser, setIsAuth, isAuth } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };

    async function loginUser() {
      const res = await fetch(`http://localhost:9001/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (!data.token) {
        setIsAuth(false);
        return;
      }

      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem('currUser', JSON.stringify(data.user));
      setIsAuth(true);
      setUser(data.user);
      navigate('/');
    }
    
    loginUser();
    setEmail("");
    setPassword("");
  };

  return (
    <div className="page">
      <div className="left-side"></div>
      <div className="right-side">
        <span className="logo">Trip by Trip</span>
        <div>
          <span className="tagline">Food justice community</span>
        </div>
        <div className="pageSwitcherL">
          <NavLink
            to="/login"
            activeClassName="pageSwitcherItem-activeL"
            className="pageSwitcherItemL"
          >
            Sign In
          </NavLink>
          <NavLink
            exact
            to="/signup"
            activeClassName="pageSwitcherItem-activeL"
            className="pageSwitcherItemL"
          >
            Sign Up
          </NavLink>
        </div>
        <div className="form-outline">
          <input
            type="email"
            id="form3Example1w"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="formLabel" htmlFor="form3Example1w ">
            Email
          </label>
        </div>

        <div className="form-outline">
          <input
            type="password"
            id="form3Example1w"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="formLabel" htmlFor="form3Example1w">
            Password
          </label>
        </div>

        <div className="form-outline">
          <button type="submit" className="button" onClick={handleLogin}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
