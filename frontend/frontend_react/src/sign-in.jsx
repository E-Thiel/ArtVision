import { useRef, useState, useEffect } from 'react'
import './registersignin.css'


const SignIn = () => {
  
  const [formData, setFormData] = useState(null);

const emailRef = useRef();
const passwRef = useRef();

  const sendLogin = async () => {
    /*setFormData({userName: emailRef.current.value, password: passwRef.current.value});

    const formData = {userName: emailRef.current.value, password: passwRef.current.value}
  
    const correctCoordinates = {
      "userName":"roti",
      "password": "P@ssw0rD"
    }*/

    await fetch('https://artvision.onrender.com/auth/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "userName": "roti",
        "password": "P@ssw0rD"
      })
    })

    .then(response => response.json())
    /*.then(console.log(correctCoordinates))*/
    .then(json => console.log(json));
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
  