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
  Textarea
 } from "@chakra-ui/react"
import { useState } from "react"

 import { useRef } from "react"


export default function QuestionModal({title}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = useState("xl")

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const handleSizeClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }

  const sizes = ['xl']

  return (
    <>
    <Button marginTop={"5px"} backgroundColor={"#FFFF01"} key={size} m={4} onClick={onOpen}>{title}</Button>
     {/*  <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button> */}

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
            <FormControl>
              <FormLabel fontSize={"24px"}>Titulo de pregunta</FormLabel>
              <Text mb={"5px"} >Se especifico e imagina que estas preguntandole a otra persona.</Text>
              <Input ref={initialRef} placeholder='Escribe tu pregunta...' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize={"24px"}>Cuerpo</FormLabel>
              <Text mb={"5px"} >El cuerpo de la pregunta contiene los detalles de tu problema y, a futuro, la resolucion de este.</Text>
              <Textarea h={"400px"} placeholder="Describe tu problema..." />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize={"24px"}>Tags</FormLabel>
              <Text mb={"5px"} >Añade hasta 3 tags para describir sobre que tecnologias es tu problema</Text>
              <Input  placeholder="JAVASCRIPT, REACT..." />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button bg='#ffff01' _hover={{background: "black", color: "white"}} boxShadow={"0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);"} mr={3}>
              Enviar
            </Button>
            <Button _hover={{background: "tomato"}} onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}