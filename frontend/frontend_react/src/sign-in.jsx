import { useRef, useState, useEffect } from "react";
import "./registersignin.css";

const LSKEY = "ArtVision";

const SignIn = () => {
  //Basic setup for HTML error message
  const [errorMess, setErrorMess] = useState({
    status: false,
    message: ""
  });

  const emailRef = useRef();
  const passwRef = useRef();

  //Component that generates HTML error message
  const ErrorAlert = () => {
    if (errorMess.status === true) {
      return (
          <div className="login-alert">{errorMess.message}</div>
      );
    }
  };

  //Function that is activated when the login form is submitted
  const sendLogin = async () => {
    const formData = {
      userName: emailRef.current.value,
      password: passwRef.current.value,
    };

    fetch("https://art-vision-e0c9a8f9d1d5.herokuapp.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          //Stores in local storage
          localStorage.setItem(LSKEY + ".key", JSON.stringify(result.key));
          //Creates cookie
          document.cookie = `tokenKey=${JSON.stringify(
            result.key
          )}; expires=${new Date(Date.now() + 120 * 1000).toUTCString()}`;
          //Redirects to homepage
          window.location.href = "/home";
        } else if (
          //Updates the HTML error message status and makes it visible
          result.Status === "Invalid username/password" ||
          result.Status === "Invalid inputs"
        ) {
          setErrorMess({ status: true, message: result.Message });
        }
      });
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
        No account yet? <a href="/register">Register here</a>
      </span>
    </form>
  );
};

export default SignIn;
