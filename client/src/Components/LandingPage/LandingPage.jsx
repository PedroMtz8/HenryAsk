import { Flex, Heading, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    return (
        <Flex bg="black"
            w='100vw'
            h='100vh'
            justifyContent="center"
            alignItems="center">
            <Flex flexDirection="column"
                alignItems="center"
                gap={"1rem"}>
                <Heading color="whiteAlpha.900"
                    as="h1"
                    textAlign="center">
                    Bienvenido a Henry Ask
                </Heading>
                <Button
                    onClick={() => navigate("/login")}
                    bg="#ffff01"
                    w="75%">
                    Log In
                </Button>
            </Flex>
        </Flex>
    )
}

export default Home