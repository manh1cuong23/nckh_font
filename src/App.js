import '~/App.css';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes/routes';
import { Fragment, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import LoadingSpinner from './layouts/components/LoadingSpinner/LoadingSpinner';
import ScrollToTop from './hooks/scrollToTop';
import DeFaultLayoutAdmin from './pages/DeFaultLayoutAdmin/DeFaultLayoutAdmin';
import useAuthStore from './hooks/useAuthStore';
import AuthComposition from './pages/AuthComposion/AuthComposion';
import Defautlt from './pages/Defautlt/Defautlt';
import axios from 'axios';
function App() {
    const [isLoading, setIsLoading] = useState(true);
    const { fetchUser, isFetchedUser } = useAuthStore((state) => state);
    const axiosInstance= axios.create();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [isLoading]);
    useEffect(() => {
       
        // fetchUser()
    }, []);
    console.log('is Fet',isFetchedUser)
    window.addEventListener('storage',()=>{
        let token =  sessionStorage.getItem("accesstoken")
        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          } else {
            delete axiosInstance.defaults.headers.common['Authorization'];
          }
    })
    return (
       <>
            {true && (
                <Router>
                <ToastContainer autoClose={4000}  position="bottom-right" />
                <div className="App">
                    <ScrollToTop />
                    {/* {isLoading ? (
                        <LoadingSpinner />
                    ) : ( */}
                    <Routes>
                        {publicRoutes.map((route, index) => {
                                const needAuth = route.private ? true : false;
                                console.log('check',route.privte)
                                if (route.private) {
                                    console.log('da vao daty');
                                    console.log('itemdfvoath', route.path);
                                    // console.log('dj',AuthComposition(route.component))
                                }
                                
                            const Page = route.component ;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            // if(needAuth){
                            //     return (
                            //         <Route
                            //         key={index}
                            //         path={route.path}
                            //         element={
                            //             <Layout>
                            //                 <AuthComposition>
                            //                     <Page />
                            //                 </AuthComposition>
                            //               </Layout>
                            //         }
                            //     />
                            //     )
                            // }
                         

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        {privateRoutes.map((route,index) => {
                            const Page = route.component;

                            let Layout = DeFaultLayoutAdmin;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                    {/* )} */}
                </div>
            </Router>
       )}
       </>
    );
}

export default App;
