import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Contentwrapper from '../../../../UI/ContentWrapper';
import { Flex } from '../../../../UI/Flex';
import defualtAva from '../../../../media/userAvatar.png'
import { Button, Input, Modal } from 'antd';
import {parseCardNumber, removeLocalStorage, setLocalStorage} from '../../../../utiles'
import BillCard from './BillCard'
import CreditCardInput from 'react-credit-card-input';
import { addBalance } from '../../../../redux/actions';
import axios from 'axios';


const Profile = () => {
    const userData = useSelector(state => state.user.userData)
    const dispatch = useDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [issue, setIssue] = useState('')

    const [cardFields, setCardFields] = useState({
        cardNumber: "",
        expiry: "",
        cvc: "",
        summ: ''
    })

    useEffect(() => {
        const fetchData = () => axios.put(`http://localhost:8000/users/${userData.id}`, userData)
        fetchData()
        removeLocalStorage("auth")
        setLocalStorage(userData)
    }, [userData])

    const handlePay = async () => {
        try {

            const card = await (await fetch(`http://localhost:8000/cards/${parseCardNumber(cardFields.cardNumber)}`)).json()
           
            if(
                card.cvc === Number(cardFields.cvc) &&
                card.expiry === cardFields.expiry &&
                card.bill > cardFields.summ        
            ) {
                dispatch(addBalance(cardFields.summ))
                setIsModalVisible(false)
                setIssue('')
                setCardFields({cardNumber: "",expiry: "",cvc: "",summ: ''})
            }else {
                setIssue("Что то пошло не так..")
            }

        }catch(e) {
            console.error(e.message)
        }
    }


    return (
        <Contentwrapper>
            <Wrapper width="100%">
                <AvaBlock>
                    <Ava>
                        <Img src={userData.avatar ? userData.avatar : defualtAva} alt="ava" />
                    </Ava>
                    <Login>@{userData.login}</Login>
                </AvaBlock>
                <TextBlock>
                    <FullName>{userData.fullName}</FullName>
                    <BalanceTitle>Баланс:</BalanceTitle>
                    <Balance>{userData.balance} сом</Balance>
                    <Button onClick={() => setIsModalVisible(true)}>Пополнить +</Button>
                    <Modal 
                        title="Пополнение" 
                        visible={isModalVisible} 
                        onCancel={() => setIsModalVisible(false)}
                        style={{width: "350px", display:"flex", justifyContent:"center", padding: "0"}}
                        footer={false}
                    >   
                        <Flex direction="column" gap="10px" align="center">
                            <CreditCardInput
                                    style={{width: "100%"}}
                                    cardNumberInputProps={{ value: cardFields.cardNumber, onChange: e => setCardFields({...cardFields, cardNumber: e.target.value}) }}
                                    cardExpiryInputProps={{ value: cardFields.expiry, onChange:  e => setCardFields({...cardFields, expiry: e.target.value}) }}
                                    cardCVCInputProps={{ value: cardFields.cvc, onChange:  e => setCardFields({...cardFields, cvc: e.target.value}) }}
                                    fieldClassName="input"
                            />
                            <Input placeholder="Сумма" type="number" value={cardFields.summ} onChange={e => setCardFields({...cardFields, summ: e.target.value})}/>
                            <p style={{color: "red"}}>{issue}</p>
                            <Button style={{alignSelf: "center"}} onClick={handlePay}>Пополнить</Button>
                        </Flex>
                    </Modal>
                </TextBlock>
                <BillHistoryBlock>
                    <BillTitle>История покупок:</BillTitle>
                    <BillCards>
                        {
                            userData.balanceHistory.map((item, index) =>
                               <BillCard key={index} billNumber={index + 1} item={item} />
                            )
                        }
                    </BillCards>
                </BillHistoryBlock>
            </Wrapper>
        </Contentwrapper>
    );
}

export default Profile;

const Wrapper = styled(Flex)`

`
const AvaBlock = styled(Flex)`
    width: 300px;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap: 15px;
`
const Ava = styled(Flex)`
    width: 255px;
`
const Img = styled.img`
    width: 100%;
    height:100%;
    object-fit:cover;
    border-radius: 100%;
`
const TextBlock = styled(Flex)`
    flex-direction:column;
    margin-left: 20px;
`
const Login = styled.h2`
    font-size: 36px;
    color: gray;
    margin: 0;
`
const FullName = styled(Login)`
    color: #000
`
const BalanceTitle = styled.span`
    font-size: 24px;
    color: gray
`
const Balance = styled.h3`
    margin: 0;
    font-size: 48px;
    color: #000;
`

const BillHistoryBlock = styled(Flex)`
    margin-left:100px;
    flex-direction:column;
`
const BillTitle = styled.h2`
    font-size: 36px;
`
const BillCards = styled(Flex)`
    display:flex;
    flex-direction:column;
    gap: 15px;
`

