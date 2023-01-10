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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByMail, getUserByRol, getUsers } from "../../slices/userSlice";
import { useAuth } from "../AuthComponents/AuthContext";

const SearchbarAdmin = ({
  name,
  op1,
  op2,
  op3,
  op4,
  op5,
  handleChangeFilter,
  setFilter,
}) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const page = useSelector((state) => state.user.page);

  const { user } = useAuth();
  let token = user.accessToken;

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFilter("");
    dispatch(getByMail({ mail: search.toLowerCase(), page, token }));
  };

  return (
    <Flex justifyContent={"flex-start"} py="0.5rem" alignItems={"center"} >
      <FormControl pos={"relative"}
        fontSize={{base: ".7rem", sm: ".8rem"}}
        w="100%"
        px=".6rem"
      >
        <HStack  
          align="center"
          bg="#F2F2F2"
          spacing=".1rem"
          borderRadius="1rem"
          p={".2rem"}
        >
          <InputGroup alignContent={"center"} 
            p={".3rem"}
            borderRadius="1rem"
            w={{ base: "60%", md: "50%", lg: "40%" }}
          >
            <Input 
              placeholder="Mail..."
              borderRadius="10rem"
              value={search}
              onChange={handleChange}
              
            />
            <InputRightElement width="3rem" pt=".5rem" onClick={handleSubmit}>
              <SearchIcon  />
            </InputRightElement>
          </InputGroup>
          <HStack w={{ base: "40%", md: "50%", lg: "60%" }} borderRadius="1rem" >
            <Text w="4rem">Rol:</Text>
            <Select onChange={handleChangeFilter} borderRadius="10rem">
              <option value={""}>Todos</option>
              <option value={op1}> {op1} </option>
              <option value={op2}> {op2} </option>
              <option value={op3}> {op3} </option>
              <option value={op4}> {op4} </option>
              <option value={op5}> {op5} </option>
            </Select>
          </HStack>
        </HStack>
      </FormControl>
    </Flex>
  );
};

export default SearchbarAdmin;
