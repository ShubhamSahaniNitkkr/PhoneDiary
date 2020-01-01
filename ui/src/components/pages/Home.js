import React, { Fragment, useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import Contacts from "../contacts/Contacts";

const Home = props => {
  const authContext = useContext(AuthContext);
  if (!authContext.isAuthenticated) props.history.push("/login");

  useEffect(() => {
    authContext.LoadUsers();
    //eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <Contacts />
    </Fragment>
  );
};

export default Home;
