import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Footer = ({user}) => {
  const [t, i18n] = useTranslation("global");

  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='container d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>{t('footer.socialTitle')}</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon fas icon="strikethrough fa-3x me-3" style={{ color: '#709085' }}/>
                <span className="h1 fw-bold mb-0">Strike</span>
              </h6>
            </MDBCol>
            
            {user && (
              <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>{t('footer.sitemap')}</h6>
                <p>
                  <Link className='text-reset' to="/competition">{t('pages.competition')}</Link>
                </p>
                <p>
                  <Link className='text-reset' to="/">{t('pages.account')}</Link>
                </p>
              </MDBCol>
            )}
            

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>{t('footer.usefulLink')}</h6>
              <p>
                <Link className='text-reset' to="/help">{t('pages.help')}</Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>{t('footer.contact')}</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                {t('footer.address')}
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                {t('footer.email')}
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> 
                {t('footer.phone')}
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        {t('footer.copyright')}
        <div className='text-reset fw-bold'>
          {t('footer.copyrightValue')}
        </div>
      </div>
    </MDBFooter>
  )
}

export default Footer
