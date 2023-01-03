import { Flex, Image, Text, Box } from "@chakra-ui/react"

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
                Hecho con 💛 Henry Hackathon © 2022 | Todos los derechos reservados.
            </Text>
            <Box>
                <Text display="inline">
                    ¿Consultas y dudas? Escríbenos a {' '}
                </Text>
                <Text display="inline" color={"#FFFF01"} fontWeight="semibold">
                    henryask.soporte@gmail.com
                </Text>
            </Box>
        </Flex>
    )
}


export default Footer