import {
    Grid,
    GridItem,
    Flex,
    Heading,
    Image,
    Text
} from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";

const CardAnswer = () => {

    return (
        <Grid position="relative"
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(8, 1fr)'
            p=".8rem"
            boxSize="100%"
            gap="1rem">
            <GridItem rowSpan={2} colSpan={1} align="center" >
                <Image
                    objectFit="cover"
                    mt=".8rem"
                    w="5rem"
                    h="5rem"
                    borderRadius="5rem"
                    src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                    alt="Caffe Latte"
                />
                <Image w="2.1rem" mt=".5rem"
                    src="https://i.postimg.cc/rw0MgSxN/medalla-6.png" alt="userImage" />
            </GridItem >
            <GridItem rowSpan={2} colSpan={6} direction="column">
                <Flex alignItems="center"
                    gap=".4rem"
                    fontSize=".75rem"
                    fontWeight="bold">
                    <Text >
                        {`userSlack • fecha`}
                    </Text>
                    <Image w="1.4rem" alignSelf="flex-start"
                        src="https://i.postimg.cc/TwrFYv4p/image-30.png" alt="userImage" />
                    <Text >
                        392492393492
                    </Text>
                </Flex>
                <Heading size="sm">
                    Titulo comentario
                </Heading>
                <Text>
                    Body comentario
                </Text>
            </GridItem>
            <GridItem rowSpan={2} colSpan={1} align="center"
                fontSize="2rem">
                <TriangleUpIcon />
                <Text>20</Text>
                <TriangleDownIcon />
            </GridItem>
        </Grid>
    )
}

export default CardAnswer;