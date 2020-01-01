import React, { Fragment, useContext, useEffect } from "react";
import loading_url from "../../graphics/loading.gif";
import ContactItem from "./ContactItem";
import ContactForm from "./ContactForm";
import ContactSearch from "./ContactSearch";
import ContactContext from "../../context/contact/contactContext";
const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className="container-fluid pt-5 mt-5 ">
        <div className="row">
          <div className="col-md-5 p-3">
            <ContactForm />
          </div>
          <div className="col-md-7">
            <ContactSearch />
            <div className="row p-3">
              {contacts && contacts.length === 0 ? (
                <h3 className="mt-5 pt-5" style={{ margin: "0 auto" }}>
                  Please Add Some Contacts.
                </h3>
              ) : (
                ""
              )}
              {filtered != null
                ? filtered.map(contact => (
                    <ContactItem key={contact._id} contact={contact} />
                  ))
                : contacts.map(contact => (
                    <ContactItem key={contact._id} contact={contact} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Contacts;
