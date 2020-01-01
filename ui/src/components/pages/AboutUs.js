import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";

const AboutsUs = props => {
  const authContext = useContext(AuthContext);
  if (!authContext.isAuthenticated) props.history.push("/login");
  return (
    <div className="alert alert-warning" role="alert">
      Abouts us!
    </div>
  );
};

export default AboutsUs;
