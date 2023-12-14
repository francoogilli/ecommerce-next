"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";
import { ProductCart } from "./AddToBag";


export default function CheckoutNow({
    name,
    description,
    price,
    currency,
    image,
    price_id,
}:ProductCart){
    
    const {checkoutSingleItem} = useShoppingCart();

    function buyNow(priceId:string){
        checkoutSingleItem(priceId)
    }
    const product = {
        name: name,
        description:description,
        price:price,
        currency:currency,
        image:urlFor(image).url(),
        price_id:price_id,
    }

    return(
        <Button className="w-full py-[1.875rem] rounded-full border border-black dark:border-zinc-200 dark:hover:bg-zinc-950 text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10" 
            variant={"outline"}
            onClick={()=>{
            buyNow(product.price_id)
            
        }}>
            Checkout Now
        </Button>
    )
}