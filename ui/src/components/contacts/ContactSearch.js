import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactSearch = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef("");
  const { filterContacts, clearfilter, filtered } = contactContext;
  useEffect(() => {
    if (filtered == null) {
      text.current.value = "";
    }
  });
  const onChange = e => {
    text.current.value !== "" ? filterContacts(e.target.value) : clearfilter();
  };
  return (
    <div className="col-md-12">
      <input
        type="text"
        className="form-control col-md-12 mt-3 p-3 shadow-sm p-3 mb-3 bg-white rounded"
        ref={text}
        id="searchContact"
        aria-describedby="searchHelp"
        onChange={onChange}
        placeholder="Search with Name, Phone or Email."
      />
    </div>
  );
};

export default ContactSearch;
