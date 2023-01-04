import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../AuthComponents/AuthContext";
import SearchbarAdmin from "./SearchbarAdmin";
import Sidebar from "./Sidebar";
import axios from "axios";
import { getRequest } from "../../slices/userSlice";
import PaginatedAdmin from "./PaginatedAdmin";

const ReqAdmin = () => {
  const dispatch = useDispatch();

  const { user } = useAuth();
  let token = user.accessToken;

  const page = useSelector((state) => state.user.page);
  const req = useSelector((state) => state.user.requests);
  const maxPag = useSelector((state) => state.user.reqMaxPages);

  useEffect(() => {
    dispatch(getRequest({ token, page }));
  }, [dispatch, page]);

  return (
    <Flex>
      <Sidebar />
      <div style={{ margin: "20px auto" }}>
        <SearchbarAdmin name="Petición" op1="Registro" op2="Cambio de rol" />
        <Text
          mb="20px"
          align="center"
          fontWeight="bold"
          textTransform="uppercase"
        >
          Peticiones
        </Text>
        {req.length > 0 ? (
          <>
            <TableContainer
              border="1px solid gray"
              borderRadius="10px"
              boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.5)"
            >
              <Table
                variant="striped"
                colorScheme="blackAlpha"
                size={{ base: "sm", md: "md", lg: "lg" }}
              >
                <Thead backgroundColor="#ffff01" textAlign="center">
                  <Tr>
                    <Th textAlign="center">Usuario</Th>
                    <Th textAlign="center">Email</Th>
                    <Th textAlign="center">Rol</Th>
                    <Th textAlign="center">Petición</Th>
                    <Th textAlign="center">Acciones</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {req.map((req) => (
                    <Tr textAlign="center" key={req.user._id}>
                      <Td textAlign="center"> {req.user.userSlack} </Td>
                      <Td textAlign="center"> {req.user.mail} </Td>
                      <Td textAlign="center"> {req.rol} </Td>
                      <Td textAlign="center">Registro</Td>
                      <Td>
                        <Button mr="3px" colorScheme="green">
                          Aceptar
                        </Button>
                        <Button colorScheme="red">Denegar</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <PaginatedAdmin maxPages={maxPag} />
          </>
        ) : (
          <Text mb="20px" align="center" textTransform="uppercase">
            No hay peticiones actualmente.
          </Text>
        )}
      </div>
    </Flex>
  );
};

export default ReqAdmin;
