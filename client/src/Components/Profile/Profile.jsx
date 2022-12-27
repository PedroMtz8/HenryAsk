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
    TabPanel,
    Input,
} from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import CardProfile from "./Card Profile/CardProfile";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthComponents/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { getUserQuestions } from "../../slices/userSlice";
import { getUserData } from "../../slices/userSlice";

let examplePost = [
    { title: "Como hacer un map", body: "No entiendo como hacer un map con el metodo map...", _id: "43971" },
    { title: "Problema con QuickSort", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos culpa rem consectetur earum iure reiciendis repellat, sint aspernatur enim quaerat?", _id: "9311" },
    { title: "Me esta dando un error al hacer un post", body: "Al intentar hacer un post me da un error...", _id: "845" },
    { title: "Ayuda con un evento", body: "El evento onClick blablabla", _id: "143" },
    { title: "Ayuda con un evento", body: "El evento onClick blablabla", _id: "31" },
    { title: "Ayuda con un evento", body: "El evento onClick blablabla", _id: "1" },
    { title: "Ayuda con un evento", body: "El evento onClick blablabla", _id: "971" },
    { title: "Ayuda con un evento", body: "El evento onClick blablabla", _id: "863971" },
    { title: "Ayuda con un evento", body: "El evento onClick blablabla", _id: "56471" },
]

const Profile = () => {
    const dispatch = useDispatch()
    const { user, uploadFile } = useAuth()
    const [page, setPage] = useState(1)
    const [answers, setanswers] = useState(examplePost)
    const [file, setFile] = useState(null)
    const [photo, setPhoto] = useState(null)

    const userData = useSelector(state => state.user.user)
    const myQuestions = useSelector(state => state.user.userQuestions)

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

    async function handleSubmit(e) {
        e.preventDefault()
        let res = await uploadFile(file, user.uid)
        setPhoto(res)
        console.log("Archivo cargado", res)
    }

    useEffect(() => {
        /* dispatch(getUserData(user.accessToken)) */
        dispatch(getUserQuestions(user.accessToken, user.uid, page))
    }, [])

    return(
        <Flex backgroundColor={"#1F1F1F"} h={"auto"} w='100%' flexFlow={"column"} >
            <NavBar />
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
                                    backgroundImage={`url(${photo})`}
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
                                    onChange={e => setFile(e.target.files[0])}
                                />
                                <Button w={"100px"} onClick={handleSubmit}  >Submit</Button>
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
                                    <Img src="https://cdn-icons-png.flaticon.com/512/3176/3176294.png" w={"16px"} h={"16px"} />
                                    <Text > {userData?.rol} </Text>
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
                                <Tab _selected={{ color: 'white', bg: "#1F1F1F" }} >Mis respuestas: ({answers.length}) </Tab>
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


                                <TabPanel position={"relative"} bg={"#1F1F1F"} minHeight={{ base: "1080", md: "590px", lg: "590px" }} mb={"50px"} borderBottomRightRadius={"10px"} borderBottomLeftRadius={"10px"}>
                                    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={4} mt={"10px"}>
                                        {
                                            answers ? currentQuestions.map((q, i) => {
                                                return <CardProfile title={q.title} description={q.body} id={q._id} key={i} />
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


