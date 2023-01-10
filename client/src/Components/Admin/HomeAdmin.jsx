import { Flex, Highlight, Text, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequest } from "../../slices/userSlice";
import { useAuth } from "../AuthComponents/AuthContext";
import Sidebar from "./Sidebar";

const HomeAdmin = () => {
  const dispatch = useDispatch();

  const { user } = useAuth();
  let token = user.accessToken;

  const currentUser = useSelector((state) => state.user.user);
  const page = useSelector((state) => state.user.page);

  useEffect(() => {
    dispatch(getRequest({ token, page }));
  }, [dispatch, page]);

  return (
    <Flex position="relative"
      bg="#1F1F1F"
      minH="100vh"
      flexDirection={{ base: "column", sm: 'row' }}>
      <Sidebar />
      <Flex position="relative"
        w="100%"
        color="white"
      >
        <Flex flexDir="column"
          p="2rem"
          gap="1rem">
          <Box
            as="b"
            textTransform="uppercase"
            fontSize={{ base: "1.4rem", md: "1.8rem", lg: "2.2rem", xl: "3rem" }}
          >
            <Text display="inline" fontSize=".8em">
              ¡Bienvenido {" "}
            </Text>
            <Text display="inline" color="#FFFF99">
              {currentUser?.userSlack}
            </Text>
            <Text display="inline" >
              ! 👋
            </Text>
            <Text fontSize=".8em" textTransform="none" pl="1.2rem" >
              Estas en el panel de administrador.
            </Text>
          </Box>
          <Box h="1px" bg="#FFFF99"/>
          <Box fontSize={{ sm: '1rem', md: '1.2rem', lg: '1.4em' }} lineHeight={2} >
            <Text display="inline">
              Desde aquí podremos tener un seguimiento de lo que está pasando en la
              aplicación. {" "}
            </Text  >
            <Text fontSize=".9em" >
              Tenemos 3 apartados:
            </Text>
            <Box px="1rem" fontStyle="italic">
              <Box>
                <Highlight query='•' styles={{ color: "yellow" }}>
                  • Tablero: donde estamos ahora mismo.
                </Highlight >
              </Box>
              <Box>
                <Highlight query='•' styles={{ color: "yellow" }}>
                  • Cuentas: tabla con datos de todas las cuentas registradas.
                </Highlight>
              </Box>
              <Box>
                <Highlight query='•' styles={{ color: "yellow" }}>
                  • Peticiones: tabla con peticiones del usuario por responder.
                </Highlight>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomeAdmin;
