import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignIn from './sign-in.jsx'
/*import SignUp from './signup.jsx'*/

function App() {
  const [count, setCount] = useState(0)
  /*<SignUp />*/

  return (
          <div className="pagelayout">
            <SignIn />
        </div>
  )
}

export default App
