import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useRef } from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBCollapse,
  MDBBtn
} from 'mdb-react-ui-kit';
import { FaBars, FaTimes } from "react-icons/fa";


export default function Header({user}) {
  const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

  return (
    <div>
      <header>
        <div className='d-flex flex-row'>
          <MDBIcon fas icon="strikethrough fa-3x me-3" style={{ color: '#709085' }}/>
          <span className="h1 fw-bold mb-0">Strike</span>
        </div>
        <nav ref={navRef}>
          <a href="/#">Home</a>
          <a href="/#">My work</a>
          <a href="/#">Blog</a>
          <a href="/#">About me</a>
          <button
            className="nav-btn nav-close-btn"
            onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button
          className="nav-btn"
          onClick={showNavbar}>
          <FaBars />
        </button>
      </header> 
      {user && (
        <div
          className='p-5 text-center bg-image'
          style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: '400px' }}
        >
          <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <div className='d-flex justify-content-center align-items-center h-100'>
              <div className='text-white'>
                <h1 className='mb-3'>Heading</h1>
                <h4 className='mb-3'>Subheading</h4>
                <MDBBtn tag="a" outline size="lg">
                  Call to action
                </MDBBtn>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>    
  );

  
}