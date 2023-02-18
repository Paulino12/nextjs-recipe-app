import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AnimatePresence } from 'framer-motion'
import { getCsrfToken } from "next-auth/react"
import Input from './forms/Input'
import Label from './forms/Label'
import ButtonField from './forms/ButtonField'
import Textarea from './forms/Textarea'
import CancelIcon from '@mui/icons-material/Cancel'
import Preloader from './Preloader'

function Contact({ csrfToken }) {

    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [contactMessage, setContactMessage] = useState("")
    const [contactBtn, setContactBtn] = useState("Contact Us")
    // characters
    const [characters, setCharacters] = useState(250)

    const [isLoadingContact, setIsLoadingContact] = useState(false)

    
    const [msgSentNote, setMsgSentNote] = useState('')
    
    useEffect(() => {
        const sendMessage = setTimeout(() => {
            setMsgSentNote(false)
        }, 3000)

        return () => {
            clearTimeout(sendMessage)
        }
        
        // Line below removes useeffect warning about adding dependency
        // eslint-disable-next-line
    }, [msgSentNote])

    useEffect(() => {
        setCharacters(contactMessage.length)
        // Line below removes useeffect warning about adding dependency
        // eslint-disable-next-line
    }, [contactMessage]) 

    const handleContactUs = (e) => {
        e.preventDefault()
        setIsLoadingContact(true)
        axios.post(`/api/contactus/contact`, {
            fullname, email, subject, contactMessage
        })
        .then((response) => {
            setMsgSentNote(response.data)
            // reset form
            setFullname('')
            setEmail('')
            setSubject('')
            setContactMessage('')
            setIsLoadingContact(false)
        })
        .catch((error) => { console.log(error) })
    }

    return (
        <section id='contact' className='min-h-screen py-20 px-3 md:px-0 bg-stone-100 relative'>
            <div className="flex flex-col items-center justify-center text-center mb-12">
                <div className="w-full lg:w-6/12 px-4 relative">
                    <h2 className="text-4xl pb-3 font-semibold">Contact Us</h2>
                    <div className='absolute bottom-0.5 left-0 border-b w-full bg-gray-400'></div>
                    <div className='absolute bottom-0 left-0 right-0 mx-auto h-1.5 w-14 lg:w-16 bg-yellow-400'></div>
                </div>
                <span className="text-sm italic mt-2">
                    Provide Your query below.
                </span>
            </div>
            <div className='px-4 py-3 w-full md:w-3/4 md:mx-auto bg-white shadow-2xl'>
                <AnimatePresence>
                    {isLoadingContact && <Preloader />}
                </AnimatePresence>
                {
                    msgSentNote &&
                    <div className="flex justify-between bg-green-100 rounded-lg w-full py-3 px-4 text-sm text-green-700 my-3 capitalize relative" role="alert">
                    <p>{msgSentNote}</p>
                    <div onClick={() => setMsgSentNote(false)} className='cursor-pointer flex items-center'>
                        <CancelIcon color='error' />
                    </div>
                    </div>
                }
                <form onSubmit={handleContactUs} className="mt-5 space-y-4 w-full" action="#" method="POST">
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <div className='flex flex-col md:flex-row md:space-x-3 w-full space-y-4 md:space-y-0'>
                        <div className='w-full md:w-1/2'>
                            <Label labelFor="fullname" text="Fullname" />
                            <Input
                            className="w-full text-sm"
                            value={fullname}
                            handleChange={(e) => setFullname(e.target.value)}
                            type="text"
                            required
                            placeholder="Fullname" /> 
                        </div>
                        <div className='w-full md:w-1/2'>
                            <Label labelFor="email" text="Email" />
                            <Input className='w-full text-sm'
                            type="email"
                            value={email}
                            handleChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Email"
                            />
                        </div>
                    </div>
                    <div>
                        <Label labelFor="subject" text="Subject" />
                        <Input
                        className="w-full text-sm"
                        value={subject}
                        handleChange={(e) => setSubject(e.target.value)}
                        type="text"
                        required
                        placeholder="Subject"
                        maxLength={25} /> 
                    </div>
                    <div>
                        <Label labelFor="message" text="Message" />
                        <Textarea className="w-full text-sm"
                        value={contactMessage}
                        handleTextArea={(e) => setContactMessage(e.target.value)}
                        placeholder="Your query" />
                        <small className={`text-gray-600 ${characters >= 250 ? 'text-red-600':''}`}>
                            {
                                characters >= 250 ?
                                "You cannot extend your message" : `${250 - characters} character(s) left`
                            }
                        </small>
                    </div>
                    <div className='flex align-center justify-center pb-5'>
                        <ButtonField className='w-1/2 py-2' 
                        btnText={
                            characters >= 250 ? 'Cannot send message' : contactBtn
                        } 
                        disabled={
                            characters >= 250 ? true : false
                        } /> 
                    </div>
                </form> 
            </div>
        </section>
    )
}

export default Contact

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}