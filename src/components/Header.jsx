import React, { useState } from 'react';
import { useRef } from "react";
import {
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import LanguagePicker from './LanguagePicker/LanguagePicker';
import useAuthContext from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header({user}) {
  const navRef = useRef();
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

  const handleLogout = () => {
    logout();
    showNavbar();
  };

  const handleLogin = () => {
    navigate("/login");
    showNavbar();
  };


  return (
    <div>
      <header>
        <div className='d-flex flex-row'>
          <MDBIcon fas icon="strikethrough fa-3x me-3" style={{ color: '#709085' }}/>
          <span className="h1 fw-bold mb-0">Strike</span>
        </div>
        <nav ref={navRef}>
          {user && (
            <>
              <Link to="/" onClick={showNavbar}>{t('pages.account')}</Link>
              <Link to="/competition" onClick={showNavbar}>{t('pages.competition')}</Link>
            </>
          )}
          
          <Link to="/help" onClick={showNavbar}>{t('pages.help')}</Link>
          <div className="desktop">
            <LanguagePicker />
          </div>
          <button
            className="nav-btn nav-close-btn"
            onClick={showNavbar}>
            <FaTimes />
          </button>
          {user ? (
            <div className="text-center">
              <button className="btn btn-outline-primary" onClick={handleLogout}>{t('header.logoutBtn')}</button>
            </div>
          ) : (
            <div className="text-center">
              <button className="btn btn-primary" onClick={handleLogin}>{t('header.loginBtn')}</button>
            </div>
          )}
        </nav>
        <div className="mobile">
          <LanguagePicker />
        </div>
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
                <h1 className='mb-3'>{t('header.title')}</h1>
                <h4 className='mb-3'>{t('header.subtitle')}</h4>
                <MDBBtn tag="a" outline size="lg">
                  <Link className='header-banner-btn' to="/competition">{t('header.goToMatchBtn')}</Link>
                </MDBBtn>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>    
  );

  
}