import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import {
  Flex, 
  Text, 
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import SearchbarAdmin from "./SearchbarAdmin";
import { useAuth } from "../AuthComponents/AuthContext";
import PaginatedAdmin from "./PaginatedAdmin";
import { getUserByRol, getUsers, setPage } from "../../slices/userSlice";

const Accounts = () => {
  const dispatch = useDispatch();

  const { user } = useAuth();
  let token = user.accessToken;

  const accounts = useSelector((state) => state.user);
  const users = accounts.users;
  const [filter, setFilter] = useState("");
  const maxPag = useSelector((state) => state.user.usersMaxPages);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (filter === "") {
      dispatch(getUsers({ token, page: accounts.page }));
    } else {
      dispatch(getUserByRol({ page: accounts.page, rol: filter, token }));
    }
    setLoading(false);
  }, [dispatch, accounts.page]);

  const handleChangeFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    if (filter === "") {
      dispatch(getUsers({ token, page: 1 }));
    } else {
      dispatch(getUserByRol({ page: 1, rol: filter, token }));
    }
    dispatch(setPage(1));
    setLoading(false);
  }, [filter]);

  return (
    <Flex
      position="relative"
      bg="#1F1F1F"
      minH="100vh"
      flexDirection={{ base: "column", sm: "row" }}
    >
      <Sidebar />
      <Flex flexDir={"column"}
       alignItems="center"
       gap={4}
       py={5}
       w={"100%"}>
        <SearchbarAdmin
          name="Rol"
          op1="Estudiante"
          op2="Administrador"
          op3="Henry Hero"
          op4="Graduado"
          op5="TA"
          setFilter={setFilter}
          handleChangeFilter={handleChangeFilter}
        />

        {users.length > 0 ? (
          <>
            <TableContainer fontSize={{base: "0.7rem", sm: "0.7rem", md: "0.9rem", lg: "1rem" }}
              border="1px solid gray"
              borderRadius="10px"
              boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.5)"
            >
              <Table
                variant="striped"
                colorScheme="blackAlpha"
                size={{ base: "20em", md: "md", lg: "lg" }}
                p="20px"
              >
                <Thead w="100%" backgroundColor="#ffff01" textAlign="center">
                  <Tr>
                    <Th textAlign="center">Usuario</Th>
                    <Th textAlign="center">Email</Th>
                    <Th textAlign="center">Rol</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map((user) => (
                    <Tr textAlign="center" textColor="white" key={user.mail}>
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
      </Flex>
    </Flex>
  );
};

export default Accounts;
