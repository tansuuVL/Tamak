import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setUserData } from '../../../../redux/actions';
import { Flex } from '../../../../UI/Flex';
import {convertTime, removeLocalStorage, setLocalStorage} from '../../../../utiles'

const BillCard = ({item, billNumber}) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const userData = useSelector(state => state.user.userData)
    const dispatch = useDispatch()

    const onRemoveHandler = async (date) => {
        try {
            const {balanceHistory} = userData

            const filteredBalance = [...balanceHistory].filter(item => item.date !== date)

            const body = {
                ...userData,
                balanceHistory: filteredBalance
            }

            const responce = await (await fetch(`http://localhost:8000/users/${userData.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })).json()

            removeLocalStorage("auth")
            setLocalStorage(responce)
            dispatch(setUserData(responce))
            setIsModalVisible(false)
        }catch(e) {
            console.error(e.message)
        }
    }

    return (
        <SBillCard>
            <CardHeader>
                <HeaderText>Номер чека: {billNumber}</HeaderText>
                <HeaderText>{convertTime(item.date)}</HeaderText>
            </CardHeader>
            <CardFooter>
                <FooterCost>Сумма: {item.total}</FooterCost>
                <FooterBtn onClick={() => setIsModalVisible(true)}>Подробнее</FooterBtn>
                <Modal title={`Номер чека: ${billNumber}`} onOk={() => onRemoveHandler(item.date)} okText="Удалить" cancelText="Отмена" visible={isModalVisible} onCancel={() => setIsModalVisible(false)}>
                    <ModalContent>
                        <p style={{color: "gray", fontSize: "16px"}}>{convertTime(item.date)}</p>
                        <ModalCards>
                            {
                                item.body.map((item, index) => 
                                    <ModalCard key={index}>
                                        <ModalCardBlock>
                                            <Name>{item.title}</Name>
                                        </ModalCardBlock>
                                        <ModalCardBlock>
                                            <Title>Цена</Title>
                                            <Clause>{item.price}</Clause>
                                        </ModalCardBlock>
                                        <ModalCardBlock>
                                            <Title>Количество</Title>
                                            <Clause>{item.quanity}</Clause>
                                        </ModalCardBlock>
                                        <ModalCardBlock>
                                            <Title>Total</Title>
                                            <Clause>{item.total}</Clause>
                                        </ModalCardBlock>
                                    </ModalCard>
                                )
                            }
                        </ModalCards>
                    </ModalContent>
                </Modal>
            </CardFooter>
        </SBillCard> 
    );
}

export default BillCard;

const SBillCard = styled(Flex)`
    width: 550px;
    height: 80px;
    background: #fff;
    box-shadow: 0 0 30px #e3e3e3;
    padding: 10px 15px;
    flex-direction:column;
`

const CardHeader = styled(Flex)`
    width: 100%;
    align-items:center;
    justify-content:space-between;
`
const HeaderText = styled.span`
    color: #676767;
    font-size: 16px;
`
const CardFooter = styled(Flex)`
    width:100%;
    align-items:center;
    justify-content:space-between;
`
const FooterCost = styled.span`
    font-size: 24px;
    color: #000;
`
const FooterBtn = styled(Button)`
    height: auto;
`
const ModalContent = styled(Flex)`
    width: 100%;
    flex-direction:column;
`
const ModalCards = styled(Flex)`
    width: 100%;
    flex-direction:column;
    gap: 20px;
`
const ModalCard = styled(Flex)`
    width: 100%;
    height: 60px;
    padding: 10px 20px;
    box-shadow: 0 0 30px #e3e3e3;
    background: #fff;
    justify-content:space-between
`
const ModalCardBlock = styled(Flex)`
    flex-direction:column;
    align-items:center;
`
const Name = styled.h3`
    font-size: 24px;
    color: #000;
    margin: 0;
`
const Title = styled.span`
    color: gray;
    font-size: 14px;
`
const Clause = styled.span`
    color: #000;
    font-size: 16px;
`