import React, { useReducer } from "react";
import axios from "axios";
import ContactReducer from "./contactReducer";
import ContactContext from "./contactContext";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  ERROR_CONTACT,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  SET_ALERT,
  REMOVE_ALERT
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null
  };
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // get contact
  const getContacts = async contact => {
    try {
      const res = await axios.get("/api/contacts", contact);
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: ERROR_CONTACT, payload: err.response.msg });
    }
  };

  // add contact
  const addContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: ERROR_CONTACT, payload: err.response.msg });
    }
  };

  // delete contact
  const deleteContact = async id => {
    try {
      const res = await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: ERROR_CONTACT, payload: err.response.msg });
    }
  };

  // // delete contact
  // const deleteContact = id => {
  //   dispatch({ type: DELETE_CONTACT, payload: id });
  // };

  // clear contacts on logout
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // set Current contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // clear Current contact
  const clearCurrent = () => {
    dispatch({ type: SET_CURRENT });
  };

  // update contact
  // const updateContact = contact => {
  //   dispatch({ type: UPDATE_CONTACT, payload: contact });
  // };

  // update contact
  const updateContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: ERROR_CONTACT, payload: err.response.msg });
    }
  };

  // filter contact
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // clear filter contact
  const clearfilter = text => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        clearContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearfilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
