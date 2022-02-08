import { Button, notification } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addBalanceHistory, clearCart, minusBalance, setInTotal } from '../../../../redux/actions';
import Contentwrapper from '../../../../UI/ContentWrapper';
import { Flex } from '../../../../UI/Flex';
import Unfound from '../../../../UI/UnFound';
import { getTotalPrice, removeLocalStorage, setLocalStorage } from '../../../../utiles';
import Cartitem from './CartItem';
import axios from 'axios'
import { useHistory } from 'react-router';

const Cart = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart)
    const history = useHistory()

    useEffect(() => {
        let x = getTotalPrice(cart)
        dispatch(setInTotal(x))
    }, [cart])

    const inTotal = useSelector(state => state.cart.inTotal)
    const userData = useSelector(state => state.user.userData)

    const openNotification = () => {
        notification.open({
          message: 'Недостаточно средств на балансе!'
        })
    }

    useEffect(() => {
        const updateBalance = () => axios.put(`http://localhost:8000/users/${userData.id}`, userData)
        updateBalance()
        removeLocalStorage("auth")
        setLocalStorage(userData)
    }, [userData])

    const handlePurchase = () => {
        if(userData.balance > inTotal) {
            dispatch(minusBalance(inTotal))
            const purchaseBody = {
                date: Date.now(),
                total: inTotal,
                body: cart
            }

            dispatch(addBalanceHistory(purchaseBody))
            dispatch(clearCart())
            history.push("/main")
        }else {
            openNotification()
        }
    }

    return (
        <Contentwrapper>
            <h1 style={{fontSize: "36px"}}>Корзина</h1>
                {
                    cart.length ?
                    <CartWrapper>
                       {cart.map((item, index) => 
                            <Cartitem key={index} item={item} index={index}/>
                        )}
                        <BuyBlock>
                            <Flex gap="50px" align="center">
                                <ForPayText>К оплате: {inTotal} сом</ForPayText>
                                <Button style={{fontSize: "20px", height: "100%"}} onClick={handlePurchase}>Оплатить</Button>
                            </Flex>
                        </BuyBlock>
                    </CartWrapper>
                    :
                        <Unfound />
                }
            
        </Contentwrapper>
    );
}

export default Cart;

const CartWrapper = styled(Flex)`
    width: 100%;
    flex-direction:column;
    gap: 50px;
`
const BuyBlock = styled(Flex)`
    width: 100%;
    height: 80px;
    justify-content:flex-end;
    background: #fff;
    align-items:center;
    background: #fff;
    box-shadow: 0 0 30px #e3e3e3;
    align-items:center;
    padding: 0px 50px;
`
const ForPayText = styled.p`
    font-size: 20px;
    margin: 0;
`