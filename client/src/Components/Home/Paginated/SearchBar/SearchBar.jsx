import {
    FormControl,
} from '@chakra-ui/react'
import {
    useWindowWidth,
} from '@react-hook/window-size'
import SelectFilters from './SelectFilters/SelectFilters'
import ModalFilters from './ModalFilters/ModalFilters'

const SearchBar = () => {

    const widthScreen = useWindowWidth()
    return (
        <FormControl w={{ base: '90%', 'lg': '70%' }} fontSize=".9rem" >
            {
                widthScreen > 680
                    ? <SelectFilters />
                    : <ModalFilters />
            }

        </FormControl>
    )
}

export default SearchBar;