import React from 'react';
import styled from 'styled-components';
import { Flex } from './Flex';

const Unfound = ({text}) => {
    return (
        <SUnfound>
            <H2>{text ? text: "Не найдено.."}</H2>
        </SUnfound>
    );
}

export default Unfound;

const SUnfound = styled(Flex)`
    width: 100%;
    height: 100px;
    justify-content:center;
    align-items:center
`
const H2 = styled.h2`
    font-size: 24px;
    color: gray;
`