import { Divider, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequest } from "../../slices/userSlice";
import { useAuth } from "../AuthComponents/AuthContext";
import ErrorPage from "./ErrorPage/ErrorPage";
import Sidebar from "./Sidebar";

const HomeAdmin = () => {
  const dispatch = useDispatch();

  const { user } = useAuth();
  let token = user.accessToken;

  const currentUser = useSelector((state) => state.user.user);
  const page = useSelector((state) => state.user.page);

  console.log(currentUser);

  useEffect(() => {
    dispatch(getRequest({ token, page }));
  }, [dispatch, page]);

  return (
    <Flex>
      <Sidebar />
      <div style={{ margin: "20px auto" }}>
        <Text
          as="b"
          textTransform="uppercase"
          fontSize={{ base: "24px", md: "30px", lg: "40px" }}
        >
          ¡Bienvenido al panel de administrador: {currentUser?.userSlack}!
        </Text>
        <Divider m="20px" />
        <Text>
          Desde aquí podremos tener un seguimiento de lo que está pasando en la
          aplicación.
          <p style={{ marginTop: "20px", marginBottom: "10px" }}>
            Tenemos 3 apartados:
          </p>
          <UnorderedList>
            <ListItem>
              <Text>
                <i>Tablero:</i> donde estamos ahora mismo.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <i>Cuentas:</i> tabla con algunos datos de todas las cuentas
                registradas.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <i>Peticiones:</i> tabla con peticiones del usuario por
                responder.
              </Text>
            </ListItem>
          </UnorderedList>
        </Text>
      </div>
    </Flex>
  );
};

export default HomeAdmin;
