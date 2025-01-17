/** @format */

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

  //array for database
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    artist: "",
  });


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
    setFormData({
      user_name: userRef.current.value,
      email: emailRef.current.value,
      password: passwRef.current.value,
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      artist: checkIfArtist(),
    });
  };

  //set up general form validation
  const [formValidation, setFormValidation] = useState(null);

  //sets up password error messages in form HTML. False is when the requirement is not fulfilled
  const [passError, setPassError] = useState({
    characters: false,
    lowerCase: false,
    upperCase: false,
    number: false,
    specChar: false,
  });

  //password validation function
const verifyPassword = () => {
    const passCopy = passError;
    const pWord = passwRef.current.value;
    const numUpper = pWord.length - pWord.replace(/[A-Z]/g, "").length;
    const numLower = pWord.replace(/[A-Z]/g, "").length;
    const hasNumber = /\d/.test(pWord);
    const hasSpecial = /[^A-Za-z0-9]/.test(pWord);

    //checks it more than 8 characters
    if (pWord.length <= 8) {
        passCopy.characters = false;
    } else { passCopy.characters = true; }
    //checks if there are at least four lowercase characters
    if (numLower < 4) {
        passCopy.lowerCase = false
    } else { passCopy.lowerCase = true; }
    //checks if there are at lest two uppercase characters
    if (numUpper < 2) {
        passCopy.upperCase = false
    } else { passCopy.upperCase = true; }
    //checks if there is a number
    if (hasNumber === false) {
        passCopy.number = false
    } else { passCopy.number = true; }
    //checks if there is a special character
    if (hasSpecial === false) {
        passCopy.specChar = false
    } else {passCopy.specChar = true}

    setPassError(passCopy);
    console.log(passCopy);
}
  //validates the form inputs
  const validateForm = () => {

    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(
      emailRef.current.value
    );
    const phonePattern = "";
    
    if (emailPattern === false) {
      alert("not a valid email address");
    }
    if (nameRef.current.value === "") {
      alert("Put down your name");
    }
  };

  return (
    <form
      id="access-form"
      onSubmit={(e) => {
        e.preventDefault();
        e.verifyPassword();
        //sendRegistration();
        //validateForm();
      }}
    >
      <h2>Create your account</h2>

      <label htmlFor="username" className="mandatory-field">
        Username
      </label>
      <input type="text" id="username" ref={userRef} />

      <label htmlFor="email" className="mandatory-field">
        Email
      </label>
      <input type="email" id="email" ref={emailRef} />

      <label htmlFor="name" className="mandatory-field">
        Name
      </label>
      <input type="text" id="name" ref={nameRef} />

      <label htmlFor="password" className="mandatory-field">Password</label>
      <input type="password" id="password" ref={passwRef} />
      <ul>
        <li className={passError.characters === false ? "register-incorrect" : "register-correct"}>Minimum 9 characters long</li>
        <li>At least 4 lowercase letters</li>
        <li>At least 2 uppercase letters</li>
        <li>At least 1 number</li>
        <li>At least 1 special character</li>
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
