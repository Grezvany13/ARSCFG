//import Breadcrumb from '../components/Breadcrumb';
import { NavLink } from "react-router-dom";

import { ReactComponent as ReforgerIcon } from '../images/reforger-icon.svg';
//import { ReactComponent as Arma3Icon } from '../images/arma3-icon.svg';


const Dashboard = () => {
    return (
        <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Arma Server Config Generator
                </h2>
                <nav></nav>
            </div>
            <div className="w-full">
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 grid-flow-dense">
                    <div className="flex flex-col gap-9">
                        <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="flex items-start gap-4 justify-start border-b border-stroke py-5 px-6 dark:border-strokedark">
                                <ReforgerIcon
                                    className="w-13 h-13 fill-black dark:fill-white"
                                />
                                <div>
                                    <h2 className="mb-1.5 text-title-md2 font-bold text-black dark:text-white">Arma Reforger</h2>
                                    <p className="text-sm font-medium">Server</p>
                                </div>
                            </div>
                            <div className="px-3 pb-5">
                                <div className="group flex items-center justify-between rounded-md p-4.5">
                                    <div className="flex items-center gap-4">
                                        <NavLink
                                            to="/reforger/server/config"
                                        >
                                            <h4 className="font-normal text-black group-hover:text-primary dark:text-white dark:group-hover:text-secondary">
                                                Reforger Server Config
                                            </h4>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="group flex items-center justify-between rounded-md p-4.5">
                                    <div className="flex items-center gap-4">
                                        <NavLink
                                            to="/reforger/server/parameters"
                                        >
                                            <h4 className="font-normal text-black group-hover:text-primary dark:text-white dark:group-hover:text-secondary">
                                                Reforger Server Parameters
                                            </h4>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-9">
                        <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="flex items-start gap-4 justify-start border-b border-stroke py-5 px-6 dark:border-strokedark">
                                <ReforgerIcon
                                    className="w-13 h-13 fill-black dark:fill-white"
                                />
                                <div>
                                    <h2 className="mb-1.5 text-title-md2 font-bold text-black dark:text-white">Arma Reforger</h2>
                                    <p className="text-sm font-medium">Client</p>
                                </div>
                            </div>
                            <div className="px-3 pb-5">
                                <div className="group flex items-center justify-between rounded-md p-4.5">
                                    <div className="flex items-center gap-4">
                                        <NavLink
                                            to="#"
                                        >
                                            <h4 className="font-normal text-black group-hover:text-primary dark:text-white dark:group-hover:text-secondary">
                                                Reforger Client Parameters
                                            </h4>
                                        </NavLink>
                                    </div>
                                    <div>
                                        Soon &trade;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/**
                    <div className="flex flex-col gap-9">
                        <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="flex items-start gap-4 justify-start border-b border-stroke py-5 px-6 dark:border-strokedark">
                                <Arma3Icon
                                    className="w-13 h-13 fill-black dark:fill-white"
                                />
                                <div>
                                    <h2 className="mb-1.5 text-title-md2 font-bold text-black dark:text-white">Arma3</h2>
                                    <p className="text-sm font-medium">Server</p>
                                </div>
                            </div>
                            <div className="px-3 pb-5">
                                <div className="group flex items-center justify-between rounded-md p-4.5">
                                    <div className="flex items-center gap-4">
                                        <NavLink
                                            to="#"
                                        >
                                            <h4 className="font-normal text-black group-hover:text-primary dark:text-white dark:group-hover:text-secondary">
                                                Arma 3 Server Config
                                            </h4>
                                        </NavLink>
                                    </div>
                                    <div>
                                        Soon &trade;
                                    </div>
                                </div>
                                <div className="group flex items-center justify-between rounded-md p-4.5">
                                    <div className="flex items-center gap-4">
                                        <NavLink
                                            to="#"
                                        >
                                            <h4 className="font-normal text-black group-hover:text-primary dark:text-white dark:group-hover:text-secondary">
                                                Arma 3 Server Parameters
                                            </h4>
                                        </NavLink>
                                    </div>
                                    <div>
                                        Soon &trade;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    */}
                    {/**
                    <div className="flex flex-col gap-9">
                        <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="flex items-start gap-4 justify-start border-b border-stroke py-5 px-6 dark:border-strokedark">
                                <Arma3Icon
                                    className="w-13 h-13 fill-black dark:fill-white"
                                />
                                <div>
                                    <h2 className="mb-1.5 text-title-md2 font-bold text-black dark:text-white">Arma 3</h2>
                                    <p className="text-sm font-medium">Client</p>
                                </div>
                            </div>
                            <div className="px-3 pb-5">
                                <div className="group flex items-center justify-between rounded-md p-4.5">
                                    <div className="flex items-center gap-4">
                                        <NavLink
                                            to="#"
                                        >
                                            <h4 className="font-normal text-black group-hover:text-primary dark:text-white dark:group-hover:text-secondary">
                                                Arma 3 Client Parameters
                                            </h4>
                                        </NavLink>
                                    </div>
                                    <div>
                                        Soon &trade;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    */}
                </div>
            </div>
        </>
    );
};

export default Dashboard;