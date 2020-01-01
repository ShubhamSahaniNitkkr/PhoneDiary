import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { Register, error, ClearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) props.history.push("/");
    if (error) {
      setAlert(error, "danger");
      ClearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { name, email, password, password2 } = user;
  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const onsubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password does not match !", "danger");
    } else {
      Register({ name, email, password });
      if (!error) setAlert("Registered !", "success");
    }
  };
  return (
    <div className="container-fluid pt-5">
      <form onSubmit={onsubmit}>
        <div
          className="card mt-5 p-3 shadow bg-white rounded"
          style={{ width: "19rem", margin: "0 auto" }}
        >
          <i className="fas fa-user-plus fa-5x text-center text-primary"></i>
          <p className="text-center text-primary">Register</p>
          <label htmlFor="inputName">
            <i className="far fa-user text-primary"></i> &nbsp;Name :
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            value={name}
            name="name"
            onChange={onChange}
          />
          <br />

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
            minLength="6"
          />
          <br />

          <label htmlFor="inputPassword33">
            <i className="fas fa-key text-primary"></i>&nbsp;Confirm Password :
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword33"
            value={password2}
            name="password2"
            onChange={onChange}
            minLength="6"
          />
          <br />
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-user-plus"></i> &nbsp; Register
          </button>
          <br />
          <Link to="./Login" className="btn btn-outline-success">
            <i className="fas fa-sign-in-alt"></i> &nbsp; Login instead
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
