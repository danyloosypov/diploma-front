import React, { useEffect } from 'react'
import Body from "../components/Body";
import useAuthContext from '../context/AuthContext';

const Account = () => {
  const {user} = useAuthContext();



  return (
    <div>
      {user?.name}
      <Body />

    </div>
  )
}

export default Account
