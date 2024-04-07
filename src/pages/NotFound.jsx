import React from 'react'
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';

const NotFound = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="section-404">
      <h1 className="error">404</h1>
      <div className="page">{t('notFound.title')}</div>
      <Link to="/" className="back-home">{t('notFound.backHomeBtn')}</Link>
    </div>
  )
}

export default NotFound
