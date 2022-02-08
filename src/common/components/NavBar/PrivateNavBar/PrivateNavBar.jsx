import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Flex } from '../../../../UI/Flex';
import defaultUserAva from '../../../../media/userAvatar.png'
import { Dropdown, Menu } from 'antd';
import {useDispatch} from 'react-redux'
import { logoutUser } from '../../../../redux/actions';
import { removeLocalStorage } from '../../../../utiles';
import cartIcon from '../../../../media/cart.png'

const Privatenavbar = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const userData = useSelector(state => state.user.userData)
    const cart = useSelector(state => state.cart.cart)

    const logoutHandler = () => {
        dispatch(logoutUser())
        removeLocalStorage()
    }

    const menu = (
    <Menu style={{width: "250px", fontSize: "32px", height: "100%"}}>
        <Item style={{borderBottom: "1px solid #e3e3e3"}} onClick={() => history.push("/profile")}>
            <Flex width='100%'>
                <Flex width="40%" direction="column" gap="15px" padding="0px 10px 0px 0px">
                    <img src={userData.avatar ? userData.avatar : defaultUserAva} style={{borderRadius: "100%", width: "100%", height:"100%", objectFit: "cover"}} alt=""/>
                    <h3 style={{color: "gray", margin: 0,}}>@{userData.login}</h3>
                </Flex>
                <Flex direction="column" margin="0px 0px 0px 15px" gap="10px" justify="center" width="60%">
                    <span style={{color: "gray", fontSize: "20px"}}>Баланс:</span>
                    <h2 style={{fontSize: "32px"}}>{userData.balance} сом</h2>
                </Flex>
            </Flex>
        </Item>
        <Item onClick={logoutHandler}>
        Выйти
        </Item>
    </Menu>
    )

    return (
        <SPrivatenavbar>
            <Flex gap="10px" align="center" height="100%">
                <SLink to="/main">Главная</SLink>
                <SLink to="/about">О нас</SLink>
                <SLink to="/favorite">Избранное</SLink>
            </Flex>
            <Flex align="center" gap="50px">
                <Flex width="50px" style={{position: "relative", cursor: "pointer"}} onClick={() => history.push("/cart")}>
                    <CartCounter>{cart.length}</CartCounter>
                    <img src={cartIcon} style={{width: '100%', height: "100%", objectFit: "cover" }} alt="cart"/>
                </Flex>
                <Flex margin="5px 0px" style={{borderLeft: '1px solid #e3e3e3', cursor:"pointer"}} gap="10px" padding="10px">
                    <Flex direction="column">
                        <span style={{color: "gray"}}>Баланс:</span>
                        <h2 style={{fontSize: "24px"}}>{userData.balance} сом</h2>
                    </Flex>
                    <Dropdown overlay={menu}>
                        <Flex width='65px'>
                            <img src={userData.avatar ? userData.avatar : defaultUserAva} alt="avatar" style={{width: '100%', height: "100%", objectFit: "cover", borderRadius: "100%"}}/>
                        </Flex>
                    </Dropdown>
                </Flex>
            </Flex>
        </SPrivatenavbar>
    );
}

export default Privatenavbar;

const SPrivatenavbar = styled(Flex)`
    width: 55%;
    justify-content:space-between;
    align-items:center;
`
const SLink = styled(Link)`
    color: #424242;
    font-size: 20px;
    text-decoration:none;
`
const Item = styled(Menu.Item)`
    text-align:center;
    font-size: 18px;
    padding: 10px;   
`
const CartCounter = styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0px;
    right: -5px;
    background: #DF5333;
    border-radius: 100%;
    width: 18px;
    color: #fff;
    display:flex;
    align-items:center;
    justify-content:center;
`