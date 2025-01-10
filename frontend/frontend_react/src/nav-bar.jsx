import { useState } from 'react'
import './nav-bar.css'
import artvisionLogo from './assets/ArtVisionLogo.svg'
import homeIcon from './assets/icons/Home.png'
import supportIcon from './assets/icons/Support.png'
import aboutIcon from './assets/icons/About.png'
import cartIcon from './assets/icons/ShoppingCart.png'
import menuIcon from './assets/icons/Menu.png'


/* JSX for the Dropdown menu */

const DropDownNav = () => {
    return (
        <div id="nav-dropdown">
            <ul>
                <li>
                    <a href="#">Option&nbsp;1</a>
                </li>
                <li>
                <a href="#">Option&nbsp;2&nbsp;extra</a>
                </li>
                <li>
                <a href="#">Option&nbsp;3</a>
                </li>
            </ul>
        </div>
    )
}


/* JSX for the far-right section of the nav for the when the user is logged in */

function LoggedInNav() {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }
    return (
        <div id="nav-identify">
            <div id="menu-container">
            <img id='nav-hamburger' src={menuIcon} className='nav-icon' alt="Menu" onClick={handleOpen}/>
            {open ? <DropDownNav /> : null}
            </div>
            <img id='nav-profile'/>
        </div>
    )
}

/* JSX for the far-right section of the nav for the when the user hasn't logged in */

const LoginRegisterNav = () => {
    return (
    <div id="nav-identify">
        <a href="#" id="signin-btn">
            <button class="nav-btn">
                Sign In
            </button>
        </a>
        <a href="#" id="register-btn">
            <button class="nav-btn">
                Register
            </button>
        </a>
</div>)
}


/* JSX for the nav bar in general */

const NavBar = () => {

  return (
    <div id='nav-container'>
    <nav id='nav-bar'>
            <div className='nav-left'>
                <img src={artvisionLogo} alt="" className='nav-logo' />
                <ul class="nav-items">
                    <li><a href=""><img className='nav-icon' src={homeIcon} />Home</a></li>
                    <li><a href=""><img className='nav-icon' src={supportIcon} />Support</a></li>
                    <li><a href=""><img className='nav-icon' src={aboutIcon} />About</a></li>
                </ul>
            </div>
            <div className='nav-right'>
            <img id='nav-shopping' className='nav-icon' src={cartIcon}s alt="Shop" />
            </div>
            <LoggedInNav />
        </nav>
    </div>
  )
}

export default NavBar
