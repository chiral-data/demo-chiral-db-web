import * as React from 'react';
import { Link } from 'react-router-dom';

type Location = {
    pathname: string;
    query: object;
}

type NavItem = {
    pathname: string;
    label: string;
    icon: string;
}

interface Props {
    location: Location
}

const state = {
    navItems: [
        { pathname: '/', label: 'Home', icon: 'home' },
        { pathname: '/about', label: 'About', icon: 'info' },
        { pathname: '/table-demo', label: 'Tables', icon: 'table' },
        { pathname: '/button-demo', label: 'Buttons', icon: 'dot-circle-o' },
        { pathname: '/progress-bars', label: 'Progress Bars', icon: 'spinner'},
        { pathname: '/modal-demo', label: 'Modals', icon: 'clipboard' },
        { pathname: '/tabs-demo', label: 'Tabs', icon: 'list-ul' },
        { pathname: '/input-demo', label: 'Inputs', icon: 'check-square' },
        { pathname: '/notifications-demo', label: 'Notifications', icon: 'exclamation' },
    ],
};

const isSelected = (location: Location, navItem: NavItem): string => {
    return location.pathname === navItem.pathname ? 'selected' : '';
}

const SideBar: React.FC<Props> = ({ location }) => {
    return (
        <aside className="al-sidebar" ng-swipe-right="menuExpand()" ng-swipe-left="menuCollapse()"
        ng-mouseleave="hoverElemTop=selectElemTop">
            <ul className="al-sidebar-list">
                state.navItems.map((navItem: NavItem) => {
                    <li className={`al-sidebar-list-item ${isSelected(location, navItem)}`} key={navItem.pathname}>
                        <Link className="al-sidebar-list-link" to={{ pathname: navItem.pathname, query: navItem.query }}>
                            <i className={`fa fa-${navItem.icon}`}></i>
                            <span>{navItem.label}</span>
                        </Link>
                    </li>
                })
            </ul>
        </aside>
    )
}

export default SideBar;