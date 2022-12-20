import {
    Flex,
    Text,
    Image,
    Box,
    SimpleGrid
} from '@chakra-ui/react'
import FormLogin from './FormLogin/FormLogin'
import Footer from '../Footer/Footer'

const Login = () => {

    return (
        <Flex
            h='100vh'
            w='100%'
            bg='#FFFFFF'
            flexFlow={"column"}
        >
            <SimpleGrid h={"95vh"} w='100%' columns={{ lg: 2 }}>
                <Box
                    display={{ base: "none", md: "none", lg: "flex" }}
                    bg={"#ffff01"} />
                <Flex
                    justifyContent="center"
                    alignItems="center">
                    <FormLogin />
                </Flex>
            </SimpleGrid>
            <Footer />
        </Flex>
    )
}

export default Login