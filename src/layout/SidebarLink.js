import { NavLink } from 'react-router-dom';

const SidebarLink = ({link, isActive, title, Icon}) => {
    return (
        <li>
            <NavLink
                to={link}
                className={({ isActive }) => 'group relative flex items-start gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' + (isActive && '!text-white')}
            >
                <Icon
                    className="fill-current w-6 h-6"
                />
                {title}
            </NavLink>
        </li>
    );
};

export default SidebarLink;