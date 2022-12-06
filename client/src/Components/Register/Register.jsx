import {
    Flex,
    Text,
    Image
} from '@chakra-ui/react'
import FormRegister from './FormRegister/FormRegister'

const Register = () => {

    return (
        <Flex position='relative'
            h='100vh'
            w='100vw'
            bg='#FFFFFF'
            flexWrap="wrap">
            <Flex w='50%' h="95vh"
                bg="#ffff01" />
            <Flex w='50%' h="95vh"
                justifyContent="center"
                alignItems="center">
                    <FormRegister />
            </Flex>
            <Flex h="5vh"
                w='100%'
                bg="black"
                color="white"
                fontSize=".8rem"
                fontWeight="light"
                justifyContent={"space-evenly"}
                alignItems="center">
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
        </Flex>
    )
}

export default Register