import AddToBag from "@/app/components/AddToBag";
import CheckoutNow from "@/app/components/CheckoutNow";
import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";

async function getData(slug:string){
    const query =`*[_type=="product" && slug.current == "${slug}"][0]{
        _id,
          images,
          price,
          name,
          description,
          "slug":slug.current,
          "categoryName":category->name,
          price_id,
      }`; 

      const data = await client.fetch(query)

      return data;
}

export const dynamic = 'force-dynamic'

export default async function ProductPage({
params
}:{params:{slug:string}}){

    const data:fullProduct = await getData(params.slug)
    

    return(
        <div className="bg-white dark:bg-zinc-900 ">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="grid gap-8 md:grid-cols-2">
                    <ImageGallery images={data.images}/>
                    <div className="md:py-8">
                        <div className="mb-2 md:mb-3">
                            <span className="mb-0.5 inline-block text-gray-500 dark:text-gray-300">{data.categoryName}</span>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 lg:text-3xl">{data.name}</h2>
                        </div>
                        <div className="mb-6 flex items-center gap-3 md:mb-10">
                            <Button className=" bg-blue-500 dark:bg-blue-600 hover:bg-blue-400 dark:text-white rounded-full gap-x-3">
                                <span className="text-sm">4.2</span>
                                <Star className="h-5 w-5"/>
                            </Button>
                            <span className="text-sm text-gray-500 dark:text-gray-300 transition duration-100">
                                56 Ratings
                            </span>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-end gap-2">
                                <span className="text-xl font-bold text-gray-800 dark:text-gray-200 md:text-2xl">${data.price}</span>
                                <span className="mb-1 text-red-500 font-bold line-through">${data.price + Math.round(data.price * 0.3)}</span>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-300">Incl. Vat plus shipping</span>
                        </div>
                        <div className="mb-6 flex items-center gap-2 text-gray-500 dark:text-gray-300">
                            <Truck className="w-6 h-6"/>
                            <span className="text-sm">2-4 Day Shipping</span>
                        </div>
                        <div className="flex gap-2.5">
                            <AddToBag
                                name={data.name}
                                description={data.description}
                                price={data.price}
                                currency="USD"
                                image={data.images[0]}
                                key={data._id}
                                price_id={data.price_id}
                            />
                            <CheckoutNow
                                name={data.name}
                                description={data.description}
                                price={data.price}
                                currency="USD"
                                image={data.images[0]}
                                key={data._id}
                                price_id={data.price_id}
                            />
                            
                            {/* <Button className="rounded-xl" variant={"secondary"}>Checkout now</Button>*/ }
                        </div>
                        <p className="mt-12 text-base text-gray-500 dark:text-gray-300 tracking-wide">{data.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}