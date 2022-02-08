import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { Flex } from '../../../../UI/Flex';
import {useHistory} from 'react-router'
import { useState } from 'react';
import { Button, Input, Modal, notification } from 'antd';
import { setLocalStorage } from '../../../../utiles';
import { useDispatch } from 'react-redux';
import { authUser, setUserData } from '../../../../redux/actions';

const Publicnavbar = () => {
    const history = useHistory()
    const dispatch = useDispatch()
  
    // SIGN_UP
    const [signUpFields, setSignUpFields] = useState({})
    const [signupErr, setSignUpErr] = useState('')

    const signupFieldsChaningHandler = e => {
        setSignUpFields({...signUpFields, [e.target.name]:e.target.value})
    }

    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleOk = async () => {
        try {
            setLoading(true)
            const allUsers = await (await fetch("http://localhost:8000/users")).json()
            
            const isExists = allUsers.find(user => user.login === signUpFields.login)
            if(isExists) {
                setSignUpErr("Такой пользователь уже существует!")
            }else {
                if(signUpFields.password === signUpFields.repeat_password) {
                    const body = {
                        fullName: signUpFields.fullName,
                        login: signUpFields.login,
                        password: signUpFields.password,
                        balance: 0,
                        balanceHistory: [],
                        favorite: [],
                        avatar: null,
                    }   
            
                    const responce = await fetch("http://localhost:8000/users", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(body)
                    })
        
                    const json = await responce.json()
                    setLocalStorage(json)
                    dispatch(authUser())
                    setSignUpErr("")
                    setVisible(false)
                    setSignUpFields({})
                }else {
                    setSignUpErr("Повторите пароль корректно!")
                }
            }
        }catch(e) {
            setSignUpErr(e.message)
        }finally{
            setLoading(false)
        }
    }

    // SIGN_IN

    const [visible2, setVisible2] = useState(false)
    const [signInErr, setSignInErr] = useState('')

    const [signInFields, setSignInFields] = useState({})
    const [confirmLoading, setConfirmLoading] = useState(false)

    const signinFieldsChaningHandler = e => {
        setSignInFields({...signInFields, [e.target.name]:e.target.value})
    }

    const signInHandler = async () => {
        try {
            setConfirmLoading(true)
            
            const allUsers = await (await fetch("http://localhost:8000/users")).json()
            const user = allUsers.find(item => item.login === signInFields.login && item.password === signInFields.password)
            console.log(user)
            if(user) {
                setSignInFields({})
                setSignInErr('')
                setVisible2(false)
                setLocalStorage(user)
                dispatch(setUserData(user))
                dispatch(authUser())
            }else {
                setSignInErr("Пароль или логин введен некоректно")
            }
        }catch(e) {
            setSignInErr(e.message)
        }finally {
            setConfirmLoading(false)   
        }

    }

    return (
        <SPublicnavbar>
            <Flex gap="10px" align="center" height="100%">
                <SLink to="/main">Главная</SLink>
                <SLink to="/about">О нас</SLink>
            </Flex>
            <Flex gap="20px" align="center">
                <SignInBtn onClick={() => setVisible2(true)} >Войти</SignInBtn>
                <Modal 
                    title="Вход"
                    visible={visible2}
                    onOk={signInHandler}
                    confirmLoading={confirmLoading}
                    onCancel={() => setVisible2(false)}
                    width="350px"
                >
                    <Flex direction="column" gap="10px" width="100%">
                        <Input type="text" placeholder="Логин" name="login" value={signInFields.login} onChange={signinFieldsChaningHandler}/>
                        <Input type="password" placeholder="Пароль" name="password" value={signInFields.password} onChange={signinFieldsChaningHandler}/>
                        <p style={{alignSelf: "center", color: "red", margin: 0}}>{signInErr}</p>
                        <p style={{cursor:'pointer', alignSelf: "center", color: "gray", margin: 0}} onClick={() => {
                            setSignInFields({})
                            setSignInErr('')
                            setVisible2(false)
                            setVisible(true)
                        }}>Нет аккаунта? Регистрация</p>
                    </Flex>
                </Modal>

                <SignUpBtn onClick={() => setVisible(true)}>Регистрация</SignUpBtn>
                <Modal 
                    title="Регистрация"
                    visible={visible}
                    onOk={handleOk}
                    confirmLoading={loading}
                    onCancel={() => setVisible(false)}
                    width="350px"
                >
                        <Flex direction="column" gap="10px" width="100%">
                            <Input style={{width: "100%"}} placeholder="Имя" type="text" name="fullName" value={signUpFields.fullName} onChange={signupFieldsChaningHandler}/>
                            <Input style={{width: "100%"}} placeholder="Логин" type="text" name="login" value={signUpFields.login} onChange={signupFieldsChaningHandler}/>
                            <Input style={{width: "100%"}} placeholder="пароль" type="password" name="password" value={signUpFields.password} onChange={signupFieldsChaningHandler}/>
                            <Input style={{width: "100%"}} placeholder="Подтвердите пароль" type="password" name="repeat_password" value={signUpFields.repeat_password} onChange={signupFieldsChaningHandler}/>
                            <p style={{alignSelf: "center", color: "red"}}>{signupErr}</p>
                            <p style={{cursor:'pointer', alignSelf: "center", color: "gray", margin: 0}} onClick={() => {
                                setSignUpFields({})
                                setSignUpErr('')
                                setVisible2(true)
                                setVisible(false)
                            }}>Есть аккаунт? Войти</p>
                        </Flex>
                </Modal>
            </Flex>
        </SPublicnavbar>
    );
}

export default Publicnavbar;

const SPublicnavbar = styled(Flex)`
    width: 55%;
    justify-content:space-between;
    align-items:center;
`
const SLink = styled(Link)`
    color: #424242;
    font-size: 20px;
    text-decoration:none;
`
const SignInBtn = styled.button`
    font-size: 20px;
    background: none;
    border: none;
    cursor:pointer;
    color: #474747;
`
const SignUpBtn = styled.button`
    font-size: 20px;
    color: #fff;
    background: #474747;
    border-radius: 5px;
    padding: 10px;
    cursor:pointer;
`
