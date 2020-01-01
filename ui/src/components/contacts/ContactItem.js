import React, { useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
import PropTypes from "prop-types";

import userpic from "../../graphics/user.jpg";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { _id, name, phone, email, type } = contact;
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };
  return (
    <div className="card mx-auto shadow-sm p-3 mb-5 bg-white rounded col-md-5">
      <img src={userpic} className="card-img-top" alt="..." />
      <ul className="list-group list-group-flush">
        {name && (
          <li className="list-group-item visible-xs-inline text-capitalize">
            <i className="far fa-user text-primary"></i> &nbsp;Name : {name}
          </li>
        )}

        {email && (
          <li className="list-group-item visible-xs-inline">
            <i className="fas fa-at text-info"></i>&nbsp;Email : {email}
          </li>
        )}

        {phone && (
          <li className="list-group-item visible-xs-inline text-capitalize">
            <i className="fas fa-mobile-alt text-primary"></i> &nbsp;Phone :
            {phone}
          </li>
        )}

        {type && (
          <li className="list-group-item visible-xs-inline text-capitalize">
            Type: &nbsp;
            <span
              className={type === "personal" ? "text-info" : "text-warning"}
            >
              {type === "work" && <i className="fas fa-briefcase"></i>}
              {type === "personal" && <i className="fas fa-user-friends"></i>}
              &nbsp;
              {type}
            </span>
          </li>
        )}
      </ul>
      <div className="card-body">
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => setCurrent(contact)}
        >
          <i className="fas fa-user-edit"></i>
          &nbsp; Edit
        </button>
        &nbsp; &nbsp;
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={onDelete}
        >
          <i className="fas fa-user-times"></i>
          &nbsp; Delete
        </button>
      </div>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
