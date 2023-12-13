"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";
import ThemeToggle from "./ThemeToggle";

const links=[
    {name:'Home', href:'/'},
    {name:'Men', href:'/Men'},
    {name:'Women', href:'/Women'},
    {name:'Teens', href:'/Teens'}
];



export default function Navbar(){
    const pathname= usePathname()
    const {handleCartClick} = useShoppingCart()
    return(
        <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-gray-100 dark:bg-zinc-800 p-4 mb-7">
        <div className="flex items-center justify-center md:w-1/5 font-extrabold">      
            E-Commerce  
        </div>
      <div className="hidden flex-1 items-center justify-center space-x-8 md:flex font-medium">
      {links.map((link,idx)=>
                        <a key={idx}>
                            {pathname === link.href ?(
                                <Link href={link.href} >
                                    {link.name}
                                </Link>
                            ):(
                                <Link href={link.href} >
                                    {link.name}
                                </Link>
                            )}
                        </a>
                    )}
      </div>
      <div className="flex items-center justify-center gap-x-4 md:w-1/5">
        
        
          <div className="relative cursor-pointer flex justify-center items-center gap-7">
            <ThemeToggle/>
            <ShoppingCart onClick={()=>handleCartClick()}/>
          </div>
        

        
      </div>
    </header>
    )
}