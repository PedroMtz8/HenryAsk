import {
    Text,
    Box,
    Flex
} from '@chakra-ui/react'

const Comments = ({ dataComment }) => {

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
            </Box >
        </Flex>
    )
}

export default Comments;