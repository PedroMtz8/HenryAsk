import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import Sidebar from "./Sidebar";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

const Accounts = () => {
  return (
    <Flex>
      <Sidebar />
      <TableContainer
        m="20px auto"
        border="1px solid gray"
        borderRadius="10px"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.5)"
      >
        <Table variant="striped" colorScheme="blackAlpha" size="lg">
          <Thead backgroundColor="#ffff01" textAlign="center">
            <Tr>
              <Th textAlign="center" isNumeric>
                ID
              </Th>
              <Th textAlign="center">Usuario</Th>
              <Th textAlign="center">Email</Th>
              <Th textAlign="center">Rol</Th>
              <Th textAlign="center">Estatus</Th>
              <Th textAlign="center">Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr textAlign="center">
              <Td isNumeric>1</Td>
              <Td>Jorge123</Td>
              <Td>Jorge123@gmail.com</Td>
              <Td>Estudiante</Td>
              <Td>Pendiente</Td>
              <Td>
                <Button mr="3px" colorScheme="green">
                  Aceptar
                </Button>
                <Button colorScheme="red">Denegar</Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default Accounts;
