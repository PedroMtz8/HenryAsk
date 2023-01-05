import {  useState, useEffect } from 'react'
import { useAuth } from '../AuthComponents/AuthContext'
import {
    Button,
    Text,
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import axios from 'axios'
import API_URL from '../../config/environment'
import EditAnswerEditor from './EditAnswerEditor'

function EditAnswerModal({  answerData }) {
    const { isOpen, onOpen, onClose, isClosable } = useDisclosure()
    const [text, setText] = useState('')
    const [error, setError] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [body, setBody] = useState('')
    const { user, deleteFile } = useAuth()
    const [url, setUrl] = useState(null)
    const toast = useToast()

    useEffect(() => {
        let disabled = false, error = ''
        if (text.length < 20) {
            disabled = true
            error = 'Cuerpo debe tener al menos 20 caracteres'
        }

        if (text.length > 30000) {
            disabled = true
            error = 'Limite de 30000 caracteres excedido'
        }

        setDisabled(disabled)
        setError(error)
    }, [body])

    useEffect(() => {
        setBody(answerData.body)
    }, [answerData, isOpen])

    const submitAnswer = async () => {

        try {

            console.log
            await axios.put(`${API_URL}/answer`, { answer_id: answerData._id, body }, { headers: { Authorization: "Bearer " + user.accessToken } })

            onClose()

            toast({
                title: `Respuesta editada.`,
                status: "success",
                duration: 4000,
                isClosable: true,
            })

            setTimeout(() => {
                window.location.reload(false);
            }, 2000)

        } catch (error) {

            toast({
                title: `No se pudo editar la respuesta, inténtelo nuevamente.`,
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        }

    }

    return (
        <>
        <Button 
        bg={'black'} 
        color="#FFFF01" 
        p={'0px 16px'} 
        fontSize='12px' 
        h={'2rem'} 
        _hover={{color: 'black' ,bg: '#FFFF01'}}
        onClick={onOpen}>Editar</Button>
        <Modal
        isOpen={isOpen}
        onClose={() => {
          url ? deleteFile(url) : null
          setUrl(null)
          setBody('')
          onClose()
        }}
        size={"full"}
        >
        <ModalOverlay />
        <ModalContent w={{ base: '100vw', sm: "100vw", md: "90vw", lg: '80vw' }}>
          <ModalHeader>Editar respuesta</ModalHeader>
          <ModalCloseButton _hover={{ background: "tomato" }} />
          <ModalBody pb={6}>
            <EditAnswerEditor body={body} setBody={setBody} setText={setText} setUrl={setUrl} />
            <Text color={'red'}>{error}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={submitAnswer} bg='#ffff01' _hover={{ background: "black", color: "white" }} boxShadow={"0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);"} mr={3} disabled={disabled}>
              Enviar
            </Button>
            <Button 
            _hover={{ background: "tomato" }} 
            onClick={() => {
              url ? deleteFile(url) : null
              setUrl(null)
              setBody('')
              onClose()}}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>)
}

export default EditAnswerModal