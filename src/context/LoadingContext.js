import React, { createContext, useContext } from 'react';
import useLoading from '../hooks/useLoading';

const LoadingContext = createContext();

export const useLoadingContext = () => {
  return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }) => {
  const loading = useLoading();

  return (
    <LoadingContext.Provider value={loading}>
      {children}
    </LoadingContext.Provider>
  );
};
