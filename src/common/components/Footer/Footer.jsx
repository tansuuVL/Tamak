import React from 'react';
import styled from 'styled-components';
import { Flex } from '../../../UI/Flex';

const Footer = () => {
    return (
        <SFooter>
            <Flex gap="50px">
                <Clauses>
                    <Clause>    
                        <H3>Адресс</H3>
                        <Text>Табышалиева 29</Text>
                    </Clause>
                    <Clause>    
                        <H3>Соц. сети</H3>
                        <Text>instagram</Text>
                    </Clause>
                    <Clause>    
                        <H3>Контакты</H3>
                        <Text>+996704100502</Text>
                    </Clause>
                </Clauses>
            </Flex>
        </SFooter>
    );
}

export default Footer;

const SFooter= styled(Flex)`
    width: 100%;
    height: 150px;
    background: #FFAF9B;
    display:flex;
    justify-content:center;
    align-items:center;
`
const Clauses = styled.ul`
    margin: 0;
    padding: 0;
    display:flex;
    gap: 50px;
`
const Clause = styled.li`
    margin: 0;
    list-style-type:none;
    display:flex;
    flex-direction:column;
    gap: 15px;
    align-items:center;
`
const H3= styled.h3`
    color: #fff;
    font-weight: bold;
    font-size: 24px;
`
const Text = styled.p`
    margin: 0;
    font-size: 18px;
    color: #fff
`