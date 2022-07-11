import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import "./signup.css";
import "../login/login.css";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const userInfo = {
      username: username,
      password: password,
      email: email,
      first_name: "",
      last_name: "",
    };

    const result = await fetch("http://localhost:9001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const parsed = await result.json();
    navigate("/login", { replace: true });
  };

  return (
    <div className="page">
      <div className="left-side">
      </div>
      <div className="right-side">
        <span className="logo">Grateful Gardens</span>
        <div>
          <span className="tagline">Food justice community</span>
        </div>
        <div className="pageSwitcherS">
          <NavLink
            to="/login"
            activeClassName="pageSwitcherItem-activeS"
            className="pageSwitcherItemS"
          >
            Sign In
          </NavLink>
          <NavLink
            exact
            to="/signup"
            activeClassName="pageSwitcherItem-activeS"
            className="pageSwitcherItemS"
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
          <input
            type="text"
            id="form3Example1w"
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="formLabel" htmlFor="form3Example1w">
            Username
          </label>
        </div>

        <div className="form-outline">
          <button type="submit" className="button" onClick={handleSignup}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
