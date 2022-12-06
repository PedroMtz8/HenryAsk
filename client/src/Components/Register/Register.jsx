import {
    Flex,
    VStack,
    HStack,
    FormControl,
    Input,
    Select,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    SimpleGrid,
    Image
} from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

const paises = ['Argentina', 'Brasil', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Ecuador', 'El Salvador', 'España', 'Estados Unidos', 'Guatemala', 'Guinea Ecuatorial', 'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'Puerto Rico', 'República Dominicana', 'Uruguay', 'Venezuela', 'OTROS']

const Register = () => {

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <Flex position='relative'
            h='100vh'
            w='100vw'
            bg='#FFFFFF'
            flexWrap="wrap">
            <Flex w='50%' h="95vh"
                bg="#ffff01" />
            <Flex w='50%' h="95vh"
                justifyContent="center"
                alignItems="center">
                <VStack spacing={6}>
                    <VStack spacing={4}
                        align="left"
                        alignSelf="flex-start">
                        <Image src='https://assets.soyhenry.com/henry-landing/assets/Henry/logo.png'
                            alt='logoHenry'
                            w="9rem" />
                        <Heading fontSize='3xl'>
                            Resuelve tus <Text display={"inline"} boxShadow='0px 7px 0px 0px #ffff01'>dudas</Text> 🚀
                        </Heading>
                        <Text fontSize='1rem'
                            color='gray.600'>
                            Regístrate para ingresar a nuestra plataforma
                        </Text>
                    </VStack>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3} w="23rem" >
                            <HStack justifyContent="space-between">
                                <FormControl id="nombre"
                                    w="48%" >
                                    <Input placeholder='Nombre'
                                        borderColor="black"
                                        focusBorderColor='black'
                                        _hover={{ borderColor: "black" }}
                                    />
                                </FormControl>
                                <FormControl id="Apellido"
                                    w="48%">
                                    <Input placeholder='Apellido'
                                        borderColor="black"
                                        focusBorderColor='black'
                                        _hover={{ borderColor: "black" }} />
                                </FormControl>
                            </HStack>
                            <Select
                                placeholder='Selecciona tu país de residencia'
                                borderColor="black"
                                focusBorderColor='black'
                                _hover={{ borderColor: "black" }}>
                                {paises.map((elem, i) => (<option key={i} value={elem}>{elem}</option>))}
                            </Select>
                            <FormControl id="email">
                                <Input placeholder='Email'
                                    type="email"
                                    borderColor="black"
                                    focusBorderColor='black'
                                    _hover={{ borderColor: "black" }} />
                            </FormControl>
                            <FormControl id="password">
                                <Input placeholder='Contraseña'
                                    type="password"
                                    borderColor="black"
                                    focusBorderColor='black'
                                    _hover={{ borderColor: "black" }} />
                            </FormControl>
                            <SimpleGrid columns={2}
                                spacing={3}
                                color="gray">
                                <Flex alignItems="center" gap={".4rem"}><CheckCircleIcon />Más de 8 caracteres</Flex>
                                <Flex alignItems="center" gap={".4rem"}><CheckCircleIcon />Una mayúscula</Flex>
                                <Flex alignItems="center" gap={".4rem"}><CheckCircleIcon />Un caracter especial</Flex>
                                <Flex alignItems="center" gap={".4rem"}><CheckCircleIcon />Al menos un número</Flex>
                            </SimpleGrid>
                            <Stack spacing={4}>
                                <Button bg='#ffff01'
                                    type='submit'
                                    color='black'
                                >
                                    Registrame
                                </Button>
                                <HStack justifyContent="flex-start"
                                    gap={"0.2rem"}
                                    fontSize=".9rem">
                                    <Text>
                                        ¿Ya tienes una cuenta?
                                    </Text>
                                    <Link as={"u"} fontWeight="semibold" textDecoration={"underline"}
                                        onClick={() => navigate("/login")}>
                                        Ingresa aquí.
                                    </Link>
                                </HStack>
                            </Stack>
                        </Stack>
                    </form>
                </VStack>
            </Flex>
            <Flex h="5vh"
                w='100%'
                bg="black"
                color="white"
                fontSize=".8rem"
                fontWeight="light"
                justifyContent={"space-evenly"}
                alignItems="center">
                <Image src='https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png'
                    alt='logoHenry'
                    w="5rem" />
                <Text>
                    Hecho con 💛. Henry © 2022 | Todos los derechos reservados.
                </Text>
                <Text>
                    ¿Consultas y dudas? Escríbenos a admisiones@soyhenry.com
                </Text>
            </Flex>
        </Flex>
    )
}

export default Register