import { useRef, useState } from 'react'
import './registersignin.css'


const Register = () => {


const userRef = useRef();
const emailRef = useRef();
const passwRef = useRef();
const nameRef = useRef();
const phoneRef = useRef();
const addressRef = useRef();
const artistRef = useRef();


const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    artist: '',
});


const checkIfArtist = () => {
    if (artistRef.current.checked === true) {
        return '1';
    } else {
        return '0';
    }
}

const sendRegistration = () => {
  setFormData({
    user_name: userRef.current.value,
    email: emailRef.current.value,
    password: passwRef.current.value,
    name: nameRef.current.value,
    phone: phoneRef.current.value,
    address: addressRef.current.value,
    artist:checkIfArtist(),
    });
  console.log(formData);
}

const validateForm = () => {
    const pWord = passwRef.current.value;
    const numUpper = pWord.length - pWord.replace(/[A-Z]/g, '').length;  
    const numLower = pWord.replace(/[A-Z]/g, '').length;
    const hasNumber = /\d/.test(pWord);
    const hasSpecial = /[^A-Za-z0-9]/.test(pWord);
    console.log(hasSpecial);
    /*if (passwRef.current.value < 8) {
        console.log("password too short");
    }*/
}


    return (
            <form id="access-form" onSubmit={e => { e.preventDefault();
                sendRegistration(); validateForm();}}
            >
                <h2>Create your account</h2>

                <label htmlFor="username" className="mandatory-field">Username</label>
                <input type="text" id="username" ref={userRef}/>

                <label htmlFor="email" className="mandatory-field">Email</label>
                <input type="email" id="email" ref={emailRef}/>

                <label htmlFor="name" className="mandatory-field">Name</label>
                <input type="text" id="name" ref={nameRef}/>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={passwRef}/>

                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" ref={phoneRef}/>

                <label htmlFor="address">Address</label>
                <input type="text" id="address" ref={addressRef}/>

                <label htmlFor="artist-check">Are you an artist?</label>
                <input type="checkbox" id="artist-check" ref={artistRef}/>
        
                <input type="submit" value="Register" class="access-form-btn"/>
          </form>
    )
  }
  
  export default Register
  