import { useState } from 'react'
import {
    Flex,
    Image,
    Text,
    Stack,
    HStack,
    Input,
    Button,
    Box,
    useToast
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const Footer = () => {

    const toast = useToast()
    const [emailSubscription, setEmailSubscription] = useState("")

    const toSubscribe = () => {

        if ((/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(emailSubscription))) {

            toast({
                description: "subscripción exitosa.",
                status: "success",
                duration: 4000,
                isClosable: true
            })

            setEmailSubscription("")

        } else {

            toast({
                description: "Error: proporcionar un email válido.",
                status: "error",
                duration: 4000,
                isClosable: true
            })

            setEmailSubscription("")
        }

    }

    return (
        <Flex bg="#000000"
            h="55vh"
            pt="1rem"
            color="white"
            fontSize=".9rem"
            justifyContent="center"
            gap="9rem">
            <Stack spacing={5}>
                <Stack spacing={-0.2}>
                    <Image src='https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png'
                        alt='logoHenry'
                        w="200px" />
                    <Text>Invertimos en tu educación</Text>
                </Stack>
                <Stack spacing={2}>
                    <Stack spacing={-1}
                        fontWeight="bold">
                        <Text >
                            Consultas a
                        </Text>
                        <Text color="#ffff01">
                            henryask.soporte@gmail.com
                        </Text>
                    </Stack>
                    <Stack
                        fontWeight="bold">
                        <Text >
                            Suscríbete a nuestro newsletter
                        </Text>
                        <HStack>
                            <Input placeholder='Email'
                                bg="#ffffff"
                                color={"black"}
                                borderRadius="5px"
                                value={emailSubscription}
                                onChange={e => setEmailSubscription(e.target.value)} />
                            <Button bg="#ffff01"
                                onClick={toSubscribe}>
                                <EmailIcon color="#000000" />
                            </Button>
                        </HStack>
                    </Stack>
                </Stack>
                <HStack>
                    <Flex bg="#ffff01"
                        w="40px"
                        h="40px"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="40px"
                        cursor="pointer"
                        onClick={e => window.open('https://www.linkedin.com', '_blank')}>
                            <Image boxSize="14px" src='https://static-00.iconduck.com/assets.00/linkedin-icon-512x512-dhkaf9ri.png' alt='logoLinkedin'/>
                    </Flex> 
                    <Flex bg="#ffff01"
                        w="40px"
                        h="40px"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="40px"
                        cursor="pointer"
                        onClick={e => window.open('https://github.com/PedroMtz8/ASLFNASL', '_blank')}>
                            <Image boxSize="14px" src='https://cdn-icons-png.flaticon.com/512/25/25231.png' alt='logoGitHub'/>
                    </Flex>
                    <Flex bg="#ffff01"
                        w="40px"
                        h="40px"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="40px"
                        cursor="pointer"
                        onClick={e => window.open('https://vimeo.com/', '_blank')}>
                            <Image boxSize="14px" src='https://cdn-icons-png.flaticon.com/512/63/63191.png' alt='logoVimeo'/>
                    </Flex>
                    <Flex bg="#ffff01"
                        w="40px"
                        h="40px"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="40px"
                        cursor="pointer"
                        onClick={e => window.open('https://www.youtube.com', '_blank')}>
                            <Image boxSize="14px" src='https://freeiconshop.com/wp-content/uploads/edd/youtube-solid.png' alt='logoYoutube'/>
                    </Flex>
                </HStack>
                <HStack>
                    <Text>
                        <a href='https://www.soyhenry.com/privacy'>
                            Privacy Policy
                        </a>
                    </Text>
                    <Box bg="#ffffff"
                        w=".1rem"
                        h="1rem" />
                    <Text>
                        <a href='https://www.soyhenry.com/terms'>
                            Terms & Conditions
                        </a>
                    </Text>
                </HStack>
            </Stack>
            <Stack align="center"
                gap="3rem">
                <HStack fontWeight="bold"
                    align={"flex-start"}
                    spacing={55}
                    fontSize={"1.2rem"}>
                    <Stack >
                        <Text color={"#ffff01"}>
                            Estudia en Henry
                        </Text>
                        <Stack >
                            <Box>
                                <a href="https://www.soyhenry.com/webfullstack" target="_blank">
                                    Full Stack
                                </a>
                                <br />
                                <a href="https://www.soyhenry.com/admissions" target="_blank">
                                    Admisiones
                                </a>
                                <br />
                                <a href="https://www.soyhenry.com/henry-opiniones" target="_blank">
                                    Opiniones
                                </a>
                                <br />
                                <a href="https://ayuda.soyhenry.com/es/" target="_blank">
                                    Preguntas frecuentes
                                </a>
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Text color={"#ffff01"}>
                            Sobre Henry
                        </Text>
                        <Stack >
                            <Box>
                                <a href="https://www.soyhenry.com/about-us" target="_blank">
                                    Nosotros
                                </a>
                                <br />
                                <a href="https://www.soyhenry.com/prensa" target="_blank">
                                    Prensa
                                </a>
                                <br />
                                <a href="https://blog.soyhenry.com/" target="_blank">
                                    Blog
                                </a>
                                <br />
                                <a href="https://www.soyhenry.com/muro-del-amor" target="_blank">
                                    Muro del amor
                                </a>
                                <br />
                                <a href="https://www.linkedin.com/school/henryok/" target="_blank">
                                    Trabaja en Henry
                                </a>
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Text color={"#ffff01"}>
                            Empresas
                        </Text>
                        <Stack >
                            <Box>
                                <a href="https://www.soyhenry.com/hiring" target="_blank">
                                    Hire our talent
                                </a>
                            </Box>
                        </Stack>
                    </Stack>
                </HStack>
                <HStack>
                    <Text>
                        Hecho con 💛 por alumnos de Henry.<br />
                        Henry Hackathon © 2022 | Todos los derechos reservados.
                    </Text>
                </HStack>
            </Stack>
        </Flex>
    )
}

export default Footer;