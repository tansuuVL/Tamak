import React, { useEffect, useMemo, useState } from 'react';
import Contentwrapper from '../../../../UI/ContentWrapper';
import styled from 'styled-components'
import { Flex } from '../../../../UI/Flex';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import Footer from '../../Footer/Footer'
import Unfound from '../../../../UI/UnFound';
import { useDispatch } from 'react-redux';
import { addToCart, collectFavoriteFoods, increaseQuanity } from '../../../../redux/actions';
import { convertIngredients } from '../../../../utiles';
import marked from '../../../../media/bookmark.png'
import defaultFoodImage from '../../../../media/defaultCardImage.png'

const Favorite = () => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user.userData)
    const allFoods = useSelector(state => state.foods.allFoods)
    const cart = useSelector(state => state.cart.cart)

    const favoriteFoods = useMemo(() => {
        let foods = [...allFoods["breakfast"],...allFoods["lunch"],...allFoods["dinner"],...allFoods["snakes"], ]

        let filtered = foods.filter(item => {
            for(let favFood of userData.favorite) {
                if(favFood.includes(item.title)) {
                    return item
                }
            }
        })

        return filtered
    }, [userData.favorite, allFoods])

    const addToCartHandler = (data) => {
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
    }

    const multiCartAddHandler = () => {
        
        favoriteFoods.map(food => {
            const isExist = cart.findIndex(item => item.title === food.title)
            if(isExist !== -1) {
                dispatch(increaseQuanity(isExist))
            }else {
                const body =  {
                    title: food.title,
                    quanity: 1,
                    price: food.price,
                    image:food.image,
                    total: 0
                }
                dispatch(addToCart(body))
            }
        })
    }
    
    return (
        <Contentwrapper padding="0">
            <Content>
                <Header>
                    <Title>Избранное</Title>
                    <SButton onClick={multiCartAddHandler}>Добавить все в корзину в один клик</SButton>
                </Header>
                <Cards>
                    {
                        favoriteFoods.length ?
                            favoriteFoods.map(card =>
                                <Card>
                                    <CardImg>
                                        <img src={card.image ? card.image:defaultFoodImage} style={{width: "100%", height: '100%', objectFit: "cover"}} alt="card"/>
                                    </CardImg>
                                    <CardBody>
                                        <Flex width="100%" direction="column">
                                            <Flex width="100%" justify="space-between" >
                                                <Name>{card.title}</Name>
                                            </Flex>
                                            <Ingredients>Cодержится: {convertIngredients(card.ingredients)}</Ingredients>
                                        </Flex>
                                        <CardFooter>  
                                            <Price>{card.price} сом</Price>
                                            <Button onClick={() => addToCartHandler(card)}>В корзину +</Button>
                                        </CardFooter>
                                    </CardBody>
                                </Card>
                            )
                            :

                            <Unfound text="Нет избранных блюд.."/>
                    }
                </Cards>
            </Content>
            <Footer />
        </Contentwrapper>
    );
}

export default Favorite;

const Content = styled(Flex)`
    width: 100%;
    flex-direction:column;
    padding: 30px 50px
`
const Title = styled.h1`
    font-size: 36px;
`
const Header = styled(Flex)`
    width: 100%;
    align-items:center;
    height: 80px;
    justify-content:space-between;

`
const SButton = styled(Button)`
    font-size: 20px;
    height: auto;
`
const Cards = styled(Flex)`
    display:flex;
    width: 100%;
    flex-wrap:wrap;
    gap:50px;
    justify-content:center
`
const Card = styled(Flex)`
    display:flex;
    width: 300px;
    height: 300px;
    background: #fff;
    box-shadow: 0 0 30px #e3e3e3;
    flex-direction:column;
`
const CardImg = styled(Flex)`
    width: 100%;
    height: 60%;
`
const CardBody = styled(Flex)`
    padding: 5px 10px;
    width: 100%;
    height: 40%;
    flex-direction:column;
    justify-content:space-between;
    background: #fff;
`
const Name = styled.h3`
    font-size: 18px;
    margin: 0;
`
const Ingredients = styled.p`
    color: gray;
    margin: 0;
    font-size: 14px;
`
const CardFooter = styled(Flex)`
    width: 100%;
    justify-content:space-between;
    align-items:center;
`
const Price = styled.span`
    font-size: 32px;
`