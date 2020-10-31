import Axios from "axios";
import React, { useState } from "react";
import {
  NOT_LOGGED_IN,
  LOG_IN_FORM,
  SIGN_UP_FORM,
  LOGGED_IN,
} from "../constants/AuthStatus";

const AppContext = React.createContext();

const AppProvider = (props) => {
  let hostName = "";
  if (process.env.NODE_ENV === "development") {
    hostName = "http://localhost:8000/";
  } else if (process.env.NODE_ENV === "production") {
    hostName = "https://authapi.bob-humphrey.com/";
  }
  const [authStatus, setAuthStatus] = useState(NOT_LOGGED_IN);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userHasAuthenticated, setUserHasAuthenticated] = useState("");

  function changeAuthStatusLogin() {
    setAuthStatus(LOG_IN_FORM);
  }

  function changeAuthStatusSignup() {
    setAuthStatus(SIGN_UP_FORM);
  }

  function handleUserNameInput(changeEvent) {
    let updatedUserName = changeEvent.target.value;
    setUserNameInput(updatedUserName);
  }

  function handleUserEmail(changeEvent) {
    let updatedUserEmail = changeEvent.target.value;
    setUserEmail(updatedUserEmail);
  }

  function handleUserPassword(changeEvent) {
    let updatedUserPassword = changeEvent.target.value;
    setUserPassword(updatedUserPassword);
  }
  
  const signup = () => {
    Axios.defaults.withCredentials = true;
    // CSRF COOKIE
    Axios.get(hostName + "sanctum/csrf-cookie").then(
      (response) => {
        //console.log(response);
        // SIGNUP / REGISTER
        Axios
          .post(hostName + "api/register", {
            name: userNameInput,
            email: userEmail,
            password: userPassword,
          })
          .then(
            (response) => {
              //console.log(response);
              // GET USER
              Axios.get(hostName + "api/user").then(
                (response) => {
                  //console.log(response);
                  setUserId(response.data.id);
                  setUserName(response.data.name);
                  setErrorMessage("");
                  setAuthStatus(LOGGED_IN);
                },
                // GET USER ERROR
                (error) => {
                  setErrorMessage("Could not complete the sign up");
                }
              );
            },
            // SIGNUP ERROR
            (error) => {
              if (error.response.data.errors.name) {
                setErrorMessage(error.response.data.errors.name[0]);
              } else if (error.response.data.errors.email) {
                setErrorMessage(error.response.data.errors.email[0]);
              } else if (error.response.data.errors.password) {
                setErrorMessage(error.response.data.errors.password[0]);
              } else if (error.response.data.message) {
                setErrorMessage(error.response.data.message);
              } else {
                setErrorMessage("Could not complete the sign up");
              }
            }
          );
      },
      // COOKIE ERROR
      (error) => {
        setErrorMessage("Could not complete the sign up");
      }
    );
  };
  const login = () => {
    Axios.defaults.withCredentials = true;
    // CSRF COOKIE
    Axios.get(hostName + "sanctum/csrf-cookie").then(
      (response) => {
        console.log(response);
        // LOGIN
        Axios
          .post(hostName + "api/login", {
            email: userEmail,
            password: userPassword,
          })
          .then(
            (response) => {
              console.log(response);
              // GET USER
              sessionStorage.setItem('_token', response.data.token);
              sessionStorage.setItem('loggedIn', true);
              Axios.get(hostName + "api/user", 
              {
                headers: {
                    "Authorization": 'Bearer ' + sessionStorage.getItem('_token'),
                }
              }
              ).then(
                (response) => {
                  setUserId(response.data.id);
                  setUserName(response.data.name);
                  setErrorMessage("");
                  setAuthStatus(LOGGED_IN);
                },
                // GET USER ERROR
                (error) => {
                  setErrorMessage("Could not complete the login");
                }
              );
            },
            // LOGIN ERROR
            (error) => {
              if (error.response) {
                setErrorMessage(error.response.data.message);
              } else {
                setErrorMessage("Could not complete the login");
              }
            }
          );
      },
      // COOKIE ERROR
      (error) => {
        setErrorMessage("Could not complete the login");
      }
    );
  };

  function logout() {
    Axios.defaults.withCredentials = true;
    const logout = Axios.get(hostName + "api/logout");
    console.log(logout);
    setUserId(0);
    setUserName("");
    setUserNameInput("");
    setUserEmail("");
    setUserPassword("");
    setAuthStatus(NOT_LOGGED_IN);
    setUserHasAuthenticated(false);
    sessionStorage.removeItem('_token');
    sessionStorage.removeItem('loggedIn');
  }

  return (
    <AppContext.Provider
      value={{
        authStatus,
        changeAuthStatusLogin,
        changeAuthStatusSignup,
        userId,
        userName,
        userNameInput,
        userEmail,
        userPassword,
        handleUserNameInput,
        handleUserEmail,
        handleUserPassword,
        signup,
        login,
        logout,
        errorMessage,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
