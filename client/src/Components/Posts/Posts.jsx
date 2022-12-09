import React from "react";
import {
  Textarea,
  Container,
  Text,
  Button,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

const Posts = () => {
  return (
    <div
      style={{
        width: "60%",
        margin: "auto",
        marginTop: "150px",
        borderRadius: "20px",
        border: "1px solid gray",
        padding: "50px 30px",
      }}
    >
      <div>
        <Text fontSize="xl" mb="10px">
          Gracias por contribuir con tu respuesta en HenryAsk
        </Text>
        <UnorderedList mb="20px">
          <ListItem>
            Asegúrese de responder la pregunta. Provea detalles y comparta
            imagen de investigación.
          </ListItem>
          <ListItem>
            Por favor, no hable desde su opinión, fundamente con referecias y/o
            teoría.
          </ListItem>
        </UnorderedList>
      </div>
      <Text fontSize="2xl" mb="20px">
        Cuerpo
      </Text>
      <Textarea
        rows={15}
        resize="none"
        size="lg"
        placeholder="Escriba aquí su pregunta..."
        variant="filled"
      ></Textarea>
      <div
        style={{ display: "flex", justifyContent: "end", marginTop: "20px" }}
      >
        <Button bgColor={"#ffff01"} padding="0 55px">
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default Posts;
