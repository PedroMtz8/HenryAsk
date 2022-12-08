import { Box, Center } from "@chakra-ui/react";
import NavBar from "../NavBar/NavBar";

const Profile = () => {


    return(
        <Box backgroundColor={"#1F1F1F"} h={"100vh"} >
            <NavBar />
                Profile
            <Center>
            <Box backgroundColor={"#F2F2F2"} height={"700px"} w={"70%"} mt={"50px"} borderRadius={"10px"} >
                
            </Box>
            </Center>
        </Box>
    )
}

export default Profile