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
        <header className="mb-8 bg-gray-100  dark:bg-zinc-900">
            <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
                <Link href="/">
                    <h1 className="text-2xl md:text-4xl font-extrabold text-zinc-700 dark:text-zinc-200 ">
                        E-<span className=" ">Commerce</span></h1>
                </Link>
                
                <nav className="hidden gap-12 lg:flex 2xl:ml-16">
                    {links.map((link,idx)=>
                        <div key={idx}>
                            {pathname === link.href ?(
                                <Link href={link.href} className="text-lg font-semibold text-primary">
                                    {link.name}
                                </Link>
                            ):(
                                <Link href={link.href} className="text-lg font-semibold text-gray-500 dark:text-gray-300 transition duration-100 hover:text-primary dark:hover:text-gray-400">
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    )}
                </nav>
                <div className="flex divide-x borde-rsm:border-l ">
                 <div className="flex items-center gap-3">   
                                <ThemeToggle/>
                    <Button 
                        variant={"outline"} 
                        onClick={()=>handleCartClick()}
                        className="flex flex-col border-none gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 bg-gray-100 dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-[2rem]"
                    >
                        <ShoppingCart/>
                        
                        <span className="hidden text-xs font-semibold text-gray-500 dark:text-gray-200 sm:block">Cart</span>
                    </Button>
                 </div>
                </div>
            </div>
        </header>
    )
}