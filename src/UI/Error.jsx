
   
import React from 'react'
import styled from 'styled-components'
import { Flex } from './Flex'

export default function Error({text, ...props}) {
    return (
        <SError {...props}>
            <P>{text ? text: "An error occured!"}</P>
        </SError>
    )
}

const SError = styled(Flex)`
    width: 100%;
    height: 100vh;
    justify-content:center;
    align-items:center
`
const P = styled.p`
    color: red;
    font-size: 18px;
`