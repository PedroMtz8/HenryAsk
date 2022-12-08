import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ChatIcon } from "@chakra-ui/icons";

const CardHome = () => {
  return (
    <div style={{ padding: "10px" }}>
      <Card overflow="hidden" variant="outline" boxShadow="dark-lg">
        <Image
          padding={{ base: "7px" }}
          objectFit="cover"
          maxW={{ sm: "80px" }}
          maxHeight={{ base: "80px" }}
          borderRadius="60px"
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="md">Titulo de la consulta</Heading>

            <Text py="2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos culpa
              rem consectetur earum iure reiciendis repellat, sint aspernatur
              enim quaerat?
            </Text>
          </CardBody>

          <CardFooter justifyContent="end" padding={"20px"}>
            <Button variant="outline">
              <ChatIcon marginRight={"3px"} /> Comentarios
            </Button>
            <Button variant="solid" bgColor={"#ffff01"} marginLeft={"7px"}>
              Responder
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
};

export default CardHome;
