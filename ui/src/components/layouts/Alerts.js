import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div
        className={`alert mt-5 pt-4 alert-${alert.type} zindex-popover`}
        role="alert"
        key={`${alert.type}`}
        style={{ zIndex: "3" }}
      >
        <i className={`far fa-bell text-${alert.type}`}></i> &nbsp;
        {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
