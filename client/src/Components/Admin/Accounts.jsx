import { Button, Flex, Grid } from "@chakra-ui/react";
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
import SearchbarAdmin from "./SearchbarAdmin";

const Accounts = () => {
  return (
    <Flex>
      <Sidebar />
      <div style={{ margin: "20px auto" }}>
        <SearchbarAdmin />
        <TableContainer
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
                <Th textAlign="center">Petición</Th>
                <Th textAlign="center">Estatus</Th>
                <Th textAlign="center">Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr textAlign="center">
                <Td textAlign="center" isNumeric>
                  1
                </Td>
                <Td textAlign="center">Jorge123</Td>
                <Td textAlign="center">Jorge123@gmail.com</Td>
                <Td textAlign="center">Estudiante</Td>
                <Td textAlign="center">Registro</Td>
                <Td textAlign="center">Pendiente</Td>
                <Td>
                  <Button mr="3px" colorScheme="green">
                    Aceptar
                  </Button>
                  <Button colorScheme="red">Denegar</Button>
                </Td>
              </Tr>
              <Tr textAlign="center">
                <Td isNumeric>2</Td>
                <Td>Amanda123</Td>
                <Td>Amanda123@gmail.com</Td>
                <Td>Administrador</Td>
                <Td>Cambio de rol</Td>
                <Td>Aceptado</Td>
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
      </div>
    </Flex>
  );
};

export default Accounts;
