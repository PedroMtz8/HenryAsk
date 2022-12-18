import { Flex } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Accounts = () => {
  return (
    <Flex>
      <Sidebar />
      <h2>Estas son las cuentas</h2>
    </Flex>
  );
};

export default Accounts;
