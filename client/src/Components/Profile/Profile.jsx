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


const Profile = () => {

    const [questions, setQuestions] = useState([
        {title:"Como hacer un map", description: "No entiendo como hacer un map con el metodo map..."},
        {title:"Problema con QuickSort", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos culpa rem consectetur earum iure reiciendis repellat, sint aspernatur enim quaerat?"},
        {title:"Me esta dando un error al hacer un post", description:"Al intentar hacer un post me da un error..."},
        {title:"Ayuda con un evento", description:"El evento onClick blablabla"}
    ])


    return(
        <Box backgroundColor={"#1F1F1F"} h={"100vh"} >
            <NavBar />
                Profile
            <Center>
            <Box backgroundColor={"#F2F2F2"} height={"700px"} w={"70%"} mt={"50px"} borderRadius={"10px"} >
                <Flex >
                    <Box margin={"30px"}>

                <Img src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60" width={"100px"} height={"100px"} borderRadius={"50%"} border={"1px solid black"} /* margin={"30px"} */ />
                <Button >Edit photo</Button>
                    </Box>
                <Flex flexDirection={"column"} mt={"20px"} h={"inherit"}>

                <Text  fontSize={"32px"}  fontWeight={"bold"} > Nombre de Usuario <Button>Edit</Button> </Text>
                    <Box display={"inline-flex"} alignItems={"center"} gap={2} >
                        <Img src="https://cdn-icons-png.flaticon.com/512/1041/1041897.png" w={"16px"} h={"16px"} />    
                        <Text  >Ciudad, Pais</Text>
                    </Box>  
                    <Box display={"inline-flex"} alignItems={"center"} gap={2}>
                        <Img src="https://cdn-icons-png.flaticon.com/512/3176/3176294.png" w={"16px"} h={"16px"} />    
                        <Text > Egresado</Text>
                    </Box>
                    <Box display={"inline-flex"} alignItems={"center"} gap={2}>
                        <Img src="https://cdn-icons-png.flaticon.com/512/2720/2720867.png" w={"16px"} h={"16px"}/>
                        <Text >324</Text>
                    </Box>
                        </Flex>
                </Flex>
                    {/* Preguntas y respuestas */}
                <Box marginX={"50px"} w={"90%"} >
                    <Tabs variant="enclosed"  >
                    <TabList>
                        <Tab  _selected={{ color: 'white', bg: "#1F1F1F" }}>Mis preguntas: (5) </Tab>
                        <Tab _selected={{ color: 'white', bg: "#1F1F1F" }} >Mis respuestas: (0) </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel position={"relative"} bg={"#1F1F1F"} h={"450px"} borderRightRadius={"10px"} borderBottomLeftRadius={"10px"}>
                                <SimpleGrid columns={2} gap={4} mt={"10px"}>
                                    {
                                            questions.map((q, i) => {
                                                return <CardProfile title={q.title} description={q.description} key={i} />
                                        })
                                    }
                                </SimpleGrid>

                             <Center>
                             <Box display={"flex"} alignItems="center" gap={5} position={"absolute"} bottom={0} marginY={"20px"}>
                                <Button>ANTERIOR</Button>
                                <Text color={"white"}>1 de 7</Text>
                                <Button bg={"#FFFF01"}>SIGUIENTE</Button>
                             </Box>
                             </Center>
                        </TabPanel>
                        <TabPanel position={"relative"} bg={"#1F1F1F"} h={"400px"} borderRightRadius={"10px"} borderBottomLeftRadius={"10px"}>
                        <Text color={"white"} >holaa</Text>
                             <Center>
                             <Box display={"flex"} alignItems="center" gap={5} position={"absolute"} bottom={0} marginBottom={"20px"}>
                                <Button>ANTERIOR</Button>
                                <Text color={"white"}>1 de 4</Text>
                                <Button bg={"#FFFF01"}>SIGUIENTE</Button>
                             </Box>
                             </Center>
                        </TabPanel>
                    </TabPanels>
                    </Tabs>
                </Box>

            </Box>
            </Center>
        </Box>
    )
}

export default Profile


