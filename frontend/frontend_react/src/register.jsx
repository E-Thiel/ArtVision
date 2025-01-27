import { useRef, useState } from "react";
import "./registersignin.css";

const Register = () => {
  //getting values from the form
  const userRef = useRef();
  const emailRef = useRef();
  const passwRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const artistRef = useRef();

  //returns if the 'are you an artist?' has been "checked", for database legibility
  const checkIfArtist = () => {
    if (artistRef.current.checked === true) {
      return "1";
    } else {
      return "0";
    }
  };

  //sets up data to be sent to the database after validation
  const sendRegistration = () => {
    const formData = {
      user_name: userRef.current.value,
      email: emailRef.current.value,
      password: passwRef.current.value,
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      artist: checkIfArtist(),
    };

    fetch("https://art-vision-e0c9a8f9d1d5.herokuapp.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result.Status);
          if (result.Status === "Success") {
            console.log("It's a success!")
          } else (
            console.log("It failed :-(")
          )
        });
    console.log(formData);
  };

  //checks if username is valid

  const verifyUsername = () => {
    if (userRef.current.value === "") {
      return false;
    } else {
      return true;
    }
  };

  //checks if email is valid

  const verifyEmail = () => {
    if (
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(emailRef.current.value) === false
    ) {
      return false;
    } else {
      return true;
    }
  };

  //checks if name is valid

  const verifyName = () => {
    if (nameRef.current.value === "") {
      return false;
    } else {
      return true;
    }
  };

  //pasword validation to be inclduded in general form. Counts the number of requirements fulfilled, and if it is five it returns true

  const passwordValidation = (updatedPassError) => {
    const pwCount = Object.values(updatedPassError).filter(Boolean).length;
    if (pwCount === 5) {
      return true;
    } else {
      return false;
    }
  };

  //sets up password error messages in form HTML. False is when the requirement is not fulfilled
  const [passError, setPassError] = useState({
    characters: false,
    lowerCase: false,
    upperCase: false,
    number: false,
    specChar: false,
  });

  //password validation function for password details (length greater than 8, at least 4 lowercase, at least 2 uppercase, has a number, has a special character)
  const verifyPassword = () => {
    const pWord = passwRef.current.value;
    const numUpper = pWord.length - pWord.replace(/[A-Z]/g, "").length;
    const numLower = pWord.replace(/[A-Z]/g, "").length;
    const hasNumber = /\d/.test(pWord);
    const hasSpecial = /[^A-Za-z0-9]/.test(pWord);

    const updatedPassError = {
      characters: pWord.length > 8,
      lowerCase: numLower >= 4,
      upperCase: numUpper >= 2,
      number: hasNumber,
      specChar: hasSpecial,
    };

    setPassError(updatedPassError);
    return passwordValidation(updatedPassError);
    //console.log(updatedPassError);
  };

  //set up general form validation
  const [formValidation, setFormValidation] = useState({
    user_name: null,
    email: null,
    password: null,
    name: null,
  });

  //validates the form inputs
  const validateForm = () => {
    const validForm = {
      user_name: verifyUsername(),
      email: verifyEmail(),
      password: verifyPassword(),
      name: verifyName(),
    };

    setFormValidation(validForm);
    
    const validCount = Object.values(validForm).filter(Boolean).length;
    console.log(validCount);
    if (validCount === 4){
        console.log("Success, count is " + validCount)
        sendRegistration();
    } else {
        console.log("Failure, count is " + validCount)
    }

  };

  //form validation for both password and general details
  const validateFormAndPw = () => {
    validateForm();
    //verifyPassword();
  };

  return (
    <form
      id="access-form"
      onSubmit={(e) => {
        e.preventDefault();
        validateFormAndPw();
      }}
    >
      <h2>Create your account</h2>

      <label
        htmlFor="username"
        className={
          formValidation.user_name === false
            ? "mandatory-alert mandatory-field"
            : "mandatory-field"
        }
      >
        Username
      </label>
      <input
        type="text"
        id="username"
        ref={userRef}
        className={formValidation.user_name === false ? "mandatory-alert" : ""}
      />
      {formValidation.user_name === false && (
        <span class="mandatory-alert">Enter a username</span>
      )}
      <label
        htmlFor="email"
        className={
          formValidation.email === false
            ? "mandatory-alert mandatory-field"
            : "mandatory-field"
        }
      >
        Email
      </label>
      <input
        type="email"
        id="email"
        ref={emailRef}
        className={formValidation.email === false ? "mandatory-alert" : ""}
      />
      {formValidation.email === false && (
        <span class="mandatory-alert">Enter an email address</span>
      )}

      <label
        htmlFor="name"
        className={
          formValidation.name === false
            ? "mandatory-alert mandatory-field"
            : "mandatory-field"
        }
      >
        Name
      </label>
      <input
        type="text"
        id="name"
        ref={nameRef}
        className={formValidation.name === false ? "mandatory-alert" : ""}
      />
      {formValidation.name === false && (
        <span class="mandatory-alert">Enter your name</span>
      )}

      <label
        htmlFor="password"
        className={
          formValidation.email === false
            ? "mandatory-alert mandatory-field"
            : "mandatory-field"
        }
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        ref={passwRef}
        className={formValidation.email === false ? "mandatory-alert" : ""}
      />
      <ul>
        <li
          className={
            passError.characters === false
              ? "register-incorrect"
              : "register-correct"
          }
        >
          Minimum 9 characters long
        </li>
        <li
          className={
            passError.lowerCase === false
              ? "register-incorrect"
              : "register-correct"
          }
        >
          At least 4 lowercase letters
        </li>
        <li
          className={
            passError.upperCase === false
              ? "register-incorrect"
              : "register-correct"
          }
        >
          At least 2 uppercase letters
        </li>
        <li
          className={
            passError.number === false
              ? "register-incorrect"
              : "register-correct"
          }
        >
          At least 1 number
        </li>
        <li
          className={
            passError.specChar === false
              ? "register-incorrect"
              : "register-correct"
          }
        >
          At least 1 special character
        </li>
      </ul>

      <label htmlFor="phone">Phone</label>
      <input type="text" id="phone" ref={phoneRef} />

      <label htmlFor="address">Address</label>
      <input type="text" id="address" ref={addressRef} />

      <div className="artist-check-container">
        <label htmlFor="artist-check">Are you an artist?</label>
        <input type="checkbox" id="artist-check" ref={artistRef} />
      </div>
      <input type="submit" value="Register" class="access-form-btn" />
    </form>
  );
};

export default Register;
