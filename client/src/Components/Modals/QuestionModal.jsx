import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  Input,
  FormControl,
  Text,
  Select,
  Box,
  Flex,
  useToast,
  Spinner
} from "@chakra-ui/react"
import { useState } from "react"
import { useRef } from "react"
import axios from "axios"
import API_URL from "../../config/environment"
import { useAuth } from "../AuthComponents/AuthContext"
import Editor from '../Editor/Editor'
import { useEffect } from "react"
let modulos = ["M1", "M2", "M3", "M4", "Graduado"]



export default function QuestionModal({ title }) {
  const { isOpen, onOpen, onClose, isClosable } = useDisclosure()
  const [disabled, setDisabled] = useState(true)
  const { user, deleteFile } = useAuth()
  const [post, setPost] = useState({
    title: "",
    body: "",
    tags: [],
    module: ""
  })
  const [bodyText, setBodyText] = useState('')
  const [error, setError] = useState({
    title: '',
    body: '',
    tags: ''
  })
  const [url, setUrl] = useState(null)

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      let token = user.accessToken
      await axios.post(API_URL + "/posts", post, { headers: { Authorization: "Bearer " + token } })
      onClose()

      toast({
        title: `Pregunta publicada.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      })

      setTimeout(() => {
        window.location.reload(false);
      }, 2000)

    } catch (error) {

      onClose()

      toast({
        title: `No se pudo publicar la pregunta, inténtelo nuevamente.`,
        status: "error",
        duration: 4000,
        isClosable: true,
      })

    } finally{
      setLoading(false)
    } 
  }

  useEffect(() => {
    let disabled = false, errorTitle = '', errorBody = '', errorTags = '', errorModule = ''
    if (post.title.length < 15) {
      disabled = true
      errorTitle = 'Titulo debe tener al menos 15 caracteres'
    }

    if (post.title.length > 150) {
      disabled = true
      errorTitle = 'Limite de 150 caracteres excedido'
    }

    if (bodyText.length < 20) {
      disabled = true
      errorBody = 'Cuerpo debe tener al menos 20 caracteres'
    }

    if (bodyText.length > 30000) {
      disabled = true
      errorBody = 'Limite de 30000 caracteres excedido'
    }

    if(post.tags.length === 0){
      disabled = true
      errorTags = 'Debe haber al menos un tag'
    }

    if(!post.module){
      disabled = true
      errorModule = 'Debes seleccionar un modulo'
    }

    setDisabled(disabled)
    setError({ title: errorTitle, body: errorBody, tags: errorTags, module: errorModule })
  }, [post])

  return (
    <>
      <Button marginTop={"5px"} 
      fontSize={{ base: "10px", sm: "initial", md: "inital", lg: "initial" }}
      backgroundColor={"#FFFF01"} 
      key={'x1'} 
      m={4} 
      onClick={onOpen}>{title}</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          url ?
            deleteFile(url) : null
          setUrl(null)
          onClose()
        }}
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent w={{ sm: "100vw", md: "90vw", lg: '80vw' }}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton onClick={() => {
            url ?
              deleteFile(url) : null
            setUrl(null)
          }} _hover={{ background: "tomato" }} />
          <ModalBody pb={6}>
            <form >
              <FormControl>
                <FormLabel fontSize={"24px"}>Titulo de pregunta</FormLabel>
                <Text mb={"5px"} >Se especifico e imagina que estas preguntandole a otra persona.</Text>
                <Input name="title" value={post.title} onChange={handleChange} ref={initialRef} placeholder='Escribe tu pregunta...' />
                <Text mb={"5px"} color={'red'} >{error.title}</Text>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel fontSize={"24px"} >Cuerpo</FormLabel>
                <Text mb={"5px"} >El cuerpo de la pregunta contiene los detalles de tu problema y, a futuro, la resolucion de este.</Text>
                <Editor post={post} setPost={setPost} setBodyText={setBodyText} setUrl={setUrl} />
                <Text mb={"5px"} color={'red'} >{error.body}</Text>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel fontSize={"24px"}>Tags</FormLabel>
                <Text mb={"5px"} >Añade hasta 3 tags para describir sobre que tecnologias es tu problema</Text>
                <Text fontSize={"14px"}>*Pulsa espacio para agregar cada tag</Text>
                <TagsInput post={post} setPost={setPost} error={error.tags} />
                <Text mb={"5px"} color={'red'}>{error.tags}</Text>

              </FormControl>
              <FormControl mt={4}>
                <FormLabel fontSize={"24px"}>Modulo</FormLabel>
                <Text mb={"5px"} >Agrega a que modulo corresponde esta pregunta</Text>
                <Select name="module" onChange={handleChange} defaultValue={'default'}>

                  <option value="default" disabled hidden>Selecciona el modulo</option>
                  {
                    modulos.map((m, i) => {
                      return <option key={i} value={m}>{m}</option>
                    })
                  }
                </Select>
                <Text mb={"5px"} color={'red'} >{error.module}</Text>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            {loading 
            ? <Flex justifyContent="flex-start" >
              <Spinner
                  thickness='.7rem'
                  speed='0.7s'
                  emptyColor='gray.200'
                  color='#FFFF01'
                  w="5rem"
                  h="5rem"
                  mr='35px'
              />
              </Flex>
            : <Flex>
                <Button onClick={handleSubmit} bg='#ffff01' _hover={{ background: "black", color: "white" }} boxShadow={"0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);"} mr={3} disabled={disabled}>
                Enviar
                </Button>
                <Button _hover={{ background: "tomato" }} onClick={() => {
                  url ?
                    deleteFile(url) : null
                  setUrl(null)
                  onClose()
                }}>Cancelar</Button>
            </Flex>
           }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}



function TagsInput({ post, setPost, error}) {
  const toast = useToast()

  function handleKeyDown(e) {
    console.log('EVENTO:', e)
    console.log('WHICH:', e.which)
    console.log('KEYCODE:',e.keyCode)
    console.log('CODE:',e.code)
    console.log('KEY:',e.key)
    if (e.key !== " ") return

    const value = e.target.value
    if (!value.trim()) return

    let same = post.tags.find(t => t === value.toUpperCase().trim())

    if (post.tags.length > 2) return toast({
      description: "No puedes agregar más de 3 tags",
      status: "error",
      duration: 4000,
      isClosable: true,
      position: "top"
    })
    if (same) return toast({
      description: "No puedes agregar el mismo tag",
      status: "error",
      duration: 4000,
      isClosable: true,
      position: "top"
    })

    setPost({
      ...post,
      tags: [...post.tags, value.toUpperCase().trim()]

    })
    e.target.value = ''
  }

  function removeTag(index) {

    let remove = post.tags.filter((el, i) => i !== index)
    setPost({
      ...post,
      tags: remove
    })
  }

  return (
    <Flex
      border={"1px solid black"}
      minHeight={'50px'}
      h={"auto"}
      alignItems="center"
      wrap={'wrap'}
      w={'100%'}
    >
      {post.tags.map((tag, index) => (
        <Flex
          backgroundColor={"#ffff01"} h={"30px"}
          alignItems="center"
          borderRadius={"15px"} p={"10px"}
          key={index}
          margin={'5px'}
        >

          <Text marginRight={"5px"} >{tag}</Text>
          <Box
            bgColor={"black"}
            color="white"
            borderRadius={"50%"}
            w="25px" h={"25px"}
            textAlign="center"
            cursor={"pointer"}
            onClick={() => removeTag(index)}
            _hover={{ bg: "gray.100", color: 'black' }}
            transition='ease-in 0.2s'>

            <Text >x</Text>
          </Box>
        </Flex>
      ))
      }
      <Input
        alignSelf={"center"}
        border={"none"}
        outline={'none'}
        marginLeft={"15px"}
        focusBorderColor={"transparent"}
        paddingInlineStart={0}
        borderRadius={"none"} w={"200px"} h={"30px"} type="text" onKeyUp={handleKeyDown} placeholder="REACT JAVASCRIPT..." />
    </Flex >
  )
}

