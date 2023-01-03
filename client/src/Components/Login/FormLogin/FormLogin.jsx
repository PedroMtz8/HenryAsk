import { useState, useEffect } from 'react'
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
    Checkbox,
    Center,
    Box,
    useToast
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useNavigate, Link as RouteLink } from 'react-router-dom'
import { useAuth } from "../../AuthComponents/AuthContext"
import { getUserData } from "../../../slices/userSlice";
import { useDispatch, useSelector } from 'react-redux'

const FormLogin = () => {

    const toast = useToast()
    const navigate = useNavigate()
    const { login, signout, user } = useAuth()
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user.user)
    

    const [infoUser, setInfoUser] = useState({
        email: "",
        password: ""
    });
    const [wrongPass, setWrongPass] = useState(false)
    const [wrongEmail, setWrongEmail] = useState(false)
    const [attempts, setAttempts] = useState(false)

    const [errorInfoUser, setErrorInfoUser] = useState({
        email: "black",
        password: {
            complete: "black",
            capitalLetter: false,
            digit: false,
            specialCharacter: false,
            eightCharacters: false
        }
    })

    const [showSubmitButton, setShowSubmitButton] = useState(true)

    useEffect(() => {
        setShowSubmitButton(!(
            (errorInfoUser.email === "green")
            &&
            (errorInfoUser.password.complete === "green")))
    }, [errorInfoUser])

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
                    capitalLetter: /[A-Z]/.test(e.target.value),
                    digit: /[0-9]/.test(e.target.value),
                    specialCharacter: /[$@$!%*?&#+-.]/.test(e.target.value),
                    eightCharacters: (e.target.value.length > 8)
                }
            })
        }
    }

    const showPasswordErrorText = () => {

        if (errorInfoUser.password.complete === "red") {
            return (<Text color="red">{
                (infoUser.password === "") ? "* Campo obligatorio"
                    : !(errorInfoUser.password.eightCharacters) ? "* Al menos 8 caracteres"
                        : !(errorInfoUser.password.capitalLetter) ? "* Una mayuscula"
                            : !(errorInfoUser.password.specialCharacter) ? "* Un caracter especial"
                                : "* Un numero"
            }</Text>)
        }
    }

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setWrongPass(false)
            setWrongEmail(false)
            setAttempts(false)
            const res = await login(infoUser.email, infoUser.password)
            dispatch(getUserData(res.user.accessToken))
        } catch (error) {
            if (error.message.includes("auth/wrong-password")) setWrongPass(true)
            else setWrongPass(false)
            if (error.message.includes("not-found")) setWrongEmail(true)
            else setWrongEmail(false)
            if (error.message.includes("login attempts")) setAttempts(true)
            else setAttempts(false)
        }
    }

    useEffect(() => {
        if(userData?.status === "Esperando") {
            toast({
             description: "Tu confirmación esta pendiente, espera a que sea aprobada",
             duration: 6000,
             isClosable: true,
             status: "info",
             position: "top",
           })
           signout()
         } else if(user && userData?.status === "Aprobado"){
            navigate('/home')
         }
    }, [userData])

    return (
        <VStack >
            <VStack spacing={{ base: 3, lg: 4 }}
                align="left"
                alignSelf="flex-start">
                <Image src='https://assets.soyhenry.com/henry-landing/assets/Henry/logo.png'
                    alt='logoHenry'
                    w="9rem" />
                <Heading fontSize={{ base: '1.2rem', lg: '1.5rem' }}>
                    ¡<Text display={"inline"} boxShadow='0px 7px 0px 0px #ffff01'>Hola</Text> de nuevo! 👋
                </Heading>
                <Text fontSize={{ base: '0.9rem', lg: '1rem' }}
                    color='gray.600'>
                    Ingresa a Henry ASK y resuelve todas tus dudas
                </Text>
            </VStack>
            <form onSubmit={submitHandler}>
                <Stack spacing={3}
                    w={{ base: '19rem', sm: '23rem' }}
                    fontSize={{ base: '.75rem', lg: '.8rem' }} >
                    <FormControl id="email"
                        w={{ base: '19rem', sm: '23rem' }}
                        fontSize=".8rem">
                        <Input fontSize={{ base: '.8rem', lg: '1rem' }}
                            name='email'
                            placeholder='Email'
                            type="email"
                            borderColor={errorInfoUser.email}
                            focusBorderColor='black'
                            _hover={{ borderColor: errorInfoUser.email }}
                            value={infoUser.email}
                            onChange={onChangeInput}
                        />
                        <Flex justifyContent="flex-end">
                            {(errorInfoUser.email === "red") &&
                                (<Text color="red">{(infoUser.email === "") ? "* Campo obligatorio" : `* Email no válido`}</Text>)}
                        </Flex>
                    </FormControl>
                    <FormControl id="password"
                        w={{ base: '19rem', sm: '23rem' }}
                        fontSize=".8rem">
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
                        <Flex justifyContent="flex-end">
                            {showPasswordErrorText()}
                        </Flex>
                    </FormControl>
                    <Stack spacing={5}>
                        <Stack fontSize=".9rem"
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}>
                            <RouteLink to="/forgotpassword">
                                <Link as={"u"} fontWeight="semibold" textDecoration={"underline"}>
                                    Olvidé mi contraseña
                                </Link>
                            </RouteLink>
                        </Stack>
                        <Button type='submit'
                            bg='#ffff01'
                            color='black'
                            disabled={showSubmitButton}
                        >
                            Ingresar
                        </Button>
                        {
                            wrongEmail ?
                                <Center>
                                    <Box border={"2px solid red"} color={"red"} w={"90%"} borderRadius={"5px"} p={"5px"} textAlign="center">
                                        <Text>Email no encontrado</Text>
                                    </Box>
                                </Center>
                                : null
                        }
                        {
                            wrongPass ?
                                <Center>
                                    <Box border={"2px solid red"} color={"red"} w={"90%"} borderRadius={"5px"} p={"5px"} textAlign="center">
                                        <Text>La contraseña es incorrecta</Text>
                                    </Box>
                                </Center>
                                : null
                        }
                        {
                            attempts ?
                                <Center>
                                    <Box /* border={"2px solid red"} color={"red"} w={"90%"} borderRadius={"5px"} p={"5px"} */ textAlign="center">
                                        <Text>El acceso a esta cuenta se ha inhabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede volver a intentarlo más tarde</Text>
                                    </Box>
                                </Center>
                                : null
                        }
                        <HStack justifyContent="flex-start"
                            gap={"0.2rem"}
                            fontSize=".9rem">
                            <Text>
                                ¿Aún no tienes una cuenta?
                            </Text>
                            <Link as={"u"} fontWeight="semibold" textDecoration={"underline"}
                                onClick={() => navigate("/signup")}>
                                Regístrate aquí
                            </Link>
                        </HStack>
                    </Stack>
                </Stack>
            </form>
        </VStack>
    )
}

export default FormLogin; 