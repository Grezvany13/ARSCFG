import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="sticky bottom-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11 flex-col lg:flex-row">
                <div className="flex items-center gap-2 sm:gap-4">
                    <p>Copyright &copy; {new Date().getFullYear()} Johandejong.dev - All rights reserved.</p>
                </div>
                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        <li className="group">
                            <NavLink
                                to="/privacy"
                                className="text-black group-hover:text-primary dark:text-white dark:group-hover:text-secondary"
                            >
                                Privacy
                            </NavLink>
                        </li>
                        <li className="group">
                            <NavLink
                                to="/cookies"
                                className="text-black group-hover:text-primary dark:text-white dark:group-hover:text-secondary"
                            >
                                Cookies
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

