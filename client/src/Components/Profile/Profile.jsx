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
  ButtonGroup,
  PopoverFooter,
  Portal,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../AuthComponents/AuthContext";
import { getUserQuestions, getUserAnswers, updateUser } from "../../slices/userSlice";
import NavBar from "../NavBar/NavBar";
import CardProfile from "./Card Profile/CardProfile";
import Footer from "../Footer/Footer";
import Admin from "../../assets/Rol Images/Administrador.png";
import Graduate from "../../assets/Rol Images/Graduate.png";
import Student from "../../assets/Rol Images/Students.png";
import HeroOrTA from "../../assets/Rol Images/Hero,TA.png";
import CropperImage from "./Cropper Image/CropperImage";

const paises = ['Argentina', 'Brasil', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Ecuador', 'El Salvador', 'España', 'Estados Unidos', 'Guatemala', 'Guinea Ecuatorial', 'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'Puerto Rico', 'República Dominicana', 'Uruguay', 'Venezuela', 'OTROS']


const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [rolImg, setRolImg] = useState();
  const [page, setPage] = useState(1);
  // Muestra el componente Cropper
  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast()

  //Para editar el nombre de usuario
  const [userName, setUsernmae] = useState("");
  const [country, setCountry] = useState(null)
  const [edit, setEdit] = useState(false);
  const userData = useSelector((state) => state.user.user);
  
  const myQuestions = useSelector((state) => state.user.userQuestions);
  const myAnswers = useSelector((state) => state.user.userAnswers);

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
      setFile(e.target.files[0]);
      setPhotoURL(URL.createObjectURL(e.target.files[0]));
      setOpenCrop(true);
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
        description: "El Username debe ser mayor a 8 caracteres",
        duration: 3000,
        position: "top",
        status: "error",
        isClosable: true
    })
     dispatch(updateUser(user.accessToken, null, country, userName))
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
  }

  useEffect(() => {
    dispatch(getUserQuestions(user.accessToken, user.uid, page));
    dispatch(getUserAnswers(user.accessToken, user.uid, page));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      defineRolImg();
    }, 700);
  }, [isLoading]);

  return (
    <Flex backgroundColor={"#1F1F1F"} h={"auto"} w="100%" flexFlow={"column"}>
      <NavBar />

      {openCrop ? (
        <Box position={"relative"}>
          <CropperImage
            photoURL={photoURL}
            setPhotoURL={setPhotoURL}
            setOpenCrop={setOpenCrop}
            setProfilePic={setProfilePic}
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
                  backgroundImage={userData.avatar}
                  backgroundSize={"contain"}
                  backgroundRepeat={"no-repeat"}
                  backgroundPosition={"center"}
                  borderRadius={"50%"}
                  border={"1px solid black"}
                />
                <Input
                  fontSize={"15px"}
                  border="none"
                  marginTop={"5px"}
                  type="file"
                  onChange={handleChange}
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
                fontSize={{ base: "24px", md: "32px", lg: "32px" }}
                fontWeight={"bold"}
                textAlign={"start"}
                >
                {" "}
                {userData?.userSlack}
              </Text>
                }
              

              <Flex flexDirection={"column"}>
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
                    <Select h={"25px"} w={"100px"} onChange={(e) => setCountry(e.target.value) }  >
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
                  <Img src={rolImg} w={"24px"} h={"24px"} ml={-0.5} />
                  <Text ml={-1}> {userData?.rol} </Text>
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
                            <Button colorScheme="blue" onClick={() => setEdit(false)}>Cancelar</Button>
                          </Flex>
                        </PopoverBody>
                      </PopoverContent>
                    </Portal>
                  </Popover>
                  <Button bgColor={"tomato"} _hover={{bgColor: "red"}} onClick={() => setEdit(false)}>X</Button>
                </Flex>
              ) : (
                  <Button onClick={() => {
                    setEdit(true)
                    setCountry(userData.country)
                }}>Edit User</Button>
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
            <Tabs variant="enclosed">
              <TabList>
                <Tab _selected={{ color: "white", bg: "#1F1F1F" }}>
                  Mis preguntas: ({myQuestions.length}){" "}
                </Tab>
                <Tab _selected={{ color: "white", bg: "#1F1F1F" }}>
                  Mis respuestas: ({myAnswers.length}){" "}
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel
                  position={"relative"}
                  bg={"#1F1F1F"}
                  minHeight={{ base: "1080", md: "590px", lg: "590px" }}
                  mb={"50px"}
                  borderBottomRightRadius={"10px"}
                  borderBottomLeftRadius={"10px"}
                >
                  <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 2 }}
                    gap={4}
                    mt={"10px"}
                  >
                    {myQuestions
                      ? myQuestions.map((q, i) => {
                          return (
                            <CardProfile
                              title={q.title}
                              description={q.body}
                              id={q._id}
                              key={i}
                            />
                          );
                        })
                      : null}
                  </SimpleGrid>
                  <Center>
                    {myQuestions?.length > 6 ? (
                      <Box
                        display={"flex"}
                        alignItems="center"
                        justifyContent={"space-between"}
                        gap={3}
                        position={"absolute"}
                        bottom={0}
                        marginY={"20px"}
                      >
                        <Button
                          onClick={prevPage}
                          fontSize={{ base: "12px", md: "16px", lg: "16px" }}
                        >
                          ANTERIOR
                        </Button>
                        ,
                        <Text
                          fontSize={{ base: "12px", md: "16px", lg: "16px" }}
                          color={"white"}
                        >
                          1 de 1
                        </Text>
                        ,
                        <Button
                          onClick={nextPage}
                          fontSize={{ base: "12px", md: "16px", lg: "16px" }}
                          bg={"#FFFF01"}
                        >
                          SIGUIENTE
                        </Button>
                      </Box>
                    ) : null}
                  </Center>
                </TabPanel>

                <TabPanel
                  position={"relative"}
                  bg={"#1F1F1F"}
                  minHeight={{ base: "1080", md: "590px", lg: "590px" }}
                  mb={"50px"}
                  borderBottomRightRadius={"10px"}
                  borderBottomLeftRadius={"10px"}
                >
                  <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 2 }}
                    gap={4}
                    mt={"10px"}
                  >
                    {myAnswers
                      ? myAnswers.map((q, i) => {
                          return (
                            <CardProfile
                              title={q.title}
                              description={q.body}
                              id={q._id}
                              key={i}
                              answer={q}
                            />
                          );
                        })
                      : null}
                  </SimpleGrid>
                  <Center>
                    {myAnswers.length > 6 ? (
                      <Box
                        display={"flex"}
                        alignItems="center"
                        justifyContent={"space-between"}
                        gap={3}
                        position={"absolute"}
                        bottom={0}
                        marginY={"20px"}
                      >
                        <Button
                          onClick={prevPage}
                          fontSize={{ base: "12px", md: "16px", lg: "16px" }}
                        >
                          ANTERIOR
                        </Button>
                        ,
                        <Text
                          fontSize={{ base: "12px", md: "16px", lg: "16px" }}
                          color={"white"}
                        >
                          {page} de {totalPages}{" "}
                        </Text>
                        ,
                        <Button
                          onClick={nextPage}
                          fontSize={{ base: "12px", md: "16px", lg: "16px" }}
                          bg={"#FFFF01"}
                        >
                          SIGUIENTE
                        </Button>
                      </Box>
                    ) : null}
                  </Center>
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
