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
        <Flex pos="relative" 
            bg="#000000"
            py="1rem"
            color="white"
            fontSize={{base: ".7rem", md: ".9rem"}}
            alignItems="center"
            justifyContent="flex-start"
            flexDir="column"
            gap="2rem">
            <Flex flexDir={{base: "column", sm: "row"}}
                gap={{base: "2rem", md: "6rem"}}
                justifyContent="space-between">
                <Stack spacing={5}>
                    <Stack spacing={-0.2}>
                        <Image src='https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png'
                            alt='logoHenry'
                            w={{base: "160px", md: "200px"}} />
                        <Text>Invertimos en tu educación</Text>
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
                            <Image boxSize="14px" src='https://static-00.iconduck.com/assets.00/linkedin-icon-512x512-dhkaf9ri.png' alt='logoLinkedin' />
                        </Flex>
                        <Flex bg="#ffff01"
                            w="40px"
                            h="40px"
                            justifyContent="center"
                            alignItems="center"
                            borderRadius="40px"
                            cursor="pointer"
                            onClick={e => window.open('https://github.com/PedroMtz8/ASLFNASL', '_blank')}>
                            <Image boxSize="14px" src='https://cdn-icons-png.flaticon.com/512/25/25231.png' alt='logoGitHub' />
                        </Flex>
                        <Flex bg="#ffff01"
                            w="40px"
                            h="40px"
                            justifyContent="center"
                            alignItems="center"
                            borderRadius="40px"
                            cursor="pointer"
                            onClick={e => window.open('https://vimeo.com/', '_blank')}>
                            <Image boxSize="14px" src='https://cdn-icons-png.flaticon.com/512/63/63191.png' alt='logoVimeo' />
                        </Flex>
                        <Flex bg="#ffff01"
                            w="40px"
                            h="40px"
                            justifyContent="center"
                            alignItems="center"
                            borderRadius="40px"
                            cursor="pointer"
                            onClick={e => window.open('https://www.youtube.com', '_blank')}>
                            <Image boxSize="14px" src='https://freeiconshop.com/wp-content/uploads/edd/youtube-solid.png' alt='logoYoutube' />
                        </Flex>
                    </HStack>
                </Stack>
                <Stack align="center"
                    gap="3rem">
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
                </Stack>
            </Flex>
            <Text textAlign="center">
                Hecho con 💛 por alumnos de Henry.<br />
                Henry Hackathon © 2022 | Todos los derechos reservados.
            </Text>
        </Flex>
    )
}

export default Footer;
/* 
<Text>
                Hecho con 💛 por alumnos de Henry.<br />
                Henry Hackathon © 2022 | Todos los derechos reservados.
            </Text> */