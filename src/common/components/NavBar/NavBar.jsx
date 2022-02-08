import React from 'react'
import styled from 'styled-components'
import { Flex } from '../../../UI/Flex';
import logo from "../../../media/Logo.png"
import { useSelector } from 'react-redux';
import AdminNavBar from './AdminNavBar/AdminNavBar'
import PrivateNavBar from './PrivateNavBar/PrivateNavBar'
import PublicNavbar from './PublicNavBar/PublicNavBar'

const Navbar = () => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const isAdmin = useSelector(state => state.auth.isAdmin)

    return (
        <SNavbar>
            <Logo>
                <img src={logo} alt={"logo"} width="100%" />
            </Logo>
            {
                isAdmin ?
                    <AdminNavBar />
                :
                isAuth ? 
                    <PrivateNavBar />
                :
                    <PublicNavbar />
            }
        </SNavbar>
    );
}

export default Navbar;

const SNavbar = styled(Flex)`
    width: 100%;
    height: 90px;
    box-shadow: 0 0 30px #e3e3e3;
    padding: 0px 50px;
    align-items:center;
    justify-content:space-between;
`
const Logo = styled(Flex)`

`