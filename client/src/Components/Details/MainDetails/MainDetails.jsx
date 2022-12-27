import {
    Flex,
    Text,
    Image,
    Heading,
    Box,
    Stack
} from '@chakra-ui/react'
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons'
import Editor from '../../DetailBody/DetailBody'

const MainDetails = ({ dataPost }) => {

    return (
        <>
            <Flex position="relative"
                alignItems="flex-start"
                w="80%"
                minH="10rem"
                mt="3rem"
                p="1%"
                bg="#F2F2F2"
                borderRadius="md"
                fontWeight="semibold"
                gap="2%">
                <Flex w="7rem"
                    flexDir="column"
                    alignItems="center"
                    gap="1rem">
                    <Image src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                        alt="Caffe Latte"
                        w="5rem"
                        h="5rem"
                        borderRadius="5rem"
                    />
                    <Stack fontSize="2rem">
                        <TriangleUpIcon />
                        <Text>20</Text>
                        <TriangleDownIcon />
                    </Stack>
                </Flex>
                <Flex flexDir="column"
                    justifyContent="space-between"
                    w="full"
                    minH="14rem"
                    gap="2rem">
                    <Stack spacing={4}>
                        <Flex gap=".5rem" fontSize=".8rem">
                            <Text >
                                {dataPost.post.user.userSlack} • {dataPost.post.createdAt}
                            </Text>
                            <Image w="1.4rem" alignSelf="flex-start"
                                src="https://i.postimg.cc/TwrFYv4p/image-30.png" alt="userImage" />
                            {dataPost.post.score}
                        </Flex>
                        <Heading fontSize="1.2rem" as="h2">
                            {dataPost.post.title}
                        </Heading>
                        <Editor body={dataPost.post.body} />
                    </Stack>
                    <Flex justifyContent="space-between">
                        <Text>Comentarios: (5) <TriangleDownIcon /></Text>
                        <Flex gap="1rem" mr="2%">
                            {
                                dataPost.post.tags.map((e, i) =>
                                    <Box key={i}
                                        bg="#FFFF01"
                                        p=".4rem .7rem"
                                    >
                                        {e}
                                    </Box>
                                )
                            }
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex>

            </Flex>
        </>
    )
}

export default MainDetails;

/* <Text>{dataPost.post.body}</Text> */