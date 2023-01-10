
import { useAuth } from "../../AuthComponents/AuthContext"
import ModifyComment from '../Comments/ModifyComment'
import {
    Text,
    Box,
    Flex,
    useDisclosure,
    Tooltip
} from '@chakra-ui/react'
import moment from "moment"
import { localeData } from 'moment_spanish_locale';
import 'moment/locale/es';

const Comments = ({ dataComment }) => {

    const { user } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure()

    moment.updateLocale('es', localeData)
    let dif = moment(dataComment.createdAt).startOf('minutes').fromNow()

    return (
        <Flex borderTop="solid 1px"
            borderTopColor="gray.400"
            py=".8rem"
            w="100%"
            wordBreak={'break-word'}>
            <Box fontSize=".8rem"
                fontWeight="normal"
                textAlign="inherit"
                gap={"1rem"}>
                <Text display="inline-block">
                    {`${dataComment.body}`}
                </Text>
                <Text display="inline">
                    {" - "}
                </Text>
                <Text display="inline-block"
                    color="blue.500">
                    {`${dataComment.user.userSlack}`}
                </Text>
                <Text display="inline">
                    {" - "}
                </Text>
                <Text display="inline-block"
                    color="gray.500"
                    cursor="pointer">
                    <Tooltip label={new Date(dataComment.createdAt).toLocaleString()}
                        placement='top'>
                        {`${dif}`}
                    </Tooltip>
                </Text>
                {(dataComment.user._id === user.uid) &&
                    <>
                        <Text display="inline"
                            color="gray.500">
                            {" - "}
                        </Text>
                        <Text display="inline"
                            cursor="pointer"
                            p=".1rem .25rem"
                            bg="yellow.100"
                            color="gray"
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