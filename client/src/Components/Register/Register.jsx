import {
    Flex,
    Box,
    SimpleGrid
} from '@chakra-ui/react'
import FormRegister from './FormRegister/FormRegister'
import Footer from '../Footer/Footer'

const Register = () => {

    return (
        <Flex
            height='100vh'
            w='100%'
            bg='#FFFFFF' 
            flexFlow="column" >

            <SimpleGrid h={"95vh"} w='100%' columns={{ lg: 2 }}>
                <Box
                    display={{ base: "none", md: "none", lg: "flex" }}
                    bg="#ffff01" />
                <Flex
                    justifyContent="center"
                    alignItems="center">
                    <FormRegister />
                </Flex>
            </SimpleGrid>
            <Footer />
        </Flex >
    )
}

export default Register