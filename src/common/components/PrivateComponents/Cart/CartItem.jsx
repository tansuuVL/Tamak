import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import defaultCartImage from '../../../../media/defaultCardImage.png'
import x from '../../../../media/x.png'
import { decreaseQuanity, increaseQuanity, removeCardItem, setTotalOfCartItem } from '../../../../redux/actions';
import { Flex } from '../../../../UI/Flex';
import { countTotal } from '../../../../utiles';

const Cartitem = ({item, index}) => {
    const dispatch = useDispatch()
    
    const [total, setTotal] = useState(item.price)

    useEffect(() => {
        let total = countTotal(item.price, item.quanity)
        setTotal(total)
        dispatch(setTotalOfCartItem({index: index, total: total}))
    }, [item.quanity])

    return (
        <Item>
            <ItemLeft>
                <img src={item.image ? item.image : defaultCartImage} alt={"product"} style={{width:"100%", height: "100%", objectFit:"cover"}}/>
            </ItemLeft>
            <ItemRight>
                <Clauses>
                    <Clause>
                        <ClauseTitle>Блюдо</ClauseTitle>
                        <ClauseBody>{item.title}</ClauseBody>
                    </Clause>
                    <Clause>
                        <ClauseTitle>Цена</ClauseTitle>
                        <ClauseBody>{item.price} сом</ClauseBody>
                    </Clause>
                    <Clause>
                        <ClauseTitle>Количество</ClauseTitle>
                        <ClauseBody style={{display:"flex", gap: "10px", alignItems:"center"}}>
                            <Button onClick={() => dispatch(decreaseQuanity(index))}>-</Button>
                            <span style={{width: "50px", textAlign:"center", borderBottom:"1px solid #e3e3e3"}}>{item.quanity}</span>
                            <Button onClick={() => dispatch(increaseQuanity(index))}>+</Button>
                        </ClauseBody>
                    </Clause>
                    <Clause>
                        <ClauseTitle>Сумма</ClauseTitle>
                        <ClauseBody>{total} сом</ClauseBody>
                    </Clause>
                </Clauses>

                <X onClick={() => dispatch(removeCardItem(index))}>
                    <img src={x} alt="close"/>
                </X>
            </ItemRight>
        </Item>
    );
}

export default Cartitem;

const Item = styled(Flex)`
    width: 100%;
    height: 150px;
    box-shadow: 0 0 30px #e3e3e3;
    border-radius: 5px;
    background: #fff;
`
const ItemLeft = styled(Flex)`
    width: 20%;
    height: 100%;
`
const ItemRight = styled(Flex)`
    position:relative;
    width: 80%;
    height: 100%;
    justify-content:space-between;
    padding: 20px 80px 20px 20px;
`
const X = styled.span`
    position: absolute;
    height: 40px;
    width: 40px;
    color: #474747;
    top: 15px;
    right: 10px;
    cursor:pointer;
`
const Clauses = styled.ul`
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display:flex;
    justify-content:space-between;
`
const Clause = styled.li`
    list-style-type: none;
    height: 100%;
    display:flex;
    flex-direction:column;
    gap:10px;
    align-items:center;
`
const ClauseTitle = styled.h3`
    margin: 0;
    color: gray;
    font-size: 24px;
`
const ClauseBody = styled.span`
    font-size: ${({size}) => size || "24px"};
`