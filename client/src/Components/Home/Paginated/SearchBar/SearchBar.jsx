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

const SearchBar = () => {
    return (
        <FormControl w="70%" fontSize=".9rem" >
            <HStack position="relative"
                align="center"
                bg="#F2F2F2"
                p="1% 2%"
                spacing="3.5%"
                borderRadius="1.5rem">
                <InputGroup w="32%" >
                    <Input placeholder='Buscar'
                        borderRadius="10rem" />
                    <InputRightElement width='3rem'>
                        <SearchIcon
                            fontSize="1.1rem"
                            onClick={e => console.log(e)} />
                    </InputRightElement>
                </InputGroup>
                <HStack w="32%">
                    <Text w="6rem">
                        Filtrar por:
                    </Text>
                    <Select borderRadius="10rem">
                        <option >Puntuación</option>
                    </Select>
                </HStack>
                <HStack w="33%">
                    <Text w="6rem">
                        Filtrar por:
                    </Text>
                    <Select borderRadius="10rem">
                        <option >Modulo</option>
                    </Select>
                </HStack>
            </HStack>
        </FormControl>
    )
}

export default SearchBar;