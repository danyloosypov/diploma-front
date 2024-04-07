import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import useAuthContext from '../context/AuthContext';
import Service from '../utils/Service';
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const [searchParams] = useSearchParams();
  const {token} = useParams();
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    setEmail(searchParams.get('email'));
  }, [])

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

  const handleSubmit = async () => {
    setErrors([]);
    setStatus(null);
    let response = await Service.resetPassword(email, token, password, passwordConfirmation);
    setStatus(response.data.status)
    if (response.status === 422) {
        setErrors(response.data.errors);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow>
      {status && (<div className=''>
        {status}
        <Link to="/login">{t('header.loginBtn')}</Link>
      </div>)}
        <MDBCol sm='6'>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>{t('resetPassword.title')}</h3>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' label={t('signUp.namePlaceholder')} id='formControlLg' type='text' size="lg" onChange={handleNameChange} />
            {errors.name && <div className='mb-4 mx-5 w-100 error-text'>
              {errors.name[0]}
            </div>}
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label={t('login.emailPlaceholder')} id='formControlLg' type='email' size="lg" onChange={handleEmailChange} />
            {errors.email && <div className='mb-4 mx-5 w-100 error-text'>
              {errors.email[0]}
            </div>}
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label={t('login.passwordPlaceholder')} id='formControlLg' type='password' size="lg" onChange={handlePasswordChange} />
            {errors.password && <div className='mb-4 mx-5 w-100 error-text'>
              {errors.password[0]}
            </div>}
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label={t('signUp.passwordConfirmationPlaceholder')} id='formControlLg' type='password' size="lg" onChange={handlePasswordConfirmationChange} />
            {errors.password && <div className='mb-4 mx-5 w-100 error-text'>
              {errors.password[1]}
            </div>}

            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={handleSubmit}>{t('phrazes.submit')}</MDBBtn>
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

export default ResetPassword
