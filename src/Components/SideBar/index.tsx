import React from 'react'
import type { ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout } from './style';

// type Location = {
//     pathname: string;
//     query: object;
// }

type NavItem = {
    pathname: string;
    label: string;
    icon: string;
}

interface Props {
//    location: Location
}

const SideBar: React.FC<Props> = () => {
    const { pathname } = useLocation()

    const state = {
        navItems: [
            { pathname: '/', label: 'Home', icon: 'home' },
            { pathname: '/demo-desc', label: 'Database Summary', icon: 'table' },
            { pathname: '/demo-sim', label: 'Similarity Search', icon: 'table' },
            { pathname: '/demo-sub', label: 'Substructure Search', icon: 'table' },
        ],
    }

    function isSelected(navItem: NavItem): string {
        return pathname === navItem.pathname ? 'selected' : '';
    }

    return (
        <Layout>
            <div className='sidebar'>
                <ul> 
                    {state.navItems.map((navItem: NavItem): ReactElement => {
                        return (<li className={isSelected(navItem)} key={navItem.pathname}>
                            <Link to={{ pathname: navItem.pathname }}>
                                <i className={`fa fa-${navItem.icon}`}></i>
                                <span>{navItem.label}</span>
                            </Link>
                        </li>)
                    })}
                </ul>
            </div>
        </Layout>
    )
}

export default SideBar;