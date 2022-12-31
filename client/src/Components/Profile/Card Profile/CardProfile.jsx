import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Heading,
    Image,
    Stack,
    Text,
  } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";


const CardProfile = ({ title, description, id, answer }) => {

    return(
        <>
        {
          answer ?
          <Link to={`/home/post/${answer.post}`}>
            <Card
        overflow="hidden"
        variant="outline"
        boxShadow="dark-lg"
          height={"150px"}
          direction={"row"}
          bg={"white"}
      >

          <Stack color={"black"}>
          <CardBody  overflow={"hidden"}>
            <Box display={"flex"} overflow={"hidden"}>
                <Text py="2" h={"80px"} overflow={"hidden"} >{description}</Text>

            </Box>
          </CardBody>
        </Stack>
      </Card>
          </Link> 
          : 
          <Card
          overflow="hidden"
          variant="outline"
          boxShadow="dark-lg"
            height={"150px"}
            direction={"row"}
            bg={"white"}
        >
         {/*  <Image
            padding={{ base: "7px" }}
            objectFit="cover"
              maxW={"70px"}
              maxHeight={"70px"}
            borderRadius="60px"
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          /> */}
  
            <Stack color={"black"}>
            <CardBody  overflow={"hidden"}>
                <Link to={`/home/post/${id}`}>
              <Heading  size="md">{title}</Heading>
              </Link>
              <Box display={"flex"} overflow={"hidden"}>
                  <Text py="2" h={"80px"} overflow={"hidden"} >{description}</Text>
  
              </Box>
            </CardBody>
          </Stack>
        </Card>
        }
    
      </>   
    )
}

export default CardProfile