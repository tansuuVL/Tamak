import React from 'react';
import styled from 'styled-components';
import Contentwrapper from '../../../../UI/ContentWrapper';
import { Flex } from '../../../../UI/Flex';
import Footer from '../../Footer/Footer'

const About = () => {
    return (
        <>
        <Contentwrapper>
            <SAbout>
                <Title>О нас</Title>
                <TextWrapper>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nam cum nesciunt odio fugit quaerat ex atque velit, praesentium quibusdam eum sapiente sunt, obcaecati cupiditate itaque amet? Accusantium, rem veritatis voluptas nemo voluptate tempora deserunt magnam perferendis voluptatibus ea provident? Nihil velit ducimus tenetur expedita optio? Ratione nesciunt consectetur totam perferendis porro sapiente deleniti cum soluta, doloribus voluptatum quae ut molestias ullam magnam eligendi iusto enim dolores. Ea natus magnam beatae, officia sint omnis nisi optio id nobis eum fugiat, ipsum laboriosam quasi asperiores, perspiciatis voluptate ratione repudiandae commodi magni. Ratione sint cupiditate, atque deleniti beatae numquam soluta nemo similique iure a, recusandae, harum aspernatur perferendis alias. Ipsa assumenda numquam suscipit, explicabo omnis impedit labore vitae perferendis! Officiis deleniti quod in doloribus minima consequatur ea dicta neque, ut, qui, molestias molestiae asperiores. Voluptate incidunt tempore velit quae beatae rem accusamus accusantium nihil architecto odio reiciendis dolorum, eaque ab? Voluptas reiciendis facere reprehenderit quod delectus fuga exercitationem, mollitia animi accusantium beatae dolor possimus fugit sunt repudiandae, consequuntur culpa nesciunt iure eum eaque? Autem tempora velit sapiente vitae et! Sapiente beatae architecto unde eos facere eius, quibusdam rem animi quo, inventore excepturi deleniti corrupti minima, blanditiis distinctio sed nemo sit in? Laboriosam!
                    </Text>
                </TextWrapper>
            </SAbout>
        </Contentwrapper>
        <Footer />
        </>
    );
}

export default About;

const SAbout = styled(Flex)`
    width: 100%;
    flex-direction:column;
`
const Title = styled.h1`
    align-self:center;
`
const TextWrapper = styled(Flex)`
    max-width: 660px;
    text-align:center;
    margin: 0 auto;
`
const Text = styled.p`
    font-size: 16px;
`