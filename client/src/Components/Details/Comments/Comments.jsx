
import { useAuth } from "../../AuthComponents/AuthContext"
import ModifyComment from '../Comments/ModifyComment'
import {
    Text,
    Box,
    Flex,
    useDisclosure
} from '@chakra-ui/react'

const Comments = ({ dataComment }) => {

    const { user } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex borderTop="solid 1px"
            borderTopColor="gray.400"
            py=".8rem"
            w="100%">
            <Box fontSize=".8rem"
                fontWeight="normal"
                textAlign="justify">
                <Text display="inline">
                    {dataComment.body} {" - "}
                </Text>
                <Text display="inline"
                    color="blue.500">
                    {dataComment.user.userSlack} {" - "}
                </Text>
                <Text display="inline"
                    color="gray.500">
                    {dataComment.createdAt}
                </Text>
                {(dataComment.user._id === user.uid) &&
                    <>
                        <Text display="inline"
                            color="gray.500">
                            {" - "}
                        </Text>
                        <Text display="inline"
                            cursor="pointer"
                            p=".0rem .25rem"
                            bg="yellow"
                            color="black"
                            onClick={onOpen}>
                            Modificar
                        </Text>
                        <ModifyComment isOpen={isOpen}
                            onClose={onClose}
                            id={dataComment._id}
                        />
                    </>
                }
            </Box >
        </Flex>
    )
}

export default Comments;