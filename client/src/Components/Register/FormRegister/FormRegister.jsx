import { useState } from 'react'
import {
    VStack,
    HStack,
    FormControl,
    Input,
    Select,
    Stack,
    Link,
    Button,
    Heading,
    SimpleGrid,
    Flex,
    Text,
    Image,
    InputGroup,
    InputRightElement,
    useToast,
    Center,
    Box,
    Spinner
} from '@chakra-ui/react'
import { CheckCircleIcon, InfoIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from "../../AuthComponents/AuthContext"
import { useDispatch } from 'react-redux'
import axios from 'axios'
import API_URL from '../../../config/environment'
import { approveInTime } from '../../../slices/userSlice'

const paises = ['Argentina', 'Brasil', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Ecuador', 'El Salvador', 'España', 'Estados Unidos', 'Guatemala', 'Guinea Ecuatorial', 'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'Puerto Rico', 'República Dominicana', 'Uruguay', 'Venezuela', 'OTROS']
const roles = ['Estudiante', 'Graduado', 'TA', 'Henry Hero']

const FormRegister = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toast = useToast()
    const { signup, signout, updateUsername, user, login } = useAuth()
    const [submitErrors, setSubmitErrors] = useState({
        emailError: false,
        unexpectedError: false,
        registerError: false
    })

    const [infoUser, setInfoUser] = useState({
        userSlack: "",
        country: "",
        email: "",
        password: "",
        rol: ""
    });

    const [errorInfoUser, setErrorInfoUser] = useState({
        userSlack: {
            complete: 'black',
            length: "gray",
            empty: "gray"
        },
        country: "black",
        email: "black",
        password: {
            complete: "black",
            capitalLetter: "gray",
            digit: "gray",
            specialCharacter: "gray",
            eightCharacters: "gray"
        },
        rol: "black"
    })

    const [showSubmitButton, setShowSubmitButton] = useState(true)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setShowSubmitButton(!(
            (errorInfoUser.userSlack.complete === "green")
            &&
            (errorInfoUser.country === "green")
            &&
            (errorInfoUser.email === "green")
            &&
            (errorInfoUser.password.complete === "green")))
    })

    const onChangeInput = (e) => {

        setInfoUser({ ...infoUser, [e.target.name]: e.target.value })

        if (e.target.name === "email") {
            setErrorInfoUser({
                ...errorInfoUser, email: !(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(e.target.value)) ? "red" : "green"
            })
        }
        else if (e.target.name === "password") {

            const current = e.target.value

            const complete = (/[A-Z]/.test(current)
                &&
                /[0-9]/.test(current)
                &&
                /[$@$!%*?&#+-.]/.test(current)
                &&
                (current.length > 8))
                ?
                "green"
                :
                "red"

            setErrorInfoUser({
                ...errorInfoUser, password: {
                    complete,
                    capitalLetter: /[A-Z]/.test(e.target.value) ? "green" : "red",
                    digit: /[0-9]/.test(e.target.value) ? "green" : "red",
                    specialCharacter: /[$@$!%*?&#+-.]/.test(e.target.value) ? "green" : "red",
                    eightCharacters: e.target.value.length > 8 ? "green" : "red"
                }
            })
        }
        else if (e.target.name === 'userSlack') {
            const current = e.target.value
            let length = current.length <= 30
            let empty = current !== ''

            const complete = length && empty
                ? "green"
                : "red"

            setErrorInfoUser({
                ...errorInfoUser, [e.target.name]: {
                    complete,
                    length,
                    empty
                }
            })
        }

        else {
            setErrorInfoUser({
                ...errorInfoUser, [e.target.name]: (e.target.value === "") ? "red" : "green"
            })
        }
    }

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const submitHandler = async (e) => {
        e.preventDefault()
        try {setLoading(false)
            let res = await signup(infoUser.email, infoUser.password, infoUser.userSlack, infoUser.country) //registro al usario en firebase y en base de datos
            await updateUsername(res.user, infoUser.userSlack)
            
            const admin = await login(import.meta.env.VITE_ADMIN_MAIL, import.meta.env.VITE_ADMIN_PASSWORD)
            await signout()
            
            const result = await axios.post(`${API_URL}/request/registro`, { rol: infoUser.rol },
                {
                    headers:
                        { Authorization: `Bearer ${res.user.accessToken}` }
                }) //creo el pedido para que el usuario sea aprobado por los administradores
                
            toast({
                description: "No refresques la pagina, de lo contrario tendras que esperar a que un administrador te verifique manualmente",
                status: "info",
                duration: 6000,
                isClosable: true,
                position: "top"
            })
            
            toast({
                title: "Registro exitoso",
                description: "Espera 30 segundos a que tu cuenta sea aprobada para poder ingresar, se te notificará por mail",
                status: "success",
                duration: 6000,
                isClosable: true,
                position: "top"
            })
            dispatch(approveInTime({admin, rid: result.data.request._id}))
            navigate("/login")

        }
        catch (error) {

            if (error.code === 'auth/email-already-in-use') {setLoading(true);
                setSubmitErrors({ emailError: true, unexpectedError: false, registerError: false })
            }

            else if (error.response?.status === 409) {setLoading(true);
                setSubmitErrors({ emailError: false, unexpectedError: false, registerError: true })
            }

            else {setLoading(true);
                setSubmitErrors({ emailError: false, unexpectedError: true, registerError: false })
            }

        }
    }

    return (
        <VStack >
            <VStack spacing={{ base: 3, lg: 4 }}
                align="left"
                alignSelf="flex-start">
                <Image src='https://assets.soyhenry.com/henry-landing/assets/Henry/logo.png'
                    alt='logoHenry'
                    w="9rem" />
                <Heading fontSize={{ base: '1rem', lg: '1.3rem' }}>
                    Resuelve tus <Text display={"inline"} boxShadow='0px 7px 0px 0px #ffff01'>dudas</Text> 🚀
                </Heading>
                <Text fontSize={{ base: '0.9rem', lg: '1rem' }}
                    color='gray.600'>
                    Regístrate para ingresar a nuestra plataforma
                </Text>
            </VStack>
            <form onSubmit={submitHandler}>
                <Stack spacing={{ base: 2, lg: 3 }}
                    w={{ base: '19rem', sm: '23rem' }}
                    fontSize={{ base: '.75rem', lg: '.8rem' }} >
                    <FormControl id="userSlack"
                        w={{ base: '19rem', sm: '23rem' }}>
                        <Input fontSize={{ base: '.8rem', lg: '1rem' }}
                            name='userSlack'
                            placeholder='Usuario de Slack con tu cohorte'
                            borderColor={errorInfoUser.userSlack.complete}
                            focusBorderColor='black'
                            _hover={{ borderColor: errorInfoUser.userSlack.complete }}
                            value={infoUser.userSlack}
                            onChange={onChangeInput}
                        />
                        <Flex justifyContent={"flex-end"}>
                            {(!errorInfoUser.userSlack.empty) && <Text color="red">* Campo obligatorio</Text>}
                            {(!errorInfoUser.userSlack['length']) && <Text color="red">* Usuario debe ser menor o igual a 30 caracteres</Text>}
                        </Flex>
                    </FormControl>
                    <FormControl id="country"
                        w={{ base: '19rem', sm: '23rem' }}>
                        <Select fontSize={{ base: '.8rem', lg: '1rem' }}
                            color="gray"
                            name="country"
                            placeholder='Selecciona tu país de residencia'
                            borderColor={errorInfoUser.country}
                            focusBorderColor='black'
                            _hover={{ borderColor: errorInfoUser.country }}
                            value={infoUser.country}
                            onChange={onChangeInput}
                        >
                            {paises.map((elem, i) => <option key={i} value={elem}>{elem}</option>)}
                        </Select>
                        <Flex justifyContent="flex-end">
                            {(errorInfoUser.country === "red") && <Text color="red">* Selecciona un país</Text>}
                        </Flex>
                    </FormControl>
                    <FormControl id="rol" w={{ base: '19rem', sm: '23rem' }}>
                        <Select fontSize={{ base: '.8rem', lg: '1rem' }}
                            name="rol"
                            placeholder='Selecciona tu rol'
                            borderColor={errorInfoUser.rol}
                            focusBorderColor='black'
                            _hover={{ borderColor: errorInfoUser.rol }}
                            value={infoUser.rol}
                            onChange={onChangeInput}
                        >
                            {roles.map((elem, i) => <option key={i} value={elem}>{elem}</option>)}
                        </Select>
                        <Flex justifyContent="flex-end">
                            {(errorInfoUser.rol === "red") && <Text color="red">* Selecciona un rol</Text>}
                        </Flex>
                    </FormControl>
                    <FormControl id="email"
                        w={{ base: '19rem', sm: '23rem' }}>
                        <Input fontSize={{ base: '.8rem', lg: '1rem' }}
                            name='email'
                            placeholder='Email'
                            type="email"
                            borderColor={errorInfoUser.email}
                            focusBorderColor='black'
                            autoComplete="true"
                            _hover={{ borderColor: errorInfoUser.email }}
                            value={infoUser.email}
                            onChange={onChangeInput} />
                        <Flex justifyContent="flex-end">
                            {(errorInfoUser.email === "red") && <Text color="red">* Email no válido</Text>}
                        </Flex>
                    </FormControl>
                    <FormControl id="password"
                        w={{ base: '19rem', sm: '23rem' }}>
                        <InputGroup size='md'>
                            <Input fontSize={{ base: '.8rem', lg: '1rem' }}
                                name='password'
                                placeholder='Contraseña'
                                type={show ? 'text' : 'password'}
                                borderColor={errorInfoUser.password.complete}
                                focusBorderColor='black'
                                autoComplete="false"
                                _hover={{ borderColor: errorInfoUser.password.complete }}
                                value={infoUser.password}
                                onChange={onChangeInput} />
                            <InputRightElement width='3rem'>
                                {show ? <ViewIcon fontSize={"1.5rem"} onClick={handleClick} /> : <ViewOffIcon fontSize={"1.5rem"} onClick={handleClick} />}
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    {showPasswordErrorText(errorInfoUser.password)}

                    <Stack spacing={{ base: 3, lg: 4 }}
                        w={{ base: '19rem', sm: '23rem' }} >
                        {loading ?
                            <Button alignSelf={"center"}
                                bg='#ffff01'
                                type='submit'
                                color='black'
                                fontSize={{ base: '.8rem', lg: '1rem' }}
                                disabled={showSubmitButton}
                                w={{ base: '100%', lg: '23rem' }}
                            >
                                Registrame
                            </Button>
                            :
                            <Flex justifyContent="center" >
                                <Spinner
                                    thickness='.7rem'
                                    speed='0.7s'
                                    emptyColor='gray.200'
                                    color='#FFFF01'
                                    w="5rem"
                                    h="5rem"
                                />
                            </Flex>}

                        {
                            submitErrors.emailError ?
                                <Center>
                                    <Box border={"2px solid red"} color={"red"} w={"90%"} borderRadius={"5px"} p={"5px"} textAlign="center">
                                        <Text>Ya existe un usuario con ese email</Text>
                                    </Box>
                                </Center>
                                :
                                null
                        }

                        {
                            submitErrors.unexpectedError ?
                                <Center>
                                    <Box border={"2px solid red"} color={"red"} w={"90%"} borderRadius={"5px"} p={"5px"} textAlign="center">
                                        <Text>Ocurrio un error inesperado, intentelo de nuevo</Text>
                                    </Box>
                                </Center>
                                :
                                null
                        }

                        {
                            submitErrors.requestError ?
                                <Center>
                                    <Box border={"2px solid red"} color={"red"} w={"90%"} borderRadius={"5px"} p={"5px"} textAlign="center">
                                        <Text>Ya has sido registro, espera a ser aprobado!</Text>
                                    </Box>
                                </Center>
                                :
                                null
                        }

                        <HStack justifyContent={{ base: 'center', lg: 'flex-start' }}
                            gap={"0.2rem"}
                            fontSize={{ base: '.8rem', lg: '1rem' }}>
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
    )
}

export default FormRegister;




const showPasswordErrorText = (colorError) => {

    return (
        <Flex justifyContent="center"
            alignItems="center"
            w={{ base: '19rem', sm: '23rem' }}>
            <SimpleGrid
                columns={2}
                spacing={3}
                fontSize={{ base: '.8rem', lg: '.9rem' }}>
                <Flex alignItems="center"
                    gap={".4rem"}
                    color={colorError.eightCharacters}>
                    {colorError.eightCharacters === "green" ? <CheckCircleIcon /> : <InfoIcon />}
                    Más de 8 caracteres
                </Flex>
                <Flex alignItems="center"
                    gap={".4rem"}
                    color={colorError.capitalLetter}>
                    {colorError.capitalLetter === "green" ? <CheckCircleIcon /> : <InfoIcon />}
                    Una mayúscula
                </Flex>
                <Flex alignItems="center"
                    gap={".4rem"}
                    color={colorError.specialCharacter}>
                    {colorError.specialCharacter === "green" ? <CheckCircleIcon /> : <InfoIcon />}
                    Un caracter especial
                </Flex>
                <Flex alignItems="center"
                    gap={".4rem"}
                    color={colorError.digit}>
                    {colorError.digit === "green" ? <CheckCircleIcon /> : <InfoIcon />}
                    Al menos un número
                </Flex>
            </SimpleGrid>
        </Flex>
    )
}