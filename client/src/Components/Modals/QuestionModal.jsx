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
  Textarea,
  Select
 } from "@chakra-ui/react"
import { useState } from "react"
import { useRef } from "react"
import axios from "axios"
import API_URL from "../../config/environment"
import { useAuth } from "../AuthComponents/AuthContext"
import TextEditor from "../Posts/TextEditor"
import JoditEditor, { Jodit } from "jodit-react";

let modulos = ["Modulo 1", "Modulo 2", "Modulo 3", "Modulo 4", "Sin modulos"]

export default function QuestionModal({title}) {
  const [post, setPost] = useState({
    title: "",
    body: "",
    tags: ["javascript", "node"],
    module: ""
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = useState("xl")
  const { user } = useAuth()
  const editor = useRef(null);

  const config = {
    readonly: false,
    enableDragAndDropFileToEditor: true,
    placeholder: "Escriba aqui por favor...",
    height: "450px",
    width: "100%",
    removeButtons: ["brush", "file", "copyformat"],
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: true,
    toolbarSticky: true,
  };


  const initialRef = useRef(null)
  const finalRef = useRef(null)



  const handleChange = (e) => {
    /*  e.preventDefault() */
    setPost({
      ...post,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let token = user.accessToken
    await axios.post(API_URL + "/posts", post, { headers: { Authorization: "Bearer " + token } })
  }

  return (
    <>
      <Button marginTop={"5px"} backgroundColor={"#FFFF01"} key={size} m={4} onClick={onOpen}>{title}</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent w={"80vw"}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton _hover={{background: "tomato"}} />
          <ModalBody pb={6}>
            <form >
            <FormControl>
              <FormLabel fontSize={"24px"}>Titulo de pregunta</FormLabel>
              <Text mb={"5px"} >Se especifico e imagina que estas preguntandole a otra persona.</Text>
                <Input name="title" value={post.title} onChange={handleChange} ref={initialRef} placeholder='Escribe tu pregunta...' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize={"24px"}>Cuerpo</FormLabel>
              <Text mb={"5px"} >El cuerpo de la pregunta contiene los detalles de tu problema y, a futuro, la resolucion de este.</Text>
                {/*  <JoditEditor
                  ref={editor}
                  config={config}
                  name="body"
                  value={post.body}
                  tabIndex={1} // tabIndex of textarea
                  onChange={handleChange}
                /> */}

                <Textarea name="body" value={post.body} onChange={handleChange} h={"400px"} placeholder="Describe tu problema..." />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize={"24px"}>Tags</FormLabel>
              <Text mb={"5px"} >Añade hasta 3 tags para describir sobre que tecnologias es tu problema</Text>
                <Input name="tags" value={post.tags} onChange={handleChange} placeholder="JAVASCRIPT, REACT..." />
            </FormControl>

              <FormControl mt={4}>
                <FormLabel fontSize={"24px"}>Modulo</FormLabel>
                <Text mb={"5px"} >Agrega a que modulo corresponde esta pregunta</Text>
                <Select name="module" onChange={handleChange} >
                  <option /* value="anything" */ disabled /* selected */ >Selecciona el modulo</option>
                  {
                    modulos.map((m, i) => {
                      return <option key={i} value={m}>{m}</option>
                    })
                  }
                </Select>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} bg='#ffff01' _hover={{ background: "black", color: "white" }} boxShadow={"0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);"} mr={3}>
              Enviar
            </Button>
            <Button _hover={{background: "tomato"}} onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}