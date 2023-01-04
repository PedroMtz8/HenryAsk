import { Center, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import rocket from "../../../assets/CrashedRocket.png";

const ErrorPage = ({ numb_err, error }) => {
  const navigate = useNavigate();
  return (
    <Center m="40px auto">
      <Flex flexDir="column">
        <Text textAlign="center" as="b" fontSize="30px">
          {numb_err} NOT FOUND
        </Text>
        <img src={rocket} alt="" />
        <Text textAlign="center" fontSize="20px">
          {error} prueba volver al{" "}
          <Link to="/">
            <b>inicio</b>.
          </Link>
        </Text>
      </Flex>
    </Center>
  );
};

export default ErrorPage;
