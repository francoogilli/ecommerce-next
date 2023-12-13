"use client";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart"

export default function ShoppingCartModal(){

    const {cartCount,
        shouldDisplayCart,
        handleCartClick,
        cartDetails,
        removeItem,
        totalPrice,
        redirectToCheckout,
        incrementItem,
        decrementItem,
    } = useShoppingCart();





    async function handleCheckoutClick(event:any){
        event.preventDefault()
        try{
            const result = await redirectToCheckout()
            if(result?.error){
                console.log('result')
            }
        }catch(error){
            console.log(error)
        }
    }
    return(
        <Sheet open={shouldDisplayCart} onOpenChange={()=>handleCartClick()}>
        <SheetContent className="sm:max-w-lg w-[90vw] ">
          <SheetHeader>
            <SheetTitle className="font-bold flex justify-center pb-1">Shopping Cart</SheetTitle>
          </SheetHeader>

        <div className="h-full flex flex-col justify-between ">
            <div className="mt-8 flex-1 overflow-y-auto">
                <ul className="-my-6 divide-y divide-gray-300">
                    {cartCount === 0 ?(
                        <h1 className="py-6">You dont have any items</h1>
                    ):(
                        <>
                        {Object.values(cartDetails ?? {}).map((entry)=>(
                            
                            <li key={entry.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                                    <Image 
                                        src={entry.image as string} 
                                        alt="Product image" 
                                        width={100} 
                                        height={100}
                                    />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
                                            <h3 className="font-semibold">{entry.name}</h3>
                                            <p className="ml-4 font-semibold">${entry.price}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400 line-clamp-2">
                                            {entry.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-600 font-medium dark:text-gray-300">x{entry.quantity}</p>
                                        <div className="flex gap-3 items-center">
                                        <button
                                            type="button"
                                            className="font-semibold text-2xl  text-gray-600 dark:text-primary/80"
                                            onClick={() => decrementItem(entry.id)}
                                        >
                                            -
                                        </button>

                                        <button
                                            type="button"
                                            className="font-semibold text-2xl  text-gray-600 dark:text-gray-300"
                                            onClick={() => incrementItem(entry.id)}
                                        >
                                            +
                                        </button>
                                        <button 
                                                type="button" 
                                                className="font-semibold pl-2 text-blue-600 dark:text-blue-600 hover:text-primary/80 flex items-center"
                                                onClick={()=> removeItem(entry.id)}
                                            >
                                                 <Trash2 className="text-red-600" size={20} strokeWidth={2.5}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                        </>
                    )}
                </ul>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
                    <p className="font-semibold">Subtotal:</p>
                    <p className="font-bold">${totalPrice}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                    Shipping and taxes are calculated at checkout
                </p>
                <div className="mt-6">
                    <Button onClick={handleCheckoutClick} className="w-full font-bold rounded-2xl bg-blue-500 dark:bg-blue-600 dark:text-white hover:bg-blue-400 hover:scale-105 transition ease-in-out duration-500">
                        Checkout
                    </Button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p className="font-semibold">
                        OR{" "}<button onClick={()=>handleCartClick()} className="font-semibold text-primary pl-1 hover:text-primary/80 ">Continue Shopping</button>
                    </p>
                </div>
            </div>
        </div>
        </SheetContent>
      </Sheet>
    )
}