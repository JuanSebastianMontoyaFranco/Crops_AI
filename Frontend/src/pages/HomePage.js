import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Context } from "../context/Context";
import { simpleAlert } from '../components/alerts/Alerts';

// Pages
import Landing from "../pages/Landing"
import LandingNavbar from "../components/widgets/LandingNavbar"
import LandingSidebar from "../components/widgets/LandingSidebar"

//Widgets
import Footer from '../components/widgets/Footer';
import Preloader from '../components/widgets/Preloader';
import Sidebar from '../components/widgets/Sidebar';
import Navbar from '../components/widgets/Navbar'

import Login from '../components/login/Login'
import Dashboard from '../components/dashboard/Dashboard'
import Users from '../components/users/Users'
import Prediction from '../components/crops/Prediction'

import { Routes as RoutesConfig } from '../routes';

const RouteWithLoader = ({ element: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader show={!loaded} />
      <Component {...rest} />
    </>
  );
};

const RouteLanding = ({ element: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader show={!loaded} />
      <LandingSidebar></LandingSidebar>
      <main>
        <LandingNavbar />
        <Component {...rest} />
      </main>
    </>
  );
};


const RouteWithSidebar = ({ element: Component, allowedRoles, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [auth] = useContext(Context);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true;
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  if (!allowedRoles.includes(auth.role)) {
    return <Navigate to={RoutesConfig.Landing.path} />;
  }

  return (
    <>
      <Preloader show={!loaded} />
      <Sidebar />
      <main className="content">
        <Navbar />
        <Component {...rest} />
        <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
      </main>
    </>
  );
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={RoutesConfig.Landing.path} element={<RouteLanding element={Landing} />} />
      <Route path={RoutesConfig.Login.path} element={<RouteWithLoader element={Login} />} />
      <Route path={RoutesConfig.Dashboard.path} element={<RouteWithSidebar element={Dashboard} allowedRoles={['admin', 'client']} />} />
      <Route path={RoutesConfig.Users.path} element={<RouteWithSidebar element={Users} allowedRoles={['admin']} />} />
      <Route path={RoutesConfig.Prediction.path} element={<RouteWithSidebar element={Prediction} allowedRoles={['admin']} />} />

      {/* Ruta catch-all */}
      <Route path="*" element={<NotFoundRedirect />} />

    </Routes>
  );
}

function NotFoundRedirect() {
  useEffect(() => {
    simpleAlert('Lo sentimos, no encontramos lo que buscabas', 'error');
  }, []);

  return <Navigate to={RoutesConfig.Landing.path} />;
}