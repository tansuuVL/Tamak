
   
import styled, { css } from 'styled-components'

const StyledFlex = styled.div`
    width: ${({width}) => width || "auto"};
    height: ${({height}) => height || "auto"};
    display: flex;
    flex-direction: ${({direction}) => direction || "row"}; 
    align-items: ${({align}) => align || "flex-start"};
    justify-content: ${({justify}) => justify || "flex-start"};
    gap: ${({gap}) => gap || "0"};
    padding: ${({padding}) => padding || "0"};
    margin: ${({margin}) => margin || "0"};
    box-shadow: ${({shadow}) => shadow || "none"}; 
    background: ${({bg}) => bg || ''};
    ${props => props.bottomLine && css`
        border-bottom: 1px solid #e3e3e3;
    `};
    ${props => props.topLine && css`
        border-top: 1px solid #e3e3e3;
    `};
`

export const Flex = (props) =>  <StyledFlex {...props}/>