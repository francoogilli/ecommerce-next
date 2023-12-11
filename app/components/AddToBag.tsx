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
        <Button className="rounded-xl bg-blue-500 hover:bg-blue-400 font-bold" onClick={()=>{
            addItem(product),handleCartClick()
        }}>
            Add To Cart
        </Button>
    )
}