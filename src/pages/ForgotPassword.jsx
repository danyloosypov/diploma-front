import React, { useState } from 'react';
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
import Service from '../utils/Service';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const [t, i18n] = useTranslation("global");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    setErrors([]);
    setStatus(null);
    let response = await Service.forgotPassword(email);
    setStatus(response.data.status)
    if (response.status === 422) {
        setErrors(response.data.errors);
    }

  };


  return (
    <MDBContainer fluid>
      <MDBRow style={{ maxWidth: '600px', padding: '60px 0', margin: '0 auto' }}>
          {status && (<div className=''>{status}</div>)}
          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>{t('login.forgotPassword')}</h3>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' label={t('login.emailPlaceholder')} id='formControlLg' type='email' size="lg" onChange={handleEmailChange} />
            {errors.email && <div className='mb-4 mx-5 w-100 error-text'>
              {errors.email[0]}
            </div>}

            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={handleSubmit}>{t('phrazes.submit')}</MDBBtn>
            <p className="small mb-5 pb-lg-3 ms-5">
              <Link className="text-muted" to="/login">{t('header.loginBtn')}</Link>
            </p>
            <p className='ms-5'>
              {t('login.dontHaveAnAccount')}
              <Link className="link-info" to="/register">{t('login.registerLink')}</Link>
            </p>

          </div>
      </MDBRow>
    </MDBContainer>
  )
}

export default ForgotPassword
