import {
    Flex,
    Text,
    Image,
    Box,
    SimpleGrid
} from '@chakra-ui/react'
import FormRegister from './FormRegister/FormRegister'

const Register = () => {

    return (
        <Flex
            height='100vh'
            w='100%'
            bg='#FFFFFF' flexFlow={"column"} >

            <SimpleGrid h={"95vh"} w='100%' columns={{ lg: 2 }}>
                <Box
                    display={{ base: "none", md: "none", lg: "flex" }}
                    bg={"#ffff01"} />
                <Flex
                    justifyContent="center"
                    alignItems="center">
                    <FormRegister />
                </Flex>
            </SimpleGrid>


            <Flex height={{ base: "200px", md: "200px", lg: "5vh" }}
                w='100vw'
                bg="black"
                color="white"
                fontSize=".8rem"
                fontWeight="light"
                justifyContent={"space-evenly"}
                flexDirection={{ base: "column", md: "column", lg: "initial" }}
                alignItems="center"
            >
                <Image src='https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png'
                    alt='logoHenry'
                    w="5rem" />
                <Text>
                    Hecho con 💛. Henry © 2022 | Todos los derechos reservados.
                </Text>
                <Text>
                    ¿Consultas y dudas? Escríbenos a admisiones@soyhenry.com
                </Text>
            </Flex>
        </Flex >
    )
}

export default Register