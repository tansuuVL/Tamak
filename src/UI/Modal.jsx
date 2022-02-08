import React from 'react';
import styled from 'styled-components'
import { Flex } from './Flex';
import x from '../media/Group 6.png'
import { useRef } from 'react';

const Modal = ({children, visible, setVisible}) => {
    const modalRef = useRef()

    if(visible) {
        document.body.style.overflowY = "hidden"
    }else {
        document.body.style.overflow = "auto"
    }

    return (
        <>
            <Loyout ref={modalRef} name="lay" onClick={e => e.target.value === e.target.ref ? setVisible(false) : false} visible={visible}>
                <SModal>
                    <X onClick={() => setVisible(false)}>
                        <img src={x} alt="close the modal button" width="100%" />
                    </X>
                    {children}
                </SModal>
            </Loyout>
        </>
    );
}

export default Modal;

const Loyout = styled(Flex)`

    position: fixed;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    justify-content:center;
    padding-top: 85px;
    top: 0;
    left: 0;

    opacity: ${({visible}) => visible ? 1:0};
    display:${({visible}) => visible ? visible : "none"};
    transition-duration:1s
`
const SModal = styled(Flex)`
    width: 500px;
    height: 400px;
    background: #fff;
    padding: 15px;
    position: relative
`
const X = styled.span`
    position: absolute;
    width: 30px;
    right: 30px;
    top: 30px;
`