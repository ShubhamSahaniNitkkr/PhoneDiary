import React, { useReducer } from "react";
import uuid from "uuid";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: null,
    loading: true,
    error: null
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User
  const LoadUsers = async () => {
    if (localStorage.token) setAuthToken(localStorage.token);

    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response ? error.response.data.msg : "Network Error"
      });
    }
  };

  // Register User
  const Register = async FormData => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        accepts: "application/json"
      }
    };
    try {
      const res = await axios.post("/api/client", FormData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      LoadUsers();
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response ? error.response.data.msg : "Network Error"
      });
    }
  };

  // login User
  const Login = async FormData => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        accepts: "application/json"
      }
    };
    try {
      const res = await axios.post("/api/auth", FormData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      LoadUsers();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response ? error.response.data.msg : "Network Error"
      });
    }
  };

  const Logout = () => dispatch({ type: LOGOUT });
  const ClearErrors = () => dispatch({ type: CLEAR_ERRORS });
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        Register,
        LoadUsers,
        Login,
        Logout,
        ClearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
