import { Flex } from '@chakra-ui/react'
import Footer from './Footer/Footer'

const Home = () => {

    return (
        <Flex h="150vh"
            maxW="100vw"
            bg="#1F1F1F"
            flexDirection="column"
            justifyContent="space-between">
            <Flex bg="#000000"
                h="22vh"  >
            </Flex>
            <Footer />
        </Flex>
    )
}


export default Home