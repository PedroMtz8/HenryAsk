import './styles.scss'

import { EditorContent, useEditor } from '@tiptap/react'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import { useRef, useState } from 'react'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import codeBlock from '../../assets/codeblock.png'
import left from '../../assets/left.png'
import center from '../../assets/center.png'
import right from '../../assets/right.png'
import dotlist from '../../assets/dot.png'
import numberlist from '../../assets/number.png'
import image from '../../assets/image.png'
import { RiArrowGoBackLine } from "react-icons/ri"
import { RiArrowGoForwardFill } from "react-icons/ri"
import { useAuth } from '../AuthComponents/AuthContext'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'


const MenuBar = ({ editor }) => {
    const hiddenFileInput = useRef(null);
    const { user, uploadFile } = useAuth()
    const [ file, setFile ] = useState(null)
    const [ preview, setPreview ] = useState(null)
    const userData = useSelector(state => state.user.user)

    
    const handleChange = async e => {
        /* const fileUploaded = e.target.files[0];
        await settingFile(fileUploaded) */
        if(e.target.files && e.target.files.length > 0){
            /* let reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            console.log("otro reader: ", reader)
            reader.addEventListener("loadend", ()=>{
                console.log("console log del reader",reader)
                setFile(reader.result)
            }) */
            setFile(e.target.files[0])
        }
        console.log(file)
        /* await settingFile() */
        /* uploadFile(fileUploaded, user.uid, user.uid).
        then(url => {
            editor.chain().focus().setImage({ src: fileUploaded, alt: 'Imagen no encontrada :(' }).run()
        }) */
    };
    
    
    async function settingFile(){
       await editor.chain().focus().setImage({src: preview, alt: "Imagen no encontrada :("}).run()
    }
        useEffect(()=>{
            if(file){
                // ESTO GENERA UN LECTOR DE ARCHIVOS
                const reader = new FileReader()
                // CUANDO EL ARCHIVO CARGA LO SETEA EN EL ESTADO
                reader.onloadend = () => {
                    setPreview(reader.result)
                }
                // ESTO HACE QUE SE PUEDA LEER
                reader.readAsDataURL(file)
                // POR ULTIMO HACE QUE SE SETEE LA IMAGEN EN EL INPUT DEL EDITOR.
                settingFile()
            }else{
                setPreview(null)
            }

        }, [file])
        
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
                    <strong>B</strong>
                    <span className='popup'>Negrita (Ctrl+B)</span>
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
                    <span className='popup'>Cursiva (Ctrl+I)</span>
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
                    <span className='popup'>Tachado (Ctrl+Shift+X)</span>
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
                    <span className='popup'>Subrayado (Ctrl+U)</span>
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
                    <span className='popup'>Código (Ctrl+E)</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleCodeBlock().run()
                    }}
                    className={editor.isActive('codeBlock') ? 'is-active-img' : 'img'}
                >
                    <img src={codeBlock} alt="" style={{ minWidth: '21.6px', width: '21.6px' }} />
                    <span className='popup'>Bloque de código (Ctrl+Alt+C)</span>
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
                    <span className='popup'>Párrafo (Ctrl+Alt+0)</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : 'is-inactive'}
                >
                    h1
                    <span className='popup'>Heading 1 (Ctrl+Alt+1)</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : 'is-inactive'}
                >
                    h2
                    <span className='popup'>Heading 2 (Ctrl+Alt+2)</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : 'is-inactive'}
                >
                    h3
                    <span className='popup'>Heading 3 (Ctrl+Alt+3)</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleHeading({ level: 4 }).run()
                    }}
                    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : 'is-inactive'}
                >
                    h4
                    <span className='popup'>Heading 4 (Ctrl+Alt+4)</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleHeading({ level: 5 }).run()
                    }}
                    className={editor.isActive('heading', { level: 5 }) ? 'is-active' : 'is-inactive'}
                >
                    h5
                    <span className='popup'>Heading 5 (Ctrl+Alt+5)</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleHeading({ level: 6 }).run()
                    }}
                    className={editor.isActive('heading', { level: 6 }) ? 'is-active' : 'is-inactive'}
                >
                    h6
                    <span className='popup'>Heading 6 (Ctrl+Alt+6)</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleBulletList().run()
                    }}
                    className={editor.isActive('bulletList') ? 'is-active-img' : 'img'}
                >
                    <img src={dotlist} style={{ minWidth: '26px', width: '26px' }} />
                    <span className='popup'>Viñetas (Ctrl+Shift+8)</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleOrderedList().run()
                    }}
                    className={editor.isActive('orderedList') ? 'is-active-img' : 'ol'}
                >
                    <img src={numberlist} style={{ minWidth: '24px', width: '24px' }} />
                    <span className='popup'>Numeración (Ctrl+Shift+7)</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().setTextAlign('left').run()
                    }}
                    className={editor.isActive({ textAlign: 'left' }) ? 'is-active-img' : 'img'}
                >
                    <img src={left} style={{ minWidth: '22.3px', width: '22.3px' }} />
                    <span className='popup'>Izquierda (Ctrl+Shift+L)</span>
                </button>

                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().setTextAlign('center').run()
                    }}
                    className={editor.isActive({ textAlign: 'center' }) ? 'is-active-img' : 'img'}
                >
                    <img src={center} style={{ minWidth: '25.2px', width: '25.2px' }} />
                    <span className='popup'>Centro (Ctrl+Shift+E)</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor.chain().focus().setTextAlign('right').run()
                    }}
                    className={editor.isActive({ textAlign: 'right' }) ? 'is-active-img' : 'img'}
                >
                    <img src={right} style={{ minWidth: '24px', width: '24px' }} />
                    <span className='popup'>Derecha (Ctrl+Shift+R)</span>
                </button>
                <button onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().setHardBreak().run()
                }}>
                    \n
                    <span className='popup'>Salto de línea (Ctrl+Enter)</span>
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
                    <span className='popup'>Deshacer (Ctrl+Z)</span>
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
                    <span className='popup'>Rehacer (Ctrl+Y)</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        hiddenFileInput.current.click();
                    }}
                    className={'img'}
                >
                    <img src={image} alt="" style={{ minWidth: '27px', width: '27px' }} />
                    <span className='popup'>Agregar imagen</span>
                </button>
                <input type="file" ref={hiddenFileInput} 
                onChange={handleChange} 
                style={{ display: 'none' }} 
                accept="image/png, image/gif, image/jpeg" />
            </div>
        </div >
    )
}

export default ({ post, setPost, setBodyText }) => {
    const [editable, setEditable] = useState(true)
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Underline,
            Image,
            Placeholder.configure({
                placeholder: 'Detalla tu pregunta...'
            })
        ],
        editable: true,
        onUpdate({ editor }) {
            setBodyText(editor.getText())
            setPost({ ...post, body: editor.getHTML() })
        },
    })

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent  editor={editor} />
        </div>
    )
}