import { EditorContent, useEditor } from '@tiptap/react'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import { useRef, useState, useEffect } from 'react'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import codeBlock from '../../../assets/codeblock.png'
import left from '../../../assets/left.png'
import center from '../../../assets/center.png'
import right from '../../../assets/right.png'
import dotlist from '../../../assets/dot.png'
import numberlist from '../../../assets/number.png'
import image from '../../../assets/image.png'
import { RiArrowGoBackLine } from "react-icons/ri"
import { RiArrowGoForwardFill } from "react-icons/ri"
import { useAuth } from '../../AuthComponents/AuthContext'
import {
    Grid,
    GridItem,
    Button,
    Text,
    useToast
} from "@chakra-ui/react";
import axios from 'axios'
import API_URL from '../../../config/environment'

function AnswerEditor({ post_id, responseData, setResponseData, token, scrollFrom, scrollTo }) {
    const [body, setBody] = useState('')
    const [text, setText] = useState('')
    const [error, setError] = useState('')
    const [disabled, setDisabled] = useState(true)
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Underline,
            Image,
            Placeholder.configure({
                placeholder: 'Detalla tu respuesta...'
            })
        ],
        editable: true,
        onUpdate({ editor }) {
            setBody(editor.getHTML())
            setText(editor.getText())
        },
    })
    const toast = useToast()

    useEffect(() => {
        let disabled = false, error = ''
        if (text.length < 15) {
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

    const submitAnswer = async () => {

        try {

            await axios.post(`${API_URL}/answer`, { post_id, body }, { headers: { Authorization: "Bearer " + token } })
            const response = await axios.get(API_URL + `/answer/post?page=${responseData.answersPage}&sort=${responseData.answersSort}&post_id=${post_id}`, { headers: { Authorization: "Bearer " + token } })
            setResponseData({ ...responseData, answersArr: response.data.foundAnswers, maxPages: response.data.maxPages })
            scrollTo.current.scrollIntoView({ block: 'end', behavior: 'smooth' })

            toast({
                title: `Respuesta agregada.`,
                status: "success",
                duration: 4000,
                isClosable: true,
            })

        } catch (error) {

            toast({
                title: `No se pudo agregar la respuesta, inténtelo nuevamente.`,
                status: "error",
                duration: 4000,
                isClosable: true,
            })
        }

    }

    return (
        <Grid position="relative"
            templateRows='repeat(3, fit-content)'
            templateColumns='100%'
            p=".8rem"
            boxSize="100%"
            gap="1rem"
            width='80%'
            borderRadius='.375rem'
            background='white'
            mb='1rem'
            templateAreas={`"menu"
                  "editor"
                  "button"`}
            ref={scrollFrom}

        >
            <GridItem area={'menu'} >
                <MenuBar editor={editor} />
            </GridItem >
            <GridItem area={'editor'}  >
                <EditorContent editor={editor} />
                <Text color={'red'}>{error}</Text>
            </GridItem >
            <GridItem area={'button'}  >
                <Button bg="#FFFF01" onClick={submitAnswer} disabled={disabled}>Responder</Button>
            </GridItem >
        </Grid>
    )
}

export default AnswerEditor

const MenuBar = ({ editor, scrollTo }) => {
    const hiddenFileInput = useRef(null);
    const { user, uploadFile } = useAuth()

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        uploadFile(fileUploaded, user.uid).
            then(url => {
                editor.chain().focus().setImage({ src: url, alt: 'Imagen no encontrada :(' }).run()
            })
    };

    if (!editor) {
        return null
    }

    return (
        <div className='menu'>
            <div className='buttons'>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleBold().run()
                    }}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={editor.isActive('bold') ? 'is-active' : 'is-inactive'}
                >
                    <strong>N</strong>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleItalic().run()
                    }}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()

                    }
                    className={editor.isActive('italic') ? 'is-active' : 'is-inactive'}
                >
                    <em>C</em>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleStrike().run()
                    }}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                    className={editor.isActive('strike') ? 'is-active' : 'is-inactive'}
                >
                    <s>T</s>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleUnderline().run()
                    }}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleUnderline()
                            .run()
                    }
                    className={editor.isActive('underline') ? 'is-active' : 'is-inactive'}
                >
                    <u>S</u>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleCode().run()
                    }}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleCode()
                            .run()
                    }
                    className={editor.isActive('code') ? 'is-active' : 'is-inactive'}
                >
                    {'</>'}
                </button>
                <button onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().unsetAllMarks().run()
                }}>
                    <span>Eliminar marcas</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().setParagraph().run()
                    }}
                    className={editor.isActive('paragraph') ? 'is-active' : 'is-inactive'}
                >
                    p
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : 'is-inactive'}
                >
                    h1
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : 'is-inactive'}
                >
                    h2
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : 'is-inactive'}
                >
                    h3
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleHeading({ level: 4 }).run()
                    }}
                    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : 'is-inactive'}
                >
                    h4
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleHeading({ level: 5 }).run()
                    }}
                    className={editor.isActive('heading', { level: 5 }) ? 'is-active' : 'is-inactive'}
                >
                    h5
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleHeading({ level: 6 }).run()
                    }}
                    className={editor.isActive('heading', { level: 6 }) ? 'is-active' : 'is-inactive'}
                >
                    h6
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleBulletList().run()
                    }}
                    className={editor.isActive('bulletList') ? 'is-active-img' : 'img'}
                >
                    <img src={dotlist} style={{ minWidth: '26px', width: '26px' }} />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleOrderedList().run()
                    }}
                    className={editor.isActive('orderedList') ? 'is-active-img' : 'ol'}
                >
                    <img src={numberlist} style={{ minWidth: '24px', width: '24px' }} />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleCodeBlock().run()
                    }}
                    className={editor.isActive('codeBlock') ? 'is-active-img' : 'img'}
                >
                    <img src={codeBlock} alt="" style={{ minWidth: '21.6px', width: '21.6px' }} />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().setTextAlign('left').run()
                    }}
                    className={editor.isActive({ textAlign: 'left' }) ? 'is-active-img' : 'img'}
                >
                    <img src={left} style={{ minWidth: '22.3px', width: '22.3px' }} />
                </button>

                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().setTextAlign('center').run()
                    }}
                    className={editor.isActive({ textAlign: 'center' }) ? 'is-active-img' : 'img'}
                >
                    <img src={center} style={{ minWidth: '25.2px', width: '25.2px' }} />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().setTextAlign('right').run()
                    }}
                    className={editor.isActive({ textAlign: 'right' }) ? 'is-active-img' : 'img'}
                >
                    <img src={right} style={{ minWidth: '24px', width: '24px' }} />
                </button>
                <button onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().setHardBreak().run()
                }}>
                    \n
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().undo().run()
                    }}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                    className={'img'}
                >
                    <RiArrowGoBackLine size={'24px'} />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().redo().run()
                    }}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                    className={'img'}
                >
                    <RiArrowGoForwardFill size={'24px'} />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        hiddenFileInput.current.click();
                    }}
                    className={'img'}
                >
                    <img src={image} alt="" style={{ minWidth: '27px', width: '27px' }} />
                </button>
                <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} accept="image/png, image/gif, image/jpeg" />
            </div>
        </div >
    )
}