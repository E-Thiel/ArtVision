/** @format */

import { useRef, useState, useEffect } from "react";
import "./registersignin.css";



const SignIn = () => {

  //Basic setup for HTML error message
  const [errorMess, setErrorMess] = useState({
    status: false,
    message: "",
  });

  const emailRef = useRef();
  const passwRef = useRef();

  //Component that generates HTML error message
  const ErrorAlert = () => {
    if (errorMess.status === true) {
      return (
        <div>
          <div className="login-alert login-warning">{errorMess.message}</div>
        </div>
      );
    }
  };

  //Function that is activated when the login form is submitted
  const sendLogin = async () => {
    const formData = {
      userName: emailRef.current.value,
      password: passwRef.current.value,
    };

    await fetch("https://artvision.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          alert("Logged in");
            window.localStorage.setItem("key", JSON.stringify(result.key));
        } else if (
          //Updates the HTML error message status and makes it visible
          result.Status === "Invalid username/password" ||
          result.Status === "Invalid inputs"
        ) {
          setErrorMess({ status: true, message: result.Message });
        }
      })
      /*.then((json) => console.log(json));*/
  };

  return (
    <form
      id="access-form"
      onSubmit={(e) => {
        e.preventDefault();
        sendLogin();
      }}
    >
      <h2>Sign in</h2>
      <ErrorAlert />
      <label htmlFor="username">Username</label>
      <input type="string" id="username" ref={emailRef} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" ref={passwRef} />
      <input type="submit" value="Sign in" class="access-form-btn" />
      <span>
        No account yet? <a href="#">Register here</a>
      </span>
    </form>
  );
};

export default SignIn;
