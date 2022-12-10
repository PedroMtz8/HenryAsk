import { Box, Flex } from '@chakra-ui/react'
import Footer from './Footer/Footer'
import NavBar from '../NavBar/NavBar'

const Home = () => {

    return (
        <Box backgroundColor={"#1F1F1F"} h={"100vh"}>
            <NavBar />
            <Flex bg={"#1F1F1F"} h={"90vh"}>

            </Flex>
            <Footer />
        </Box>
    )
}


export default Home