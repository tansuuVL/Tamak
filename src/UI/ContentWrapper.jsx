import React from 'react';
import { Flex } from './Flex';
import styled from 'styled-components'

const Contentwrapper = ({children, direction, padding, gap}) => {

    return (
        <SContentwrapper gap={gap} direction={direction} padding={padding}>
            {children}
        </SContentwrapper>
    );
}

export default Contentwrapper;

const SContentwrapper = styled(Flex)`
    width: 100%;
    padding:${({padding}) => padding || "30px 50px"};
    flex-direction:${({direction}) => direction || "column"};
    gap: ${({gap}) => gap || "0"}
`