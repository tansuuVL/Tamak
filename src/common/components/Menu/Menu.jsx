import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Flex } from '../../../UI/Flex';

const foodsLinks = [
    {title: "Завтраки", id: 1, path: "breakfast"},
    {title: "Обед", id:2, path: "lunch"},
    {title: "Ужин", id: 3, path: "dinner"},
    {title: "Закуски", id: 4, path: "snakes"}
]
const Menu = () => {
    const history = useHistory()

    return (
        <SMenu>
          <H3>Menu</H3>
              <FoodList>
                {
                  foodsLinks.map(link => 
                    <FoodItem key={link.id} onClick={() => history.push(`/main/${link.path}`)}>{link.title}</FoodItem>       
                  )
                }
            </FoodList>
        </SMenu>
    );
}

export default Menu;

const SMenu = styled(Flex)`
    width: 300px;
    flex-direction:column;
    background:#fff;
    box-shadow: 0 0 30px #e3e3e3;
    padding: 30px;
`
const H3 = styled.h3`
    margin: 0px 0px 20px 0px;
    padding: 0;
    text-align:center;
    font-size: 36px;
    align-self: center;
`
const FoodList = styled.ul`
    display:flex;
    flex-direction:column;
    gap:15px;
`
const FoodItem = styled.li`
    list-style-type: none;
    font-size: 24px;
    height: 100%;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
        background: #e3e3e3;
    }
`