"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";

export interface ProductCart{
    name:string;
    description:string;
    price:number;
    currency:string;
    image:any;
    price_id:string;
}

export default function AddToBag({
    name,
    description,
    price,
    currency,
    image,
    price_id,
}:ProductCart){
    
    const {addItem,handleCartClick} = useShoppingCart();

    const product = {
        name: name,
        description:description,
        price:price,
        currency:currency,
        image:urlFor(image).url(),
        price_id:price_id,
    }

    return(
        <Button className="w-full py-[1.875rem] rounded-full bg-black dark:bg-zinc-100 text-white dark:text-gray-900 text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75" onClick={()=>{
            addItem(product),handleCartClick()
        }}>
            Add to Cart
        </Button>
    )
}