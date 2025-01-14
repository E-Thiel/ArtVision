import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import Header from "./components/Header.jsx";
import HeroSection from './components/HeroSection.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <HeroSection />
    <Home />
  </StrictMode>,
)
