import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Button,
  Text,
  useToast,
  Textarea,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../AuthComponents/AuthContext";
import SearchbarReq from "./SearchbarReq";
import Sidebar from "./Sidebar";
import axios from "axios";
import { getRequest, setPage } from "../../slices/userSlice";
import PaginatedAdmin from "./PaginatedAdmin";
import API_URL from "../../config/environment";

const ReqAdmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const dispatch = useDispatch();
  const { user } = useAuth();
  let token = user.accessToken;
  const toast = useToast()

  const [type, setType] = useState('')

  const [reason, setReason] = useState('')

  const page = useSelector((state) => state.user.page);
  const req = useSelector((state) => state.user.requests);
  const maxPag = useSelector((state) => state.user.reqMaxPages);

  useEffect(() => {
    dispatch(setPage(1))
    dispatch(getRequest({ token, page: 1, type}));
  }, []);

  const complete = async (request, approve) => {
    try {
      await axios.put(`${API_URL}/request/${request.type.toLowerCase()}`, { rid:request._id, approve, reason}, {headers: {
        Authorization: `Bearer ${token}`
      }})
      toast({
        description: "Pedido completado!",
        duration: 2000,
        position: "bottom-left",
        status: "success",
        isClosable: true
      })
      dispatch(getRequest({token, page, type}))
    } catch (error) {
      if(error.response.status === 498) return toast({
        description: "Ocurrio un error inesperado",
        duration: 2000,
        position: "bottom-left",
        status: "error",
        isClosable: true
      })
    }
  }

  return (
    <Flex>
      <Sidebar />
      <div style={{ margin: "20px auto" }}>
        <SearchbarReq setType={setType}/>
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
                      <Td textAlign="center">{req.type}</Td>
                      <Td>
                        <Button mr="3px" colorScheme="green" onClick={() => complete(req, true)}>
                          Aceptar
                        </Button>
                        <Button colorScheme="red" onClick={onOpen}>Denegar</Button>
                        <Modal
                        isOpen={isOpen}
                        onClose={() => {
                          setReason('')
                          onClose()
                        }}
                    >
                        <ModalOverlay display={'flex'} alignItems='center'>
                            <ModalContent
                                margin={'8px'}
                                width='95%'
                                alignSelf={'center'}
                                >
                                <ModalHeader>Razon de rechazo</ModalHeader>
                                <ModalCloseButton />
                                <Divider backgroundColor={'#FFFF01'} h='3px' />
                                <ModalBody pb={6}>
                                        <Textarea
                                            placeholder='Razon...'
                                            onChange={(e) => setReason(e.target.value)}
                                            value={reason}
                                        />
                                </ModalBody>

                                <ModalFooter>
                                    <Button onClick={() => {
                                      complete(req, false)
                                      onClose()
                                    }}backgroundColor={'black'} color='#E4E400' mr={3} _hover={{ backgroundColor: '#E4E400', color: 'black' }}>
                                        Denegar
                                    </Button>
                                    <Button onClick={() => {
                                      setReason('')
                                      onClose()
                                    }} _hover={{ background: "tomato" }}>Cancelar</Button>
                                </ModalFooter>
                            </ModalContent>
                        </ModalOverlay>
                    </Modal>
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
