import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
    HStack,
    Input,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    Box,
    Flex,
} from '@chakra-ui/react'
import { addFilterByTags } from '../../../../../slices/paginatedSlice';

const FilterTags = () => {

    const dispatch = useDispatch()
    const tagsFilter = useSelector((state) => state.paginated.tagsFilter);

    const setStoreTags = () => {
        const tags = tagsFilter
            ? tagsFilter.split('+')
            : []
        return tags
    }

    const [currentTag, setCurrentTag] = useState("")
    const [allTags, setAllTags] = useState(setStoreTags())
    const [showButtonAdd, setShowButtonAdd] = useState(false)

    const addTag = () => {

        if (allTags.some(elem => elem === currentTag)) {
            return setCurrentTag("");
        }

        if (allTags.length < 3) {
            setAllTags([...allTags, currentTag.toUpperCase()])
            setCurrentTag("")
        }
    }

    const applyFiltersByTag = () => {
        let stringTags = `${allTags[0] ? allTags[0] : ""}${allTags[1] ? `+${allTags[1]}` : ""}${allTags[2] ? `+${allTags[2]}` : ""}`
        dispatch(addFilterByTags(stringTags))
    }

    useEffect(() => {
        let disabled = false
        if (allTags.length === 3) {
            disabled = true
        }
        setShowButtonAdd(disabled)
    }, [allTags])

    return (
        <Popover>
            {({ onClose }) => (<>
                <PopoverTrigger>
                    <Button>Tags</Button>
                </PopoverTrigger>
                <PopoverContent >
                    <PopoverCloseButton />
                    <PopoverHeader>
                        <HStack>
                            <Input value={currentTag}
                                onChange={(e) => setCurrentTag(e.target.value)}
                                onKeyDown={e => (e.key === "Enter") ? (showButtonAdd ? null : addTag()) : null}
                            />
                            <Button disabled={showButtonAdd} onClick={addTag}>Agregar</Button>
                            <Button
                                onClick={e => { applyFiltersByTag(); onClose() }}
                            >
                                Aceptar
                            </Button>
                        </HStack>
                    </PopoverHeader>
                    <PopoverBody >
                        <HStack h={"3rem"} spacing={4}>
                            {allTags.map((tag, i) =>
                                <Box position="relative"
                                    key={i}
                                    bg="#FFFF01"
                                    p=".4rem 1rem"
                                >
                                    <Flex position="absolute"
                                        color="white"
                                        boxSize=".7rem"
                                        fontSize=".7rem"
                                        alignItems="center"
                                        justifyContent="center"
                                        bg="red"
                                        top="0rem"
                                        right="0rem"
                                        borderRadius="0rem"
                                        cursor="pointer"
                                        onClick={(e) => setAllTags(allTags.filter(e => e !== tag))}
                                    >
                                        x
                                    </Flex>
                                    {tag}
                                </Box>)
                            }
                        </HStack>
                    </PopoverBody>
                </PopoverContent>
            </>)}
        </Popover>
    )

}

export default FilterTags;