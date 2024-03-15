import classNames from 'classnames/bind';
import React, { useState, useEffect } from 'react';
import { Route } from "react-router-dom";
import styles from './DeFaultLayoutAdmin.module.scss';
import '../mainDashboard/scss/volt.scss'

import Sidebar from '../mainDashboard/components/Sidebar';
import Footer from '../mainDashboard/components/Footer';
import Navbar from '../mainDashboard/components/Navbar';

const cx = classNames.bind(styles);

function DeFaultLayoutAdmin({ children }) {
    return (
        <>
            <Sidebar />
            <main className="content">
                <Navbar />
                {children}
                <Footer />
            </main>
        </>
    );
}

export default DeFaultLayoutAdmin;
