import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

const Logout = props => {
  const authContext = useContext(AuthContext);
  const contactsContext = useContext(ContactContext);

  useEffect(() => {
    authContext.Logout();
    contactsContext.clearContacts();
    //eslint-disable-next-line
  }, []);
  if (!authContext.isAuthenticated) props.history.push("/login");

  return null;
};

export default Logout;
