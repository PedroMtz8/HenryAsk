import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
import { useAuth } from "../AuthComponents/AuthContext";
import PaginatedAdmin from "./PaginatedAdmin";
import { getUserByRol, getUsers } from "../../slices/userSlice";

const Accounts = () => {
  const dispatch = useDispatch();

  const { user } = useAuth();
  let token = user.accessToken;

  const accounts = useSelector((state) => state.user);
  const users = accounts.users;
  const maxPag = useSelector((state) => state.user.usersMaxPages);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getUsers({ token, page: accounts.page }));
    setLoading(false);
  }, [dispatch, accounts.page]);

  const handleChangeFilter = (e) => {
    e.preventDefault();

    if (e.target.value === "all") {
      dispatch(getUsers({ token, page: accounts.page }));
    } else {
      dispatch(
        getUserByRol({ page: accounts.page, rol: e.target.value, token })
      );
    }
    setLoading(false);
  };

  return (
    <Flex>
      <Sidebar />
      <div style={{ margin: "20px auto" }}>
        <SearchbarAdmin
          name="Rol"
          op1="Estudiante"
          op2="Administrador"
          op3="Henry Hero"
          op4="Graduado"
          op5="TA"
          isAccounts={true}
          handleChangeFilter={handleChangeFilter}
        />
        <Text
          mb="20px"
          align="center"
          fontWeight="bold"
          textTransform="uppercase"
        >
          Lista de cuentas
        </Text>
        {users.length > 0 ? (
          <>
            <TableContainer
              border="1px solid gray"
              borderRadius="10px"
              boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.5)"
            >
              <Table variant="striped" colorScheme="blackAlpha" size="lg">
                <Thead backgroundColor="#ffff01" textAlign="center">
                  <Tr>
                    <Th textAlign="center">Usuario</Th>
                    <Th textAlign="center">Email</Th>
                    <Th textAlign="center">Rol</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map((user) => (
                    <Tr textAlign="center" key={user.mail}>
                      <Td textAlign="center"> {user.userSlack} </Td>
                      <Td textAlign="center"> {user.mail} </Td>
                      <Td textAlign="center"> {user.rol} </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <PaginatedAdmin maxPages={maxPag} />
          </>
        ) : (
          <Text mb="20px" align="center" textTransform="uppercase">
            No hay usuarios actualmente.
          </Text>
        )}
      </div>
    </Flex>
  );
};

export default Accounts;
