import { Box, CardBody, Center, Flex, Heading, Img, Stack, Text,
    CardFooter,
    Card,
    SimpleGrid,
    Button,
    Icon,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel, } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import CardProfile from "./Card Profile/CardProfile";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthComponents/AuthContext";

let examplePost = [
    { title: "Como hacer un map", description: "No entiendo como hacer un map con el metodo map..." },
    { title: "Problema con QuickSort", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos culpa rem consectetur earum iure reiciendis repellat, sint aspernatur enim quaerat?" },
    { title: "Me esta dando un error al hacer un post", description: "Al intentar hacer un post me da un error..." },
    { title: "Ayuda con un evento", description: "El evento onClick blablabla" },
    { title: "Ayuda con un evento", description: "El evento onClick blablabla" },
    { title: "Ayuda con un evento", description: "El evento onClick blablabla" },
    { title: "Ayuda con un evento", description: "El evento onClick blablabla" },
    { title: "Ayuda con un evento", description: "El evento onClick blablabla" },
    { title: "Ayuda con un evento", description: "El evento onClick blablabla" },
]

const Profile = () => {
    const { user } = useAuth()
    const [userData, setUserData] = useState(null)
    const [page, setPage] = useState(1)
    const [answers, setanswers] = useState(examplePost)
    const [myQuestions, setMyQuestions] = useState([])

    const indexOfLast = page * 6
    const indexFirst = indexOfLast - 6
    const currentQuestions = answers.slice(indexFirst, indexOfLast)

    let totalPages = Math.ceil(answers.length / 6);

    function prevPage(e) {
        e.preventDefault();
        if (page > 1) return setPage(page - 1);
    }

    const nextPage = (e) => {
        e.preventDefault();
        if (page !== totalPages) return setPage(page + 1);
    };


    const API_URL = "http://localhost:3001"

    const token = user.accessToken
    const getQuestions = async () => {
        let userID = user.uid
        let info = await axios(`${API_URL}/posts/user?page=${page}&user_id=${userID}`, { headers: { Authorization: "Bearer " + token } })
        setMyQuestions(info.data.foundPosts)
    }

    const getUserData = async () => {
        let userData = await axios(`${API_URL}/auth`, { headers: { Authorization: "Bearer " + token } })
        setUserData(userData.data.user)
    }

    useEffect(() => {
        getUserData()
        getQuestions()
    }, [])

    return(
        <Flex backgroundColor={"#1F1F1F"} h={"auto"} w='100%' flexFlow={"column"} >
            <NavBar />
            <Center>
                <Box backgroundColor={"#F2F2F2"} height={"100%"} mb={"50px"} w={{ base: "90%", md: "80%", lg: "70%" }} mt={"50px"} borderRadius={"10px"} >
                    <Flex flexDirection={{ base: "column", md: "initial", lg: "initial" }}  >
                        <Center>
                            <Flex flexDirection={"column"} margin={{ base: "10px", md: "30px", lg: "30px" }} w={"max-content"}  >
                                <Img
                                    src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                                    width={"100px"}
                                    height={"100px"}
                                    borderRadius={"50%"}
                                    border={"1px solid black"} />
                                <Button >Edit photo</Button>
                            </Flex>
                        </Center>
                        <Flex flexDirection={"column"} mt={{ base: "0px", md: "20px", lg: "20px" }} h={"inherit"} textAlign="center" >
                            <Text fontSize={{ base: "24px", md: "32px", lg: "32px" }} fontWeight={"bold"} > {userData?.userSlack} <Button>Edit</Button> </Text>

                            <Flex flexDirection={"column"} >

                                <Box display={"inline-flex"} alignItems={"center"} justifyContent={{ base: "center", md: "start", lg: "start" }} gap={2} >
                                    <Img src="https://cdn-icons-png.flaticon.com/512/1041/1041897.png" w={"16px"} h={"16px"} />
                                    <Text  >Ciudad, {userData?.country}</Text>
                                </Box>
                                <Box display={"inline-flex"} alignItems={"center"} justifyContent={{ base: "center", md: "start", lg: "start" }} gap={2}>
                                    <Img src="https://cdn-icons-png.flaticon.com/512/3176/3176294.png" w={"16px"} h={"16px"} />
                                    <Text > {userData?.rol} </Text>
                                </Box>
                                <Box display={"inline-flex"} alignItems={"center"} justifyContent={{ base: "center", md: "start", lg: "start" }} gap={2}>
                                    <Img src="https://cdn-icons-png.flaticon.com/512/2720/2720867.png" w={"16px"} h={"16px"} />
                                    <Text >324</Text>
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
                                <Tab _selected={{ color: 'white', bg: "#1F1F1F" }} >Mis respuestas: ({answers.length}) </Tab>
                    </TabList>
                    <TabPanels>
                                <TabPanel position={"relative"} bg={"#1F1F1F"} minHeight={{ base: "1080", md: "590px", lg: "590px" }} mb={"50px"} borderRightRadius={"10px"} borderBottomLeftRadius={"10px"}>
                                    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={4} mt={"10px"}>
                                    {
                                            myQuestions ? myQuestions.map((q, i) => {
                                                return <CardProfile title={q.title} description={q.body} key={i} />
                                            }) : null
                                    }
                                    </SimpleGrid>
                             <Center>
                                        {
                                            myQuestions.length > 6 ?
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


                                <TabPanel position={"relative"} bg={"#1F1F1F"} minHeight={{ base: "1080", md: "590px", lg: "590px" }} mb={"50px"} borderRightRadius={"10px"} borderBottomLeftRadius={"10px"}>
                                    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={4} mt={"10px"}>
                                        {
                                            answers ? currentQuestions.map((q, i) => {
                                                return <CardProfile title={q.title} description={q.body} key={i} />
                                            }) : null
                                        }
                                    </SimpleGrid>
                             <Center>
                                        {
                                            answers.length > 6 ?
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
                    {/* <Box backgroundColor={"#1F1F1F"} h={"50px"} /> */}
            </Box>
            </Center>
            <Footer />
        </Flex>
    )
}

export default Profile


