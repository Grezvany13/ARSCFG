import DefaultLayout from './layout/DefaultLayout';
//import { Outlet } from "react-router-dom"

import Root from './pages/root';

import Dashboard from './pages/Dashboard';
import ReforgerServerConfig from './pages/ReforgerServerConfig';
import ReforgerServerParameters from './pages/ReforgerServerParameters';

import Cookies from './pages/Cookies';
import Privacy from './pages/Privacy';

import Error404 from './pages/Error404';

const routes = [
    {
        path: "/",
        element: <DefaultLayout />,
        errorElement: <Error404 />,
        children: [
            {
                path: "/",
                element: <Dashboard />
            },
            {
                path: "reforger",
                element: <Root />,
                children: [
                    {
                        path: "server",
                        element: <Root />,
                        children: [
                            {
                                path: "config",
                                element: <ReforgerServerConfig />
                            },
                            {
                                path: "parameters",
                                element: <ReforgerServerParameters />
                            }
                        ]
                    }
                ]
            },
            {
                path: "cookies",
                element: <Cookies />
            },
            {
                path: "privacy",
                element: <Privacy />
            }
        ]
    },
];

export default routes;