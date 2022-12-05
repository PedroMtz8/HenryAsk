import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'

const paises = ['Argentina', 'Brasil', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Ecuador', 'El Salvador', 'España', 'Estados Unidos', 'Guatemala', 'Guinea Ecuatorial', 'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'Puerto Rico', 'República Dominicana', 'Uruguay', 'Venezuela', 'OTROS']

const Register = () => {

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <Flex className='App'
            position='relative'
            h='100vh'
            w='100%'
            bg='blackAlpha.100'
        >
            <Flex w='50%' bg={"#ffff01"} />
            <Flex w='50%' >
                <Stack w={"40rem"} spacing={2} mx={'auto'} maxW={'lg'} py={20} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>
                            Registrate en Henry Ask
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            Y resuelve todas tus dudas ✌️
                        </Text>
                    </Stack>
                    <Box maxH={"80%"}
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={7} >
                                <Flex justifyContent={"space-between"}>
                                    <FormControl w={"48%"} id="nombre">
                                        <Input placeholder='Nombre' />
                                    </FormControl>
                                    <FormControl w={"48%"} id="Apellido">
                                        <Input placeholder='Apellido' />
                                    </FormControl>
                                </Flex>
                                <Select
                                    placeholder='Selecciona tu país de residencia'>
                                    {paises.map(elem => (<option value={elem}>{elem}</option>))}
                                </Select>
                                <FormControl id="email">
                                    <Input placeholder='Email' type="email" />
                                </FormControl>
                                <FormControl id="password">
                                    <Input placeholder='Contraseña' type="password" />
                                </FormControl>
                                <FormControl id="passwordRepeat">
                                    <Input placeholder='Repetir contraseña' type="password" />
                                </FormControl>
                                <Stack spacing={4}>
                                    <Button type='submit'
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Registrarse
                                    </Button>
                                    <Flex justifyContent={"center"} gap={"0.3rem"}>
                                        <Text>
                                            ¿Ya tienes una cuenta?
                                        </Text>
                                        <Link color={'blue.400'}
                                            onClick={() => navigate("/login")}>
                                            Ingresa aquí.
                                        </Link>
                                    </Flex>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Flex>
        </Flex>
    )
}

export default Register