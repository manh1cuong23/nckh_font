import React, { useState, useEffect } from 'react';
import { Route } from "react-router-dom";
import { Routes } from "../routes";
// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";
import DashboardOverview from './dashboard/DashboardOverview';

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

 const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const sessionStorageIsSettingsVisible = () => {
    return sessionStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(sessionStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    sessionStorage.setItem('settingsVisible', !showSettings);
  }

  return (
      <>
        <Sidebar />
        <main className="content">
          <Navbar />
          
          <Component />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
  );
};

// export default () => (
//   <Routes>
//     <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />


//     {/* components */}
//     <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
//     <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
//     <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
//     <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
//     <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
//     <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
//     <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
//     <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
//     <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
//     <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
//     <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
//     <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
//     <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
//     <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
//     <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
//     <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />


//     <Route to={Routes.NotFound.path} />
//   </Routes>
// );
