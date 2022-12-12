import {
    Flex
} from '@chakra-ui/react'
import CardsHome from '../../Card/CardsHome';
import PaginatedButtons from './PaginatedButtons/PaginatedButtons.jsx';
import SearchBar from './SearchBar/SearchBar';

const Paginated = () => {
    return (
        <Flex bg="#1F1F1F"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
            minH="90vh"
            p="1rem"
            gap="1rem">
                <SearchBar/>
                <CardsHome />
                <PaginatedButtons/>
        </Flex>
    )
}

export default Paginated;