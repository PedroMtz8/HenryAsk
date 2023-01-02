import {
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Select
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { changeModuleFilter, changeOrder, changeTitleFilter } from '../../../../../slices/paginatedSlice'
import FilterTags from '../FilterTags/FilterTags'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
function SelectFilters() {
    const dispatch = useDispatch()
    const paginated = useSelector((state) => state.paginated);

    const [searchInput, setSearchInput] = useState(paginated.titleFilter)
    return (
        <div>
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
                <HStack w='32%'>
                    <Select borderRadius="10rem" value={paginated.order} fontSize='16px'
                        onChange={e => dispatch(changeOrder(e.target.value))}>
                        <option value={"newest"}>Más recientes</option>
                        <option value={"score"}>Mejor puntuación</option>
                    </Select>
                </HStack>
                <HStack w="32%">
                    <Select borderRadius="10rem"
                        value={paginated.moduleFilter}
                        onChange={(e) => dispatch(changeModuleFilter(e.target.value))}>
                        <option value="">Modulos</option>
                        <option value={"M1"}>M1</option>
                        <option value={"M2"}>M2</option>
                        <option value={"M3"}>M3</option>
                        <option value={"M4"}>M4</option>
                        <option value="Graduado">Graduado</option>
                    </Select>
                    <FilterTags />
                </HStack>

            </HStack>
        </div>
    )
}

export default SelectFilters