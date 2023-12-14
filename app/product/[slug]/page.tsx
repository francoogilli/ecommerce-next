import AddToBag from "@/app/components/AddToBag";
import CheckoutNow from "@/app/components/CheckoutNow";
import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
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
        <div className="mx-auto max-w-screen-xl px-4 pt-4 pb-14 md:px-8">          
           <ToastContainer/>
                <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                    {/* left column start */}
                    <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                        <ImageGallery images={data.images}/>
                    </div>
                    {/* left column end */}

                    {/* right column start */}
                    <div className="flex-[1] py-3">
                        {/* PRODUCT TITLE */}
                        <div className="text-[34px] font-semibold mb-2 leading-tight">
                            {data.name}
                        </div>

                        {/* PRODUCT SUBTITLE */}
                        <div className="text-lg font-semibold mb-5">
                            {data.categoryName}
                        </div>

                        {/* PRODUCT PRICE */}
                        <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">
                                USD ${data.price}
                            </p>
                            
                                <>
                                    <p className="text-base pb-1 text-red-500 font-semibold line-through">
                                       ${data.price + Math.round(data.price * 0.3)}
                                    </p>
                                    <p className="ml-auto text-base font-bold text-green-500">
                                        
                                        30% OFF
                                    </p>
                                </>
                            
                        </div>

                        <div className="text-md font-medium text-zinc-500 dark:text-zinc-300">
                            incl. of taxes
                        </div>
                        <div className="text-md font-medium text-zinc-500 dark:text-zinc-300 ">
                            {`(Also includes all applicable duties)`}
                        </div>

                      
                        <div className="mb-10">
                            
                            <div className="flex justify-between mb-2">
                                
                            </div>
                            

                            
                            <div
                                id="sizesGrid"
                                className="grid grid-cols-3 gap-2"
                            >
                            </div>
                        </div>
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
                        <div>
                            <div className="text-lg font-bold mb-5">
                                Product Details
                            </div>
                            <div className="markdown text-zinc-900 dark:text-zinc-300 text-md mb-5">
                                {data.description}
                            </div>
                        </div>
                    </div>
                    {/* right column end */}
                </div>

                
            
        </div>
    )
}