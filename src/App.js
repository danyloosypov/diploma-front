import React, { useRef, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Competition from "./pages/Competition";
import NotFound from "./pages/NotFound";
import Header from './components/Header';
import Footer from './components/Footer';
import AuthorizedLayout from "./layouts/AuthorizedLayout";
import GuestLayout from "./layouts/GuestLayout";
import useAuthContext from './context/AuthContext';
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from "./pages/ResetPassword";
import Help from "./pages/Help";
import Loader from "./components/Loader/Loader";
import { useLoadingContext } from "./context/LoadingContext";

function App() {
    const {user} = useAuthContext();
    const { loading } = useLoadingContext();

    return (
    <div className="App">
      <Header user={user} />
      <Routes>
        <Route element={<AuthorizedLayout />}>
          <Route path="/" element={<Account />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/help" element={<Help />} />
        </Route>
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/help" element={<Help />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset/:token" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      {loading && <Loader />}
      <ToastContainer />
    </div>
  );
}

export default App;
