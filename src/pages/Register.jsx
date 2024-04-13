import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import useAuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import { useLoadingContext } from '../context/LoadingContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { register, errors } = useAuthContext();
  const [t, i18n] = useTranslation("global");
  const { startLoading, stopLoading } = useLoadingContext();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleRegister = async () => {
    startLoading();
    register(name, email, password, passwordConfirmation);
    stopLoading();
  };

  useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      Object.values(errors).forEach(error => {
        const errorMessage = i18n.language === 'en' ? error[0].en : error[0].uk;
        toast.error(errorMessage);
      });
    }
  }, [errors, i18n.language]);

  return (
    <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>{t('signUp.title')}</h3>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' label={t('signUp.namePlaceholder')} id='formControlLg' type='text' size="lg" onChange={handleNameChange} />
            {errors.name && <div className='mb-4 mx-5 w-100 error-text'>
              {i18n.language === 'en' ? errors.name[0].en : errors.name[0].uk}
            </div>}
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label={t('login.emailPlaceholder')} id='formControlLg' type='email' size="lg" onChange={handleEmailChange} />
            {errors.email && <div className='mb-4 mx-5 w-100 error-text'>
              {i18n.language === 'en' ? errors.email[0].en : errors.email[0].uk}
            </div>}
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label={t('login.passwordPlaceholder')} id='formControlLg' type='password' size="lg" onChange={handlePasswordChange} />
            {errors.password && <div className='mb-4 mx-5 w-100 error-text'>
              {i18n.language === 'en' ? errors.password[0].en : errors.password[0].uk}
            </div>}
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label={t('signUp.passwordConfirmationPlaceholder')} id='formControlLg' type='password' size="lg" onChange={handlePasswordConfirmationChange} />

            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={handleRegister} >{t('signUp.signUpBtn')}</MDBBtn>
            <p className='ms-5'>
              {t('signUp.haveAnAccount')}
              <Link className="text-muted" to="/login">{t('login.loginButton')}</Link>
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

export default Register
