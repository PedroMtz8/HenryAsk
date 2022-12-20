import { Flex, Image, Text } from "@chakra-ui/react"

const Footer = () => {

    return (
        <Flex height={{ base: "200px", md: "200px", lg: "5vh" }}
            w='100%'
            bg="black"
            color="white"
            fontSize=".8rem"
            fontWeight="light"
            justifyContent={"space-evenly"}
            flexDirection={{ base: "column", md: "column", lg: "initial" }}
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
    )
}


export default Footer