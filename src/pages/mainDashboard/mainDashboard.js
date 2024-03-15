import { HashRouter } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop'
import './scss/volt.scss'
import { BrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom';
import { RouteWithSidebar } from "./pages/HomePage";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import Member from "./pages/Member/Member";
import Technical from "./pages/Technical/Technical";
import Profile from "./pages/Profile/Profile";
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
function mainDashboard() {
    return (
        <HashRouter>
        </HashRouter> 
     );
}

export default mainDashboard;