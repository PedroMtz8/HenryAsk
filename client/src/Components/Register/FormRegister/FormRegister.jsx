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
    InputRightElement
} from '@chakra-ui/react'
import { CheckCircleIcon, InfoIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from "../../AuthComponents/AuthContext"

const paises = ['Argentina', 'Brasil', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Ecuador', 'El Salvador', 'España', 'Estados Unidos', 'Guatemala', 'Guinea Ecuatorial', 'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'Puerto Rico', 'República Dominicana', 'Uruguay', 'Venezuela', 'OTROS']

const FormRegister = () => {

    const navigate = useNavigate()

    const { signup, signout } = useAuth()

    const [infoUser, setInfoUser] = useState({
        userSlack: "",
        country: "",
        email: "",
        password: ""
    });

    const [errorInfoUser, setErrorInfoUser] = useState({
        userSlack: "black",
        country: "black",
        email: "black",
        password: {
            complete: "black",
            capitalLetter: "gray",
            digit: "gray",
            specialCharacter: "gray",
            eightCharacters: "gray"
        }
    })

    const [showSubmitButton, setShowSubmitButton] = useState(true)


    useEffect(() => {
        setShowSubmitButton(!(
            (errorInfoUser.userSlack === "green")
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

            const complete =  (/[A-Z]/.test(current)
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

                console.log(complete)

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
        else {
            setErrorInfoUser({
                ...errorInfoUser, [e.target.name]: (e.target.value === "") ? "red" : "green"
            })
        }
    }

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const ShowPassword = ({ colorError }) => {

        return (
            <SimpleGrid columns={2}
                spacing={3}>
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
        )
    }


    const submitHandler = async (e) => {
        e.preventDefault()
        await signup(infoUser.email, infoUser.password, infoUser.userSlack, infoUser.country)
        console.log(infoUser)
        await signout()
    }

    return (
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
                    
                        <FormControl id="userSlack"
                            fontSize={".8rem"}
                             >
                            <Input name='userSlack'
                                placeholder='Usuario de Slack con tu cohorte'
                                borderColor={errorInfoUser.userSlack}
                                focusBorderColor='black'
                                _hover={{ borderColor: errorInfoUser.userSlack }}
                                value={infoUser.userSlack}
                                onChange={onChangeInput}
                                onBlur={(e) => setErrorInfoUser({
                                    ...errorInfoUser, [e.target.name]: (e.target.value === "") ? "red" : "green"
                                })}
                            />
                            <Flex justifyContent={"flex-end"}>
                            {(errorInfoUser.userSlack === "red") && <Text color="red"  >* Campo obligatorio</Text>}
                            </Flex>
                        </FormControl>
                    
                    <FormControl id="country"
                        fontSize={".8rem"}>
                        <Select name="country"
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
                    <FormControl id="email"
                        fontSize={".8rem"}>
                        <Input name='email'
                            placeholder='Email'
                            type="email"
                            borderColor={errorInfoUser.email}
                            focusBorderColor='black'
                            _hover={{ borderColor: errorInfoUser.email }}
                            value={infoUser.email}
                            onChange={onChangeInput} />
                        <Flex justifyContent="flex-end">
                            {(errorInfoUser.email === "red") && <Text color="red">* Email no válido</Text>}
                        </Flex>
                    </FormControl>
                    <FormControl id="password">
                        <InputGroup size='md'>
                            <Input name='password'
                                placeholder='Contraseña'
                                type={show ? 'text' : 'password'}
                                borderColor={errorInfoUser.password.complete}
                                focusBorderColor='black'
                                _hover={{ borderColor: errorInfoUser.password.complete }}
                                value={infoUser.password}
                                onChange={onChangeInput} />
                            <InputRightElement width='3rem'>
                                {show ? <ViewIcon fontSize={"1.5rem"} onClick={handleClick} /> : <ViewOffIcon fontSize={"1.5rem"} onClick={handleClick} />}
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>


                    {<ShowPassword colorError={errorInfoUser.password} />}


                    <Stack spacing={4}>
                        <Button bg='#ffff01'
                            type='submit'
                            color='black'
                            disabled={showSubmitButton}
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
    )
}

export default FormRegister;