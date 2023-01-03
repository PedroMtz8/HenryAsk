import {
  Box,
  Center,
  Flex,
  Img,
  Text,
  SimpleGrid,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Portal,
  Select,
  useToast,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../AuthComponents/AuthContext";
import { getUserQuestions, getUserAnswers } from "../../slices/userSlice";
import getCroppedImg from "./Cropper Image/getCroppedImg";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Admin from "../../assets/Rol Images/Administrador.png";
import Graduate from "../../assets/Rol Images/Graduate.png";
import Student from "../../assets/Rol Images/Students.png";
import HeroOrTA from "../../assets/Rol Images/Hero,TA.png";
import CropperImage from "./Cropper Image/CropperImage";
import CardProfile from "./Card Profile/CardProfile";
import QuestionPaginated from "./Paginated/QuestionPaginated";
import AnswerPaginated from "./Paginated/AnswerPaginated";
import editpencil from '../../assets/edit.png'
import axios from "axios";
import API_URL from "../../config/environment";
const paises = ['Argentina', 'Brasil', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Ecuador', 'El Salvador', 'España', 'Estados Unidos', 'Guatemala', 'Guinea Ecuatorial', 'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'Puerto Rico', 'República Dominicana', 'Uruguay', 'Venezuela', 'OTROS']
const roles = ['Estudiante', 'Graduado', 'TA', 'Henry Hero']

const Profile = () => {
  const dispatch = useDispatch();
  const { user, uploadFile } = useAuth();
  const [rolImg, setRolImg] = useState();
  const hiddenFileInput = useRef(null);
  // Muestra el componente Cropper
  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const toast = useToast()
  
  //Para editar informacion de usuario
  const [userName, setUsernmae] = useState("");
  const [country, setCountry] = useState(null)
  const [rol, setRol] = useState('')
  const [file, setFile] = useState()
  const [submitImage, setSubmitImage] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [edit, setEdit] = useState(false);
  const userData = useSelector((state) => state.user.user);
  const [hover, setHover] = useState(false)
  const myQuestions = useSelector((state) => state.user.userQuestions);
  const myAnswers = useSelector((state) => state.user.userAnswers);
  const [paginated, setPaginated] = useState('Question')
  const { isOpen, onOpen, onClose } = useDisclosure()
  

  const defineRolImg = () => {
    setIsLoading(true);
    if (userData.rol === "Henry Hero") setRolImg(HeroOrTA);
    if (userData.rol === "TA") setRolImg(HeroOrTA);
    if (userData.rol === "Administrador") setRolImg(Admin);
    if (userData.rol === "Estudiante") setRolImg(Student);
    if (userData.rol === "Graduado") setRolImg(Graduate);
  };
  
  async function handleChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      setPhotoURL(URL.createObjectURL(e.target.files[0]));
      setOpenCrop(true);
    }
  }

  const handleChangeRol = (e) => {
    setRol(e.target.value)
  } 

  const cancelEdit = () => {
    setPhotoURL(userData.avatar)
    setUsernmae('')
    setEdit(false)
  }

  const sendRequest = async () => {
    try {
      await axios.post(`${API_URL}/request/rol`, {rol}, 
      {headers: 
        {Authorization: `Bearer ${user.accessToken}`}
      })
      toast({
        description: "Tu solicitud ha sido enviada!",
        duration: 3000,
        position: "top",
        status: "success",
        isClosable: true
      })
    } catch (error) {
      if(error.response?.status === 409){
        toast({
          description: "Ya has solicitado un cambio de rol!",
          duration: 3000,
          position: "top",
          status: "error",
          isClosable: true
        })
      } else{
        toast({
          description: "Ha ocurrido un error, intentalo de nuevo",
          duration: 3000,
          position: "top",
          status: "error",
          isClosable: true
        })
      }
    }
  }
  
  const handleSubmit = async() => {
    if(!userName || userName.trim() === "") return toast({
        description: "Agrega tu nombre de usuario",
        duration: 3000,
        position: "top",
        status: "error",
        isClosable: true
    })
    
    if(userName.length < 9) return toast({
        description: "El nombre de usuario debe ser mayor a 8 caracteres",
        duration: 3000,
        position: "top",
        status: "error",
        isClosable: true
    })
    
    if(userName.length > 30) return toast({
      description: "El nombre de usuario debe ser menor o igual a 30 caracteres",
      duration: 3000,
      position: "top",
      status: "error",
      isClosable: true
    })

    
    try {
      let avatar = userData.avatar
      if(file){
        avatar = await uploadFile(file, user.uid, userData.userSlack);
      }
      await axios.put(`${API_URL}/auth`, {userSlack: userName, country, avatar}, { headers: { Authorization: "Bearer " + user.accessToken }})
      toast({
          description: "Usuario Actualizado",
          duration: 3000,
          position: "top",
          status: "success",
          isClosable: true
        })
      setTimeout(() => {
        window.location.reload(false);
      }, 3000)
    } catch (error) {
      toast({
      description: "Ocurrio un error, intentalo de nuevo",
      duration: 3000,
      position: "top",
      status: "error",
      isClosable: true
     })
    }
  }
  
  useEffect(() => {
    dispatch(getUserQuestions(user.accessToken, user.uid, 1));
    dispatch(getUserAnswers(user.accessToken, user.uid, 1))
  }, []) 

  useEffect(() => {
    setTimeout(() => {
      defineRolImg();
    }, 700);
  }, [isLoading]);

  useEffect( () => {

    async function setAvatar(){
      const { file2 } = await getCroppedImg(photoURL, croppedAreaPixels);
      setFile(file2)
    }
    if(submitImage){
      setAvatar()
    }
  }, [submitImage])

  return (
    <Flex backgroundColor={"#1F1F1F"} h={"auto"} w="100%" flexFlow={"column"}>
      <NavBar />

      {openCrop ? (
        <Box position={"relative"}>
          <CropperImage
            photoURL={photoURL}
            setPhotoURL={setPhotoURL}
            setOpenCrop={setOpenCrop}
            setSubmitImage={setSubmitImage}
            croppedAreaPixels={croppedAreaPixels}
            setCroppedAreaPixels={setCroppedAreaPixels}
          />
        </Box>
      ) : null}

      <Center>
        <Box
          backgroundColor={"#F2F2F2"}
          height={"100%"}
          mb={"50px"}
          w={{ base: "90%", md: "80%", lg: "70%" }}
          mt={"50px"}
          borderRadius={"10px"}
        >
          <Flex
            flexDirection={{ base: "column", md: "initial", lg: "initial" }}
            /* w={{base: "300px", sm: "300px", md: "inherit", lg: "inherit"}} */
          >
            <Center>
              <Flex
                flexDirection={"column"}
                w={"100px"}
                margin={{ base: "10px", md: "30px", lg: "30px" }}
              >
                <Box
                  width={"100px"}
                  h={"100px"}
                  backgroundImage={edit && file ? photoURL : userData?.avatar}
                  backgroundSize={"contain"}
                  backgroundRepeat={"no-repeat"}
                  backgroundPosition={"center"}
                  borderRadius={"50%"}
                  border={"1px solid black"}
                  display='flex'
                  justifyContent={'center'}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  position='relative'
                  bottom={{base: '0px', md: '20px'}}
                >
                {hover && edit
                  ? <button
                        onClick={(e) => {
                            e.preventDefault()
                            hiddenFileInput.current.click();
                        }}
                        className={'img'}
                        style={{backgroundColor: "white", width: '100%', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: '0.8', top:'0px'}}
                    > 
                        <img src={editpencil} alt="" style={{ minWidth: '27px', width: '27px' }} />
                    </button>
                  : null
                }
                </Box>
                <input type="file" ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    accept="image/png, image/gif, image/jpeg" 
                    />
              </Flex>
            </Center>
            <Flex
              flexDirection={"column"}
              mt={{ base: "0px", md: "20px", lg: "20px" }}
              h={"inherit"}
              textAlign="center"
              alignItems={{base: "center", sm: "center", md: "inherit", lg: "inherit"}}
            >
                {
                    edit ? 
                    <Flex w={{base: "250px", sm: "250px", md: "inherit", lg: "inherit"}}>
                    <Input
                        type="text"
                        borderColor={"black"}
                        placeholder="Escribe tu nombre..."
                        h={{base: "30px"}}
                        mb={{base: 1, sm:1, md: 2, lg: 2}}
                        value={userName}
                        onChange={(e)=> setUsernmae(e.target.value) }
                        />
                    </Flex>
                    :
                    <Text
                fontSize={{ base: "16px", sm: "20px", md: "24px", lg: "28px" }}
                fontWeight={"bold"}
                textAlign={"start"}
                >
                {" "}
                {userData?.userSlack}
              </Text>
                }
              

              <Flex flexDirection={"column"} gap={2}>
                <Box
                  display={"inline-flex"}
                  alignItems={"center"}
                  justifyContent={{ base: "center", md: "start", lg: "start" }}
                  gap={2}
                  >
                  <Img
                    src="https://cdn-icons-png.flaticon.com/512/1041/1041897.png"
                    w={"16px"}
                    h={"16px"}
                  />

                  {
                    edit ?
                    <Select h={"25px"} w={"fit-content"} onChange={(e) => setCountry(e.target.value) }  >
                        <option value={country}>{country}</option>
                        {
                            paises.map((e, i) => <option key={i} value={e}>{e}</option>)
                        }
                    </Select>
                    :
                    <Text>{userData?.country}</Text>
                  }
                </Box>
                <Box
                  display={"inline-flex"}
                  alignItems={"center"}
                  justifyContent={{ base: "center", md: "start", lg: "start" }}
                  gap={2}
                >
                  <Img src={rolImg} w={"24px"} h={"24px"} ml={-1} />
                  {
                    edit ?
                    <Button
                          h='20px'
                          w='fit-content'
                          borderRadius="0px"
                          fontSize={'16px'}
                          outline='none'
                          _hover={{ outline: '1px solid #CBD5E0' }}
                          fontWeight='normal'
                          onClick={() => {
                            setRol(userData.rol)
                            onOpen()
                          }}>
                          {userData.rol}
                      </Button>
                    :
                    <Text ml={-1}> {userData?.rol} </Text>
                  }
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay>
                            <ModalContent
                                margin={'8px'}
                                width='95%'
                                h='fit-content'
                                alignSelf={'center'}
                                >
                                <ModalHeader>Cambio de rol</ModalHeader>
                                <ModalCloseButton />
                                <Divider backgroundColor={'#FFFF01'} h='3px' />
                                <ModalBody pb={6}>
                                    <Flex flexDirection={'column'}>
                                    <Text mb={5}>
                                      Deseas solicitar un cambio de rol?
                                    </Text>
                                    <Text>Ten en cuenta que:</Text>
                                    <Text>• Una vez solicitado no puedes retornarlo ni solicitar otro.</Text>
                                    <Text>• Los administradores verificaran y aprobaran o denegaran tu pedido.</Text>
                                    <Text mt={5}>Si comprendes eso, especifica tu nuevo rol aqui:</Text>
                                    </Flex>
                                    <Select h={"25px"} w={"fit-content"} onChange={handleChangeRol}  >
                                        <option value={userData.rol}>{userData.rol}</option>
                                        {
                                            roles.filter(r => r !== userData.rol).map((e, i) => <option key={i} value={e}>{e}</option>)
                                        }
                                    </Select>
                                </ModalBody>

                                <ModalFooter>
                                    <Button onClick={sendRequest} backgroundColor={'black'} color='#E4E400' mr={3} _hover={{ backgroundColor: '#E4E400', color: 'black' }}>
                                        Enviar
                                    </Button>
                                    <Button onClick={onClose} _hover={{ background: "tomato" }}>Cancelar</Button>
                                </ModalFooter>
                            </ModalContent>
                        </ModalOverlay>
                    </Modal>
                  
                </Box>
                <Box
                  display={"inline-flex"}
                  alignItems={"center"}
                  justifyContent={{ base: "center", md: "start", lg: "start" }}
                  gap={2}
                >
                  <Img
                    src="https://cdn-icons-png.flaticon.com/512/2720/2720867.png"
                    w={"16px"}
                    h={"16px"}
                  />
                  <Text>{userData?.score}</Text>
                </Box>
                <Flex justifyContent={{base: "center", sm: "center",  md: "start", lg: "start"}} w={"100%"}>
                {edit ? (
                    <Flex gap={3}>
                  <Popover>
                    <PopoverTrigger>
                      <Button bgColor={"gray.300"} _hover={{bgColor: "gray.400"}} >Enviar</Button>
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent w="250px">
                        <PopoverCloseButton />
                        <PopoverHeader w={"95%"}>
                          ¿Estas seguro?
                        </PopoverHeader>

                        <PopoverBody>
                          <Flex justifyContent="flex-end" gap={2}>
                            <Button colorScheme="blue" onClick={handleSubmit}>Confirmar</Button>
                            <Button colorScheme="blue" onClick={cancelEdit}>Cancelar</Button>
                          </Flex>
                        </PopoverBody>
                      </PopoverContent>
                    </Portal>
                  </Popover>
                  <Button bgColor={"tomato"} 
                    _hover={{bgColor: "red"}} 
                    onClick={cancelEdit}
                    >
                    X
                  </Button>
                </Flex>
              ) : (
                  <Button onClick={() => {
                    setEdit(true)
                    setCountry(userData.country)
                }}>Editar</Button>
                  )}
          </Flex>
              </Flex>
            </Flex>
          </Flex>
          {/* Preguntas y respuestas */}
          <Box
            marginLeft={{ base: "5px", md: "50px", lg: "50px" }}
            marginRight={{ base: "0px", md: "50px", lg: "50px" }}
            mt={"5px"}
            w={{ base: "97%", md: "90%", lg: "90%" }}
          >
            <Tabs variant="enclosed" onChange={(index) => {
              if(!index) setPaginated('Question')
              else setPaginated('Answer')
            } }>
              <TabList>
                <Tab _selected={{ color: "white", bg: "#1F1F1F" }}>
                  Mis preguntas{" "}
                </Tab>
                <Tab _selected={{ color: "white", bg: "#1F1F1F" }}>
                  Mis respuestas{" "}
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel
                  position={"relative"}
                  bg={"#1F1F1F"}
                  minHeight={{ base: "1105px", sm:'590px', md:'590px', lg: "590px" }}
                  mb={"50px"}
                  borderBottomRightRadius={"10px"}
                  borderBottomLeftRadius={"10px"}
                  
                >
                  <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 2, lg: 2 }}
                    gap={4}
                    mt={"10px"}
                  >
                    {myQuestions.foundPosts?.map((q, i) => {
                          return (
                            <CardProfile
                            cardData={q}
                            isQuestion={true}
                            key={i}
                            />
                          );
                        })
                    }
                  </SimpleGrid>
                  {paginated === 'Question' ? <QuestionPaginated data={myQuestions}/> : null}
                </TabPanel>

                <TabPanel
                  position={"relative"}
                  bg={"#1F1F1F"}
                  minHeight={{ base: "1105px", sm:'590px', md:'590px', lg: "590px" }}
                  mb={"50px"}
                  borderBottomRightRadius={"10px"}
                  borderBottomLeftRadius={"10px"}
                >
                  <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 2, lg: 2 }}
                    gap={4}
                    mt={"10px"}
                  >
                    {myAnswers
                      ? myAnswers.foundAnswers?.map((q, i) => {
                          return (
                            <CardProfile
                            cardData={q}
                            isQuestion={false}
                            key={i}
                            />
                          );
                        })
                      : null}
                  </SimpleGrid>
                  {paginated === 'Answer' ? <AnswerPaginated data={myAnswers}/> : null}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Center>
      <Footer />
    </Flex>
  );
};

export default Profile;

function ButtonConfirm() {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button>Trigger</Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent w="350px">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader w={"95%"}>
              ¿Estas seguro de cancelar la edición?
            </PopoverHeader>

            <PopoverBody>
              <Flex justifyContent="flex-end" gap={2}>
                <Button colorScheme="blue">Si</Button>
                <Button colorScheme="blue">No</Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
}
