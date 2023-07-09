import { useRef, useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import Topbar from "../scenes/Globals/Topbar";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "./register.css";

import axios from "../api/axios";
import logoImg from "../data/news.png"

const LOGIN_URL = "/auth";

const Login = (props) => {
  const { setAuth } = useAuth;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      console.log(roles[0]);
      props.setCurrRole(roles[0]);
      // setAuth({ user, pwd, roles, accessToken });

      // navigate('/dashboard')
      // console.log(user,pwd);
      localStorage.setItem("userName", user);
      localStorage.setItem("currRole", roles[0]);
      setUser("");
      setPwd("");
      navigate("/dashboard");
      // navigate(from, { replace: true });
      // setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      // errRef.current.focus();
    }
  };

  return (
    <main className="content">
      {/* <Topbar  /> */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{
          backgroundColor: "#0d0d0d",
          border: "10 px solid black",
          borderRadius: "20px",
          marginTop: "50px",
          flexWrap:"wrap"
        }}
      >
        <img
          src={logoImg}
          alt="image"
          style={{ height: "300px", marginRight: "50px", borderRadius: "20px" }}
        />

        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Velour AI Inc.</h1>
          <h1>LogIn</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Login</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Sign Up
              </a>
            </span>
          </p>
        </section>
      </Box>
    </main>
  );
};

export default Login;
