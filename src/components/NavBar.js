import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import githubIcon from '../assets/img/github.svg';
import linkedinIcon from '../assets/img/nav-icon1.svg';
import instagramIcon from '../assets/img/instagramlogo.svg';
import emailIcon from '../assets/img/email.svg';
import { HashLink } from 'react-router-hash-link';
import {
  BrowserRouter as Router
} from "react-router-dom";

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }

          // Detect active section based on scroll position
          const sections = ['home', 'about', 'skills', 'projects'];
          const scrollPosition = window.scrollY + 100; // offset for better detection

          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const offsetTop = element.offsetTop;
              const offsetHeight = element.offsetHeight;
              
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveLink(section);
                break;
              }
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Call once on mount

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="#about" className={activeLink === 'about' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('about')}>About</Nav.Link>
              <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
              <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="https://github.com/MOB-06" target="_blank" rel="noopener noreferrer"><img src={githubIcon} alt="GitHub" loading="lazy" /></a>
                <a href="https://www.linkedin.com/in/ajit-adhikari-58091a3a1" target="_blank" rel="noopener noreferrer"><img src={linkedinIcon} alt="LinkedIn" loading="lazy" /></a>
                <a href="https://www.instagram.com/e_re_b_us?igsh=MXU1dzB1aGxkYTJtZw==" target="_blank" rel="noopener noreferrer"><img src={instagramIcon} alt="Instagram" loading="lazy" /></a>
                <a href="mailto:ajitadhiakari18@gmail.com"><img src={emailIcon} alt="Email" loading="lazy" /></a>
              </div>
              <HashLink to='#connect'>
                <button className="vvd"><span>Let’s Connect</span></button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  )
}
