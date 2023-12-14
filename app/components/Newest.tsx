import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import { ChevronRight } from "lucide-react";
import Image from "next/image";


async function getData(){
    const query=`*[_type=="product"][0...4] | order(_createdAt asc){
        _id,
          price,
          name,
          "slug":slug.current,
          "categoryName":category->name,
          "imageUrl":images[0].asset->url
      }`;
      const data= await client.fetch(query);

      return data;
}

export default async function Newest(){
    const data:simplifiedProduct[] = await getData();

    return (
        <div className="bg-white dark:bg-zinc-950">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200">Our Newest products</h2>

                    <Link className="text-blue-500 font-bold flex items-center bg-gray-50 dark:bg-zinc-900 px-3 py-1 rounded-2xl hover:scale-105 transition ease-in-out duration-300" href="/all">
                        See All{" "}
                        <span>
                            <ChevronRight/>
                        </span>
                    </Link>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                    {data.map((product)=>(
                        <div key={product._id} className="group relative hover:scale-105 transition ease-in-out">
                            <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gray-200 group-hover:opacity-75 lg:h-80">
                            <Link href={`/product/${product.slug}`}>   
                                <Image 
                                    src={product.imageUrl} 
                                    alt="Product image" 
                                    className="w-full h-full object-cover object-center cursor-pointer lg:h-full lg:w-full"
                                    width={300}
                                    height={300}
                                />
                                </Link>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-[.9375rem] font-bold text-gray-700 dark:text-gray-200">
                                        <Link href={`/product/${product.slug}`}>
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{product.categoryName}</p>
                                </div>
                                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}