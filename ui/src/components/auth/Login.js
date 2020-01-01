import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { Login, error, ClearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) props.history.push("/");
    if (error) {
      setAlert(error, "danger");
      ClearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const { email, password } = user;
  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const onsubmit = e => {
    e.preventDefault();
    Login({
      email,
      password
    });
  };
  return (
    <div className="container-fluid pt-5">
      <form onSubmit={onsubmit}>
        <div
          className="card mt-5 p-3 shadow bg-white rounded"
          style={{ width: "19rem", margin: "0 auto" }}
        >
          <i className="fas fa-sign-in-alt fa-5x text-success text-center"></i>
          <p className="text-center text-success">Log in</p>
          <label htmlFor="inputEmail">
            <i className="fas fa-at text-primary"></i>&nbsp;Email :
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            value={email}
            name="email"
            onChange={onChange}
          />
          <br />
          <label htmlFor="inputPassword3">
            <i className="fas fa-key text-primary"></i>&nbsp;Password :
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword3"
            value={password}
            name="password"
            onChange={onChange}
          />
          <br />
          <button type="submit" className="btn btn-success">
            <i className="fas fa-sign-in-alt"></i> &nbsp; Log in
          </button>
          <br />
          <Link to="./Register" className="btn btn-outline-primary">
            <i className="fas fa-user-plus "></i> &nbsp; Register insted
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
