import React, {useEffect} from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";


//pages
import Navbar from './components/Navbar';
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Example from "./pages/Example";
import Home from "./pages/Home";
// import Layout from "./pages/Layout";
import Map from './pages/Map.js';
import CountryDetails from "./pages/CountryDetails";
// import Country from './pages/Country';
import Checkout from './pages/checkout/Checkout';
import Confirmation from './pages/checkout/Confirmation';
import CartMenu from './components/CartMenu';
import PlatformDetails from './pages/PlatformDetails';

const ScrollToTop = () => {
  const { pathname } = useLocation;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])
}
function App() {
  const { access_token } = useSelector(state => state.auth)
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <CssBaseline />
        <Navbar />
        <Outlet />
        <Routes>
          <Route>
              <Route index element={<Home />} />
              <Route path="contact" element={<Contact />} />
              <Route path="example" element={<Example />} />
              <Route path="map" element={<Map />} />
              <Route path="countrydetails/:countryId" element={<CountryDetails />} />
              <Route path="platformdetails/:platformId" element={<PlatformDetails />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="checkout/success" element={<Confirmation />} />
              <Route path="login" element={!access_token ? <LoginReg /> : <Navigate to="/dashboard" />} />
              <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
              <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />
          </Route>
          <Route path="/dashboard" element={access_token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
        <CartMenu />
      </BrowserRouter>
    </>
  );
}

export default App;
