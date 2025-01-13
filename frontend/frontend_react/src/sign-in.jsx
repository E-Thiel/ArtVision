import { useState } from 'react'
import './login-signup.css'


const SignIn = () => {
  
    return (
            <form id="access-form">
                <h2>Sign in</h2>
                <label htmlFor="email">Email</label>
                <input type="email" id="email"/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
                <span class="password-text">Forgot password?</span>
                <input type="button" value="Sign in" class="access-form-btn"/>
                <span>No account yet? <a href="#">Register here</a></span>
          </form>
    )
  }
  
  export default SignIn
  