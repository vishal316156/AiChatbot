import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'

const ChatBox = () => {

  const containeRef = useRef(null)
  const {selectedChat,setSelectedChat,chats,setChats,theme} = useAppContext()

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState('text')
  const [isPublished, setIsPublished] = useState(false)

  const onSubmit = async (e)=> {
    e.preventDefault()
    if(!prompt.trim() || !selectedChat) return
    try {
      setLoading(true)
      const userMessage = {
        role: "user",
        content: prompt,
        isImage: false,
        timestamp: Date.now()
      }

      const updatedMessages = [...messages,userMessage]
      setMessages(updatedMessages)
      setPrompt('')

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token")
          },
          body: JSON.stringify({
            chatId: selectedChat._id,
            prompt,
            mode,
            isPublished
          })
        }
      )

      const data = await response.json()

      if(data.success && data.message){
  const assistantMessage = {
    role: "assistant",
    content: data.message.content || "No response generated",
    isImage: false,
    timestamp: Date.now()
  }
  const finalMessages = [...updatedMessages, assistantMessage]
  setMessages(finalMessages)
  const updatedChat = {
    ...selectedChat,
    messages: finalMessages
  }
  setSelectedChat(updatedChat)
  setChats(
    chats.map((chat)=>
      chat._id === updatedChat._id ? updatedChat : chat
    )
  )
}
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    if(selectedChat){
      setMessages(selectedChat.messages)
    }
  },[selectedChat])

  useEffect(()=>{
    if(containeRef.current){
      containeRef.current.scrollTo({
        top: containeRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  },[messages])

  return (
    <div className='flex-1 flex flex-col justify-between m-4 md:m-6 xl:mx-12 max-md:mt-14 w-full max-w-6xl mx-auto'>

      <div ref={containeRef} className='flex-1 mb-5 overflow-y-scroll'>

        {messages.length === 0 && (
          <div className='flex flex-col items-center justify-center text-center gap-5 min-h-[70vh]'>
            <img src={theme === 'dark' ? assets.logo_full: assets.logo_full_dark} className='w-full max-w-56 sm:max-w-68'/>
            <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white'>
              Ask me anything
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {loading && (
          <div className='loader flex items-center gap-1.5'>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
          </div>
        )}

      </div>

      {mode === 'image' && (
        <label className='flex items-center gap-2 mb-3 text-sm w-fit mx-auto cursor-pointer'>
          <p className='text-xs'>Publish generated image to community</p>
          <input
            type="checkbox"
            className='cursor-pointer'
            checked={isPublished}
            onChange={(e)=>setIsPublished(e.target.checked)}
          />
        </label>
      )}

      <form onSubmit={onSubmit} className='bg-primary/20 dark:bg-[#583c79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'>

        <select onChange={(e)=>setMode(e.target.value)} value={mode} className='text-sm pl-3 pr-2 outline-none'>
          <option className='dark:bg-purple-900' value="text">Text</option>
          <option className='dark:bg-purple-900' value="image">Image</option>
        </select>

        <input
          onChange={(e)=>setPrompt(e.target.value)}
          value={prompt}
          type="text"
          placeholder="Type Your prompt here..."
          className='flex-1 w-full text-sm outline-none'
          required
        />

        <button type='submit' disabled={loading}>
          <img src={loading ? assets.stop_icon : assets.send_icon} className='w-8 cursor-pointer' alt="" />
        </button>

      </form>

    </div>
  )
}

export default ChatBox