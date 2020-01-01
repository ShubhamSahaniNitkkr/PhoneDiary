import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { current, addContact, clearCurrent, updateContact } = contactContext;
  useEffect(() => {
    if (current != null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "work"
      });
    }
  }, [contactContext, current]);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "work"
  });
  const [addedFlag, setAddedFlag] = useState(false);

  const { name, email, phone, type } = contact;
  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    setAddedFlag(true);
    setTimeout(function() {
      setAddedFlag(false);
      clearAll();
    }, 3000);
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <div className="card shadow-sm p-1 mb-5 bg-white rounded">
      <div className="card-body">
        <h5 className="card-title">{current ? "Edit" : "Add"} Contact</h5>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="nameField">Name</label>
            <input
              type="text"
              className="form-control"
              id="nameField"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="emailField">Email</label>
            <input
              type="email"
              className="form-control"
              id="emailField"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="numberField">Phone Number</label>
            <input
              type="number"
              className="form-control"
              id="numberField"
              name="phone"
              value={phone}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phonenumbertype">Type</label>
            <select
              className="form-control"
              id="phonenumbertype"
              name="type"
              value={type === "personal" ? "personal" : "work"}
              onChange={onChange}
            >
              <option name="type" value="personal">
                Personal
              </option>
              <option name="type" value="work">
                Work
              </option>
            </select>
          </div>

          <br />
          {addedFlag ? (
            <button
              type="button"
              className={current ? "btn btn-warning" : "btn btn-success"}
            >
              <i className="fas fa-user-check"></i> &nbsp; Contact{" "}
              {current ? "Updated" : "Added"}
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              {current ? (
                <i className="fas fa-user-edit"></i>
              ) : (
                <i className="fas fa-user-plus"></i>
              )}
              &nbsp; {current ? "Edit" : "Add"} Contact
            </button>
          )}
          <span>&nbsp;</span>
          {current && (
            <button type="button" className="btn btn-dark" onClick={clearAll}>
              <i className="fas fa-undo-alt"></i>
              &nbsp; Clear{" "}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
