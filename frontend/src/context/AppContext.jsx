
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext= createContext()

export const AppContextProvider = ({children})=>{
    
    const navigate = useNavigate()
    const [user,setUser] = useState(null);
    const [chats,setChats] = useState([]);
    const [selectedChat,setSelectedChat] = useState(null);
    const [theme,setTheme] = useState(localStorage.getItem('theme') || 'light');
    
    const fetchUser = async () => {
    try {
        const token = localStorage.getItem("token")
        if (!token) return
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/user/data`,
            {
                headers: {
                    authorization: token
                }
            }
        )
        const data = await response.json()
        if (data.success) {
            setUser(data.user)
        }
    } catch (error) {
    }
}
    const fetchUsersChats = async () => {
    try {

        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/chat/get`,
            {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }
        )
        const data = await response.json()
        if (data.success) {
            setChats(data.chats)
            if (data.chats.length > 0) {
                setSelectedChat(data.chats[0])
            }
        }
    } catch (error) {
    }
}

    useEffect(()=>{if(user){
        fetchUsersChats()
        }
        else{
            setChats([])
            setSelectedChat(null)
        }
    },[user])

    useEffect(()=>{
        if(theme === 'dark'){
            document.documentElement.classList.add('dark')
        }
        else{
            document.documentElement.classList.remove('dark')
        }
    },[theme])

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            fetchUser()
        }
    }, [])

    const value = { 
        navigate, user, setUser, fetchUser, chats, setChats, selectedChat, 
        setSelectedChat, theme, setTheme
     }
    
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> useContext(AppContext)