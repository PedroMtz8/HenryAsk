import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequest, setPage } from "../../slices/userSlice";
import { useAuth } from "../AuthComponents/AuthContext";

const SearchbarAdmin = ({setType}) => {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.user.page);

  const { user } = useAuth();
  let token = user.accessToken;

  const handleChangeType = (e) => {
    e.preventDefault();
    setType(e.target.value)
    dispatch(setPage(1))
    dispatch(getRequest({token, page, type: e.target.value}))
  };

  return (
    <div>
      <FormControl m="auto" fontSize=".9rem" mb="60px" w='100%'>
        <HStack
          align="center"
          bg="#F2F2F2"
          p="1% 2%"
          spacing="3.5%"
          borderRadius="1.5rem"
          w='100%'
        >
            <Text w="4rem"> Pedidos:</Text>
            <Select onChange={handleChangeType} borderRadius="10rem">
                <option value=''>Todos</option>
                <option value='Registro'> Registro </option>
                <option value='Rol'> Rol </option>
                
            </Select>
        </HStack>
      </FormControl>
    </div>
  );
};

export default SearchbarAdmin;
