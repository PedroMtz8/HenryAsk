import { Box } from '@chakra-ui/react'
import Footer from './Footer/Footer'
import NavBar from '../NavBar/NavBar'
import Paginated from './Paginated/Paginated'

const Home = () => {

    return (
        <Box >
            <NavBar />
            <Paginated />
            <Footer />
        </Box>
    )
}


export default Home