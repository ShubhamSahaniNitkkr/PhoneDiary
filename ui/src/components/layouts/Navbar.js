import React, { useContext, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = ({ title }) => {
  const authContext = useContext(AuthContext);
  const { user, isAuthenticated, Logout } = authContext;
  const guestUsers = (
    <Fragment>
      <Link to="/login" className="btn btn-outline-success">
        <i className="fas fa-sign-in-alt"></i> &nbsp; Login
      </Link>
      <Link to="/register" className="btn btn-outline-primary">
        <i className="fas fa-user-plus"></i> &nbsp; Register
      </Link>
    </Fragment>
  );
  const authUsers = (
    <Fragment>
      <Link to="/login" className="btn btn-outline-success">
        <i className="fas fa-user"></i> &nbsp; Hello {user && user.name}
      </Link>
      <Link to="/logout" className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i> &nbsp; Logout
      </Link>
    </Fragment>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm bg-white rounded">
      <Link className="navbar-brand" to="/">
        <i className="fas fa-address-card fa-2x text-info "></i>
        &nbsp; &nbsp;
        <span className="font-weight-bolder text-info ">{title}</span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/aboutus">
              About Us
            </Link>
          </li>
        </ul>
        <div
          className="btn-group ml-auto"
          role="group"
          aria-label="Basic example"
        >
          {!isAuthenticated ? guestUsers : authUsers}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired
};

Navbar.defaultProps = {
  title: "Your Title"
};

export default Navbar;
