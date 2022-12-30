import { Box, Center, Flex,  Img,  Text,
    SimpleGrid,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Input,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../AuthComponents/AuthContext";
import { getUserQuestions, getUserAnswers } from "../../slices/userSlice";
import NavBar from "../NavBar/NavBar";
import CardProfile from "./Card Profile/CardProfile";
import Footer from "../Footer/Footer";
import Admin from "../../assets/Rol Images/Administrador.png"
import Graduate from "../../assets/Rol Images/Graduate.png"
import Student from "../../assets/Rol Images/Students.png"
import HeroOrTA from "../../assets/Rol Images/Hero,TA.png"
import CropperImage from "./Cropper Image/CropperImage";


const Profile = () => {
    const dispatch = useDispatch()
    const { user } = useAuth()
    const [ file, setFile ] = useState(null)
    const [ rolImg, setRolImg ] = useState()
    const [ page, setPage] = useState(1)
    // Muestra el componente Cropper
    const [ openCrop, setOpenCrop ] = useState(false)
    const [ photoURL, setPhotoURL ] = useState(null)
    const [ profilePic, setProfilePic ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(false)


    const userData = useSelector(state => state.user.user)
    const myQuestions = useSelector(state => state.user.userQuestions)
    const myAnswers = useSelector(state => state.user.userAnswers)


    const defineRolImg = () => {
        setIsLoading(true)
        if(userData.rol === "Henry Hero") setRolImg(HeroOrTA)
        if(userData.rol === "TA") setRolImg(HeroOrTA)
        if(userData.rol === "Administrador") setRolImg(Admin)
        if(userData.rol === "Estudiante") setRolImg(Student)
        if(userData.rol === "Graduado") setRolImg(Graduate)
    }
    

    async function handleChange(e){
        if(e.target.files && e.target.files.length > 0){
            setFile(e.target.files[0]);
            setPhotoURL(URL.createObjectURL(e.target.files[0]))
            setOpenCrop(true)
        }    
    }


    useEffect(() => {
        dispatch(getUserQuestions(user.accessToken, user.uid, page))
        dispatch(getUserAnswers(user.accessToken, user.uid, page))
    }, [])
    
    useEffect(()=>{
        setTimeout(()=>{
            defineRolImg()
        }, 700)
    }, [isLoading])

    return(
        <Flex  backgroundColor={"#1F1F1F"} h={"auto"} w='100%' flexFlow={"column"} >
            <NavBar />

            {
                openCrop ?
                <Box position={"relative"}  >
                    <CropperImage photoURL={photoURL} setPhotoURL={setPhotoURL} setOpenCrop={setOpenCrop} setProfilePic={setProfilePic}  /> 
                </Box>
                    : null
            }

            <Center>
                <Box backgroundColor={"#F2F2F2"} height={"100%"} mb={"50px"} 
                    w={{ base: "90%", md: "80%", lg: "70%" }} mt={"50px"} borderRadius={"10px"} >
                    <Flex flexDirection={{ base: "column", md: "initial", lg: "initial" }}  >
                        <Center>
                            <Flex flexDirection={"column"} w={"100px"}
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
                                    type="file" onChange={handleChange}  />
                            </Flex>
                        </Center>
                        <Flex flexDirection={"column"} mt={{ base: "0px", md: "20px", lg: "20px" }} h={"inherit"} textAlign="center" >
                            <Text fontSize={{ base: "24px", md: "32px", lg: "32px" }} fontWeight={"bold"} > {userData?.userSlack} <Button>Edit</Button> </Text>

                            <Flex flexDirection={"column"} >

                                <Box display={"inline-flex"} alignItems={"center"} justifyContent={{ base: "center", md: "start", lg: "start" }} gap={2} >
                                    <Img src="https://cdn-icons-png.flaticon.com/512/1041/1041897.png" w={"16px"} h={"16px"} />
                                    <Text  >{userData?.country}</Text>
                                </Box>
                                <Box display={"inline-flex"} alignItems={"center"} justifyContent={{ base: "center", md: "start", lg: "start" }} gap={2}>
                                    <Img src={rolImg} w={"24px"} h={"24px"} ml={-0.5} />
                                    <Text ml={-1} > {userData?.rol} </Text>
                                </Box>
                                <Box display={"inline-flex"} alignItems={"center"} justifyContent={{ base: "center", md: "start", lg: "start" }} gap={2}>
                                    <Img src="https://cdn-icons-png.flaticon.com/512/2720/2720867.png" w={"16px"} h={"16px"} />
                                    <Text >{userData?.score}</Text>
                                </Box>
                            </Flex>

                        </Flex>
                </Flex>
                    {/* Preguntas y respuestas */}
                    <Box
                        marginLeft={{ base: "5px", md: "50px", lg: "50px" }}
                        marginRight={{ base: "0px", md: "50px", lg: "50px" }} mt={"5px"}
                        w={{ base: "97%", md: "90%", lg: "90%" }} >
                    <Tabs variant="enclosed"  >
                    <TabList>
                                <Tab _selected={{ color: 'white', bg: "#1F1F1F" }}>Mis preguntas: ({myQuestions.length}) </Tab>
                                <Tab _selected={{ color: 'white', bg: "#1F1F1F" }} >Mis respuestas: ({myAnswers.length}) </Tab>
                    </TabList>
                    <TabPanels>
                                <TabPanel position={"relative"} bg={"#1F1F1F"} minHeight={{ base: "1080", md: "590px", lg: "590px" }} mb={"50px"} borderBottomRightRadius={"10px"} borderBottomLeftRadius={"10px"}>
                                    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={4} mt={"10px"}>
                                    {
                                            myQuestions ? myQuestions.map((q, i) => {
                                                return <CardProfile title={q.title} description={q.body} id={q._id} key={i} />
                                            }) : null

                                    }
                                    </SimpleGrid>
                             <Center>
                                        {
                                            myQuestions?.length > 6 ?
                                                (
                                                    <Box display={"flex"} alignItems="center" justifyContent={"space-between"} gap={3} position={"absolute"} bottom={0} marginY={"20px"}>
                                                        <Button onClick={prevPage} fontSize={{ base: "12px", md: "16px", lg: "16px" }}>ANTERIOR</Button>,
                                                        <Text fontSize={{ base: "12px", md: "16px", lg: "16px" }} color={"white"}>1 de 1</Text>,
                                                        <Button onClick={nextPage} fontSize={{ base: "12px", md: "16px", lg: "16px" }} bg={"#FFFF01"}>SIGUIENTE</Button>
                                                    </Box>
                                                )
                                                :
                                                null
                                        }
                             </Center>

                        </TabPanel>


                                <TabPanel position={"relative"} bg={"#1F1F1F"} minHeight={{ base: "1080", md: "590px", lg: "590px" }} mb={"50px"} borderBottomRightRadius={"10px"} borderBottomLeftRadius={"10px"}>
                                    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={4} mt={"10px"}>
                                        {
                                            myAnswers ? myAnswers.map((q, i) => {
                                                return <CardProfile title={q.title} description={q.body} id={q._id} key={i} />
                                            }) : null
                                        }
                                    </SimpleGrid>
                             <Center>
                                        {
                                            myAnswers.length > 6 ?
                                                (
                                                    <Box display={"flex"} alignItems="center" justifyContent={"space-between"} gap={3} position={"absolute"} bottom={0} marginY={"20px"}>
                                                        <Button onClick={prevPage} fontSize={{ base: "12px", md: "16px", lg: "16px" }}>ANTERIOR</Button>,
                                                        <Text fontSize={{ base: "12px", md: "16px", lg: "16px" }} color={"white"}>{page} de {totalPages} </Text>,
                                                        <Button onClick={nextPage} fontSize={{ base: "12px", md: "16px", lg: "16px" }} bg={"#FFFF01"}>SIGUIENTE</Button>
                                                    </Box>
                                                )
                                                :
                                                null
                                        }
                             </Center>

                        </TabPanel>
                    </TabPanels>
                    </Tabs>
                </Box>
            </Box>
            </Center>
            <Footer />
        </Flex>
    )
}

export default Profile


