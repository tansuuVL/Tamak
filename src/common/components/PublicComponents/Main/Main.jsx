import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Contentwrapper from '../../../../UI/ContentWrapper';
import { Flex } from '../../../../UI/Flex';
import defaultImg from '../../../../media/defaultCardImage.png'
import { useEffect } from 'react';
import { addToCart, getAllFoods, increaseQuanity } from '../../../../redux/actions';
import save from '../../../../media/save-instagram.png'
import { Button, notification } from 'antd';
import { convertIngredients, getLocalStorage, removeLocalStorage, setLocalStorage } from '../../../../utiles';
import Footer from '../../Footer/Footer'
import marked from '../../../../media/bookmark.png'
import {setUserData} from '../../../../redux/actions'

const Main = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const allFoods = useSelector(state => state.foods.allFoods)
    const cart = useSelector(state => state.cart.cart)
    const userData = useSelector(state => state.user.userData)
    const isAuth = useSelector(state => state.auth.isAuth)

    useEffect(() => {
        dispatch(getAllFoods())
    }, [])

    const openNotification = () => {
        notification.open({
          message: 'Внимание!',
          description:
            'Вы должны быть авторизованы.',
        });
      };

    const addToCartHandler = (data) => {    
        if(getLocalStorage("auth")) {
            const isExist = cart.findIndex(item => item.title === data.title)
            if(isExist !== -1) {
                dispatch(increaseQuanity(isExist))
            }else {
                const body =  {
                    title: data.title,
                    quanity: 1,
                    price: data.price,
                    image:data.image,
                    total: 0
                }
                dispatch(addToCart(body))
            }
        }else { 
            openNotification()
        }
    }

    const isFavoriteHandler = async (title) => { 
        const index = userData.favorite.findIndex(item => item === title)
        
        let body = null

        if(index !== -1) {
            let favorite = [...userData.favorite].filter((item, i) => index !== i ? item: false)

            body = {
                ...userData,
                favorite: favorite
            }

        }else { 
            let favorite = [...userData.favorite, title]
            body = {
                ...userData,
                favorite: favorite
            }
        }

        try {
            const responce = await (await fetch(`http://localhost:8000/users/${userData.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })).json()
            removeLocalStorage("auth")
            setLocalStorage(responce)
            dispatch(setUserData(responce))
        }catch(e) {
            console.log(e.message)
        }
    }

    return (
        <Contentwrapper padding="0" direction="column" gap="50px">
            <ContentInner>

                <FoodBlock>
                    <Title>Завтрак</Title>
                    <FoodList>
                        {
                            allFoods["breakfast"] &&
                            allFoods["breakfast"].map(item => 
                                <Food>
                                    <Flex width="100%" height="60%">
                                        <img src={item.image ? item.image : defaultImg} style={{width: "100%", height: "100%", objectFit: "cover"}} alt="card" />
                                    </Flex>
                                    <Flex direction="column" justify="space-between" width="100%" height="40%" padding="5px 10px" bg="#fff">
                                        <Flex width="100%" direction="column">
                                            <Header>
                                                <Name>{item.title}</Name>
                                                { isAuth && <CardImg src={userData.favorite.includes(item.title) ? marked:save} alt={"saveBtn"} onClick={() => isFavoriteHandler(item.title)} /> }
                                            </Header>
                                            <Ingredients>Cодержится: {convertIngredients(item.ingredients)}</Ingredients>
                                        </Flex>
                                        <CardFooter>
                                            <Price>{item.price} сом</Price>
                                            <Button onClick={() => addToCartHandler(item)}>В корзину +</Button>
                                        </CardFooter>
                                    </Flex>
                                </Food>
                            )
                        }
                    </FoodList>
                     
                    <Title>Обед</Title>
                    <FoodList>
                        {
                            allFoods["lunch"] &&
                            allFoods["lunch"].map(item => 
                                <Food>
                                    <Flex width="100%" height="60%">
                                        <img src={item.image ? item.image : defaultImg} style={{width: "100%", height: "100%", objectFit: "cover"}} alt="card" />
                                    </Flex>
                                    <Flex direction="column" justify="space-between" width="100%" height="40%" padding="5px 10px" bg="#fff">
                                        <Flex width="100%" direction="column">
                                            <Header>
                                                <Name>{item.title}</Name>
                                                { isAuth && <CardImg src={userData.favorite.includes(item.title) ? marked:save} alt={"saveBtn"} onClick={() => isFavoriteHandler(item.title)}  /> }
                                            </Header>
                                            <Ingredients>Cодержится: {convertIngredients(item.ingredients)}</Ingredients>
                                        </Flex>
                                        <CardFooter>
                                            <Price>{item.price} сом</Price>
                                            <Button onClick={() => addToCartHandler(item)}>В корзину +</Button>
                                        </CardFooter>
                                    </Flex>
                                </Food>
                            )
                        }
                    </FoodList>

                    <Title>Ужин</Title>
                    <FoodList>
                        {
                            allFoods["dinner"] &&
                            allFoods["dinner"].map(item => 
                                <Food>
                                    <Flex width="100%" height="60%">
                                        <img src={item.image ? item.image : defaultImg} style={{width: "100%", height: "100%", objectFit: "cover"}} alt="card" />
                                    </Flex>
                                    <Flex direction="column" justify="space-between" width="100%" height="40%" padding="5px 10px" bg="#fff">
                                        <Flex width="100%" direction="column">
                                            <Header>
                                                <Name>{item.title}</Name>
                                                { isAuth && <CardImg src={userData.favorite.includes(item.title) ? marked:save} alt={"saveBtn"} onClick={() => isFavoriteHandler(item.title)}  /> }
                                            </Header>
                                            <Ingredients>Cодержится: {convertIngredients(item.ingredients)}</Ingredients>
                                        </Flex>
                                        <CardFooter>
                                            <Price>{item.price} сом</Price>
                                            <Button onClick={() => addToCartHandler(item)}>В корзину +</Button>
                                        </CardFooter>
                                    </Flex>
                                </Food>
                            )
                        }
                    </FoodList>

                    <Title>Закуски</Title>
                    <FoodList>
                        {
                            allFoods["snakes"] &&
                            allFoods["snakes"].map(item => 
                                <Food>
                                    <Flex width="100%" height="60%">
                                     <img src={item.image ? item.image : defaultImg} style={{width: "100%", height: "100%", objectFit: "cover"}} alt="card" />
                                    </Flex>
                                    <Flex direction="column" justify="space-between" width="100%" height="40%" padding="5px 10px" bg="#fff">
                                        <Flex width="100%" direction="column">
                                            <Header>
                                                <Name>{item.title}</Name>
                                                { isAuth && <CardImg src={userData.favorite.includes(item.title) ? marked:save} alt={"saveBtn"} onClick={() => isFavoriteHandler(item.title)} /> }
                                            </Header>
                                            <Ingredients>Cодержится: {convertIngredients(item.ingredients)}</Ingredients>
                                        </Flex>
                                        <CardFooter>
                                            <Price>{item.price} сом</Price>
                                            <Button onClick={() => addToCartHandler(item)}>В корзину +</Button>
                                        </CardFooter>
                                    </Flex>
                                </Food>
                            )
                        }
                    </FoodList> 
                </FoodBlock>
            </ContentInner>
            <Footer />
        </Contentwrapper>
    );
}

export default Main;

const ContentInner = styled(Flex)`
    gap: 50px;
    flex-direction:column;
    padding: 0px 50px;
`
const FoodBlock = styled(Flex)`
    width: 100%;
    flex-direction:column
`
const FoodList = styled.ul`
    margin: 0;
    padding: 0;;
    display:flex;
    flex-wrap: wrap;
    gap: 50px;
    justify-content:center;

`
const Title = styled.h2`
    font-size: 36px;
    margin:50px 0px
`   
const Food = styled(Flex)`
    width: 300px;
    height: 300px;
    flex-direction:column;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 30px #e3e3e3;
`
const Header = styled(Flex)`
    width: 100%;
    justify-content:space-between;
    align-items:center;
`
const Name = styled.h3`
    margin: 0;
`
const Ingredients = styled.p`
    color: gray;
`
const CardFooter = styled(Flex)`
    width: 100%;
    justify-content: space-between;
    align-items:center;
`
const Price = styled.h3`
    font-size: 24px;
`
const CardImg = styled.img`
    width: 30px;
    cursor:pointer;
`