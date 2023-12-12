"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect,useState } from "react";


export default function ThemeToggle(){
    const [darkMode, setDarkMode] = useState(false)

    useEffect(()=>{
        const theme = localStorage.getItem("theme")
        if(theme==="dark") setDarkMode(true)
    },[])

    useEffect(()=>{
        if(darkMode){
            document.documentElement.classList.add('dark')
            localStorage.setItem("theme","dark")
        }else{
            document.documentElement.classList.remove('dark')
            localStorage.setItem("theme","light")
        }
    },[darkMode])
    return (
        <div
      className="relative w-8 h-8 flex items-center dark:bg-zinc-700 bg-gray-200 cursor-pointer rounded-full p-1.5"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? (
        <Moon className="text-white" />
      ) : (
        <Sun className="ml-auto text-yellow-50" />
      )}
    </div>
    )
    
}
