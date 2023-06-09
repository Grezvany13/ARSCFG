import React, { useEffect, useRef, useState } from 'react';
import { NavLink /*, useLocation */ } from 'react-router-dom';

import SidebarGroup from './SidebarGroup';
import SidebarLink from './SidebarLink';

import { ReactComponent as ReforgerIcon } from '../images/reforger-icon.svg';
//import { ReactComponent as Arma3Icon } from '../images/arma3-icon.svg';

//import routes from '../routes';

import { ReactComponent as Logo } from '../images/logo.svg';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    //const location = useLocation();
    //const { pathname } = location;
  
    const trigger = useRef(null);
    const sidebar = useRef(null);
  
    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    // eslint-disable-next-line no-unused-vars
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
    );

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
            return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector('body')?.classList.add('sidebar-expanded');
        } else {
            document.querySelector('body')?.classList.remove('sidebar-expanded');
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >

            <div className="flex items-center gap-2 sm:gap-4 px-6 py-5.5 lg:py-6.5">
                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden w-9 h-9"
                >
                    <svg
                        className="fill-current"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                            fill=""
                        />
                    </svg>
                </button>

                <NavLink to="/">
                    <Logo
                        title="Arma Server Config Generator"
                        className='w-full h-auto fill-white max-h-9 lg:max-h-full'
                    />
                </NavLink>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-bodydark2">
                            <NavLink
                                to="/"
                                className={({ isActive }) => 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}
                            >
                                Dashboard
                            </NavLink>
                        </h3>
                    </div>
                    <SidebarGroup
                        title="Arma Reforger Server"
                    >
                        <SidebarLink
                            link="/reforger/server/config"
                            title="Reforger Server Config"
                            Icon={ReforgerIcon}
                        />
                        <SidebarLink
                            link="/reforger/server/parameters"
                            title="Reforger Server Parameters"
                            Icon={ReforgerIcon}
                        />
                    </SidebarGroup>
{/**
                    <SidebarGroup
                        title="Arma Reforger Client"
                    >
                        <SidebarLink
                            link="/reforger/client/parameters"
                            title="Reforger Client Parameters"
                            Icon={ReforgerIcon}
                        />
                    </SidebarGroup>
 */}
{/**
                    <SidebarGroup
                        title="Arma 3 Server"
                    >
                        <SidebarLink
                            link="/arma3/server/config"
                            title="Arma 3 Server Config"
                            Icon={Arma3Icon}
                        />
                        <SidebarLink
                            link="/arma3/server/parameters"
                            title="Arma 3 Server Parameters"
                            Icon={Arma3Icon}
                        />
                    </SidebarGroup>
                    <SidebarGroup
                        title="Arma 3 Client"
                    >
                        <SidebarLink
                            link="/arma3/client/parameters"
                            title="Arma 3 Client Parameters"
                            Icon={Arma3Icon}
                        />
                    </SidebarGroup>
 */}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;