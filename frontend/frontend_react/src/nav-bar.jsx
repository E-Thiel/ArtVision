import { useState } from 'react'
import './nav-bar.css'
import artvisionLogo from './assets/ArtVisionLogo.svg'
import homeIcon from './assets/icons/Home.png'
import supportIcon from './assets/icons/Support.png'
import aboutIcon from './assets/icons/About.png'
import cartIcon from './assets/icons/ShoppingCart.png'
import menuIcon from './assets/icons/Menu.png'

function LoggedInNav() {
    return (
        <div id="nav-identify">
        <img id='nav-hamburger' src={menuIcon} className='nav-icon' alt="Menu" />
        <img id='nav-profile'/>
    </div>

    )
}



function NavBar() {
  const [count, setCount] = useState(0)

  return (
    <div id='nav-container'>
      <nav id='nav-bar'>
            <div className='nav-left'>
                <img src={artvisionLogo} alt="" className='nav-logo' />
                <ul>
                    <li><a href=""><img className='nav-icon' src={homeIcon} />Home</a></li>
                    <li><a href=""><img className='nav-icon' src={supportIcon} />Support</a></li>
                    <li><a href=""><img className='nav-icon' src={aboutIcon} />About</a></li>
                </ul>
            </div>
            <div className='nav-right'>
            <img id='nav-shopping' className='nav-icon' src={cartIcon}s alt="Shop" />
            </div>
            <LoggedInNav/>      
        </nav>
        </div>
  )
}

export default NavBar
