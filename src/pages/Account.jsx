import React, { Suspense, useEffect } from 'react'
import useAuthContext from '../context/AuthContext';
import Tabs from '../components/Tabs';

const Account = () => {
  const {user} = useAuthContext();

  return (
    <div>
      <Tabs />
    </div>
  )
}

export default Account
