import React, { useState } from 'react'
import {
    Button,
    HStack,
    Select,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalFooter,
    Divider,
    Input,
    InputGroup,
    InputRightElement,
    Box,
    Flex,
    Text
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchIcon } from '@chakra-ui/icons'
import { changeModuleFilter, changeOrder, changeTitleFilter, addFilterByTags } from '../../../../../slices/paginatedSlice'
import { useEffect } from 'react'

function ModalFilters() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const paginated = useSelector((state) => state.paginated);
    const dispatch = useDispatch()

    const setStoreTags = () => {
        const tags = paginated.tagsFilter
            ? paginated.tagsFilter.split('+')
            : []
        return tags
    }

    const [search, setSearch] = useState({
        searchInput: paginated.titleFilter,
        module: paginated.moduleFilter,
        tags: setStoreTags()
    })

    const [currentTag, setCurrentTag] = useState("")
    const [showButtonAdd, setShowButtonAdd] = useState(false)

    const addTag = () => {

        if (search.tags.some(elem => elem === currentTag.toUpperCase())) {
            return setCurrentTag("")
        }

        if (search.tags.length < 3) {
            setSearch({ ...search, tags: [...search.tags, currentTag.toUpperCase()] })
            setCurrentTag("")
        }

    }

    useEffect(() => {
        console.log(search)
        let disabled = false
        if (search.tags.length === 3) {
            disabled = true
        }
        setShowButtonAdd(disabled)
    }, [search])

    const handleSubmit = () => {
        dispatch(changeTitleFilter(search.searchInput))
        dispatch(changeModuleFilter(search.module))
        let stringTags = `${search.tags[0] ? search.tags[0] : ""}${search.tags[1] ? `+${search.tags[1]}` : ""}${search.tags[2] ? `+${search.tags[2]}` : ""}`
        dispatch(addFilterByTags(stringTags))
        onClose()
    }

    return (
        <div>
            <HStack position="relative"
                align="center"
                bg="#F2F2F2"
                p="1% 2%"
                spacing="1%"
                borderRadius="1.5rem"
                justify={'center'}>
                <HStack w='45%'>
                    <Button
                        padding={'0px 32px 1px 16px'}
                        borderRadius="10rem"
                        fontSize={{ base: '12px', sm: '16px' }}
                        outline='none'
                        _hover={{ outline: '1px solid #CBD5E0' }}
                        fontWeight='normal'
                        w={'100%'}
                        onClick={onOpen}>
                        Filtros
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay>
                            <ModalContent
                                margin={'8px'}
                                width='95%'
                                h='97%'
                                minH={'500px'}>
                                <ModalHeader>Filtros</ModalHeader>

                                <ModalCloseButton />
                                <Divider backgroundColor={'#FFFF01'} h='3px' />
                                <ModalBody pb={6}>
                                    <InputGroup w="100%" >
                                        <Input value={search.searchInput}
                                            onChange={e => setSearch({ ...search, searchInput: e.target.value })}
                                            placeholder='Buscar'
                                            borderRadius="10rem" />
                                        <InputRightElement width='3rem'>
                                            <SearchIcon fontSize="1.1rem" />
                                        </InputRightElement>
                                    </InputGroup>
                                    <Select mt={8} borderRadius="10rem"
                                        value={search.module}
                                        onChange={e => setSearch({ ...search, module: e.target.value })}>
                                        <option value="">Modulos</option>
                                        <option value={"M1"}>M1</option>
                                        <option value={"M2"}>M2</option>
                                        <option value={"M3"}>M3</option>
                                        <option value={"M4"}>M4</option>
                                    </Select>
                                    <HStack mt={8}>
                                        <Input value={currentTag}
                                            onChange={e => setCurrentTag(e.target.value)}
                                            onKeyDown={e => (e.key === "Enter") ? (showButtonAdd ? null : addTag()) : null}
                                            placeholder='Tags...'
                                        />
                                        <Button disabled={showButtonAdd} onClick={addTag}>Agregar</Button>
                                    </HStack>
                                    <Flex
                                        minHeight={'50px'}
                                        h={"auto"}
                                        alignItems="center"
                                        wrap={'wrap'}
                                        w={'100%'}
                                    >
                                        {search.tags.map((tag, index) => (
                                            <Flex
                                                backgroundColor={"#ffff01"} h={"30px"}
                                                alignItems="center"
                                                borderRadius={"15px"} p={"10px"}
                                                key={index}
                                                margin={'5px'}
                                            >

                                                <Text marginRight={"5px"} >{tag}</Text>
                                                <Box
                                                    bgColor={"black"}
                                                    color="white"
                                                    borderRadius={"50%"}
                                                    w="25px" h={"25px"}
                                                    textAlign="center"
                                                    cursor={"pointer"}
                                                    onClick={(e) => setSearch({ ...search, tags: search.tags.filter(e => e !== tag) })}
                                                    _hover={{ bg: "gray.100", color: 'black' }}
                                                    transition='ease-in 0.2s'>

                                                    <Text >x</Text>
                                                </Box>
                                            </Flex>
                                        ))
                                        }
                                    </Flex >
                                </ModalBody>

                                <ModalFooter>
                                    <Button onClick={handleSubmit} backgroundColor={'black'} color='#E4E400' mr={3} _hover={{ backgroundColor: '#E4E400', color: 'black' }}>
                                        Buscar
                                    </Button>
                                    <Button onClick={onClose} _hover={{ background: "tomato" }}>Cancelar</Button>
                                </ModalFooter>
                            </ModalContent>
                        </ModalOverlay>
                    </Modal>
                </HStack>
                <HStack w='45%'>
                    <Select borderRadius="10rem" value={paginated.order} fontSize={{ base: '12px', sm: '16px' }}
                        onChange={e => dispatch(changeOrder(e.target.value))}>
                        <option value={"newest"}>Más recientes</option>
                        <option value={"score"}>Puntuación</option>
                    </Select>
                </HStack>
            </HStack>
        </div>
    )
}

export default ModalFilters