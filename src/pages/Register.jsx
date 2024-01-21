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
import Service from '../utils/Service';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

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
    try {
      await Service.register(name, email, password, passwordConfirmation);

      /*setName('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      navigate('/login');*/
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="strikethrough fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0">Strike</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Sign Up</h3>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='name' id='formControlLg' type='text' size="lg" onChange={handleNameChange} />
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg" onChange={handleEmailChange} />
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg" onChange={handlePasswordChange} />
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password Confirmation' id='formControlLg' type='password' size="lg" onChange={handlePasswordConfirmationChange} />

            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={handleRegister} >Sign up</MDBBtn>
            <p className='ms-5'>Have an account? <a href="#!" class="link-info">Login here</a></p>
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
