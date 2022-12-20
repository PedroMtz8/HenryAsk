import {
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    FormControl,
    Select
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useDispatch } from 'react-redux'
import { changeModuleFilter, changeOrder, changeTitleFilter } from '../../../../slices/paginatedSlice'
import FilterTags from './FilterTags/FilterTags'
import { useState } from 'react'

const SearchBar = () => {

    const dispatch = useDispatch()

    const [searchInput, setSearchInput] = useState("")

    return (
        <FormControl w="70%" fontSize=".9rem" >
            <HStack position="relative"
                align="center"
                bg="#F2F2F2"
                p="1% 2%"
                spacing="1%"
                borderRadius="1.5rem">
                <InputGroup w="32%" >
                    <Input value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        onKeyDown={e => (e.key === "Enter") ? dispatch(changeTitleFilter(searchInput)) : null}
                        placeholder='Buscar'
                        borderRadius="10rem" />
                    <InputRightElement width='3rem'>
                        <SearchIcon
                            fontSize="1.1rem"
                            onClick={e => dispatch(changeTitleFilter(searchInput))} />
                    </InputRightElement>
                </InputGroup>
                <HStack w="32%">
                    <Text w="8rem">
                        Ordenar por:
                    </Text>
                    <Select borderRadius="10rem"
                        onChange={e => dispatch(changeOrder(e.target.value))}>
                        <option value={"newest"}>Más recientes</option>
                        <option value={"score"}>Puntuación</option>
                    </Select>
                </HStack>
                <HStack w="32%">
                    <Text w="8rem">
                        Filtrar por:
                    </Text>
                    <Select borderRadius="10rem"
                        placeholder='Modulos'
                        onChange={e => dispatch(changeModuleFilter(e.target.value))}>
                        <option value={"M1"}>M1</option>
                        <option value={"M2"}>M2</option>
                        <option value={"M3"}>M3</option>
                        <option value={"M4"}>M4</option>
                    </Select>
                    <FilterTags/> 
                </HStack>
            </HStack>
        </FormControl>
    )
}

export default SearchBar;