import {
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    FormControl,
    Select,
    Button
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useDispatch } from 'react-redux'
import { changeModuleFilter, changeOrder } from '../../../../slices/paginatedSlice'

const SearchBar = () => {

    const dispatch = useDispatch()

    return (
        <FormControl w="95%" fontSize=".9rem" >
            <HStack position="relative"
                align="center"
                bg="#F2F2F2"
                p="1% 2%"
                spacing="1%"
                borderRadius="1.5rem">
                <InputGroup w="25%" >
                    <Input placeholder='Buscar'
                        borderRadius="10rem" />
                    <InputRightElement width='3rem'>
                        <SearchIcon
                            fontSize="1.1rem"
                            onClick={e => console.log(e)} />
                    </InputRightElement>
                </InputGroup>
                <HStack w="25%">
                    <Text w="8rem">
                        Ordenar por :
                    </Text>
                    <Select borderRadius="10rem"
                        onChange={e => dispatch(changeOrder(e.target.value))}>
                        <option value={"newest"}>Más recientes</option>
                        <option value={"score"}>Puntuación</option>
                    </Select>
                </HStack>
                <HStack w="25%">
                    <Text w="6rem">
                        Filtrar por :
                    </Text>
                    <Select borderRadius="10rem"
                        placeholder='Modulos'
                        onChange={e => dispatch(changeModuleFilter(e.target.value))}>
                        <option value={"M1"}>M1</option>
                        <option value={"M2"}>M2</option>
                        <option value={"M3"}>M3</option>
                        <option value={"M4"}>M4</option>
                    </Select>
                </HStack>
            </HStack>
        </FormControl>
    )
}

export default SearchBar;