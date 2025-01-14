import { useRef, useState, useEffect } from 'react'
import './registersignin.css'


const SignIn = () => {
  
  const [formData, setFormData] = useState(null);

const emailRef = useRef();
const passwRef = useRef();

const sendLogin = async() => {
  setFormData({userName: emailRef.current.value, password: passwRef.current.value,});


  //await sync function
await fetch('https://artvision.onrender.com/auth/login', {
    method: "POST",
    body: JSON.stringify(formData)
  }).then((response) => {
    console.log(response);
    return response.json();
  })
  }

    return (      
            <form id="access-form" onSubmit={e => { e.preventDefault();
              sendLogin();
            }}>
                <h2>Sign in</h2>
                <label htmlFor="username">Username</label>
                <input 
                type="string" 
                id="username" 
                ref={emailRef}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={passwRef} />
                <input type="submit" value="Sign in" class="access-form-btn"/>
                <span>No account yet? <a href="#">Register here</a></span>
          </form>
    )
  }
  
  export default SignIn
  