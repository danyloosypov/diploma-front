import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import useAuthContext from '../context/AuthContext';
import { useLoadingContext } from '../context/LoadingContext';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, errors } = useAuthContext();
  const { startLoading, stopLoading } = useLoadingContext();
  const [t, i18n] = useTranslation("global");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    startLoading();
    login(email, password);
    stopLoading();
  };

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm='6'>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>{t('login.title')}</h3>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' label={t('login.emailPlaceholder')} id='formControlLg' type='email' size="lg" onChange={handleEmailChange} />
            {errors.email && <div className='mb-4 mx-5 w-100 error-text'>
              {errors.email[0]}
            </div>}
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label={t('login.passwordPlaceholder')} id='formControlLg' type='password' size="lg" onChange={handlePasswordChange} />
            {errors.password && <div className='mb-4 mx-5 w-100 error-text'>
              {errors.password[0]}
            </div>}

            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={handleLogin}>{t('login.loginButton')}</MDBBtn>
            <p className="small mb-5 pb-lg-3 ms-5">
              <Link className="text-muted" to="/forgot-password">{t('login.forgotPassword')}</Link>
            </p>
            <p className='ms-5'>
              {t('login.dontHaveAnAccount')}
              <Link className="link-info" to="/register">{t('login.registerLink')}</Link>
            </p>

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="/images/airsoft_gun.png"
            alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'left', maxHeight: '650px'}} />
        </MDBCol>

      </MDBRow>
    </MDBContainer>
  )
}

export default Login
