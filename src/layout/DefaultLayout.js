import { Outlet } from "react-router-dom"
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const DefaultLayout = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Helmet
                defaultTitle="ARSCFG - Arma Reforger Server Config File Generator"
                titleTemplate="ARSCFG - %s"
            >
                <meta name="description" content="This tool is a simple form to generate a full config json file for your Arma Reforger server." />
                <meta name="theme-color" content="#1C2434" />
                <script type="application/ld+json">{`
                    {
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "url": "https://arscfg.johandejong.dev/",
                        "inLanguage": "en"
                    }
                `}</script>
            </Helmet>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
                <div className="flex h-screen overflow-hidden">
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        <main className="flex flex-grow">
                            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 w-full">
                                <Outlet />
                                {children}
                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};
    
export default DefaultLayout;