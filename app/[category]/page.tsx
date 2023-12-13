import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Image from "next/image";

async function getData(category:string) {
    const query = `*[_type=="product" && category->name =="${category}"]{
        _id,
          "imageUrl":images[0].asset->url,
          price,
          name,
          "slug":slug.current,
          "categoryName":category->name,
          "classificationName":classification->name
      }`;

      const data = await client.fetch(query);

      return data;
}

export const dynamic = 'force-dynamic'

export default async function CategoryPage({
    params
}:{
    params:{category:string}
}){
    const data:simplifiedProduct[]= await getData(params.category);

    return(
        <div className="bg-gray-200 dark:bg-zinc-900">
            <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200 pb-5">Our products for {params.category}</h2>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {data.map((product)=>(
                        <div key={product._id} className="group relative hover:scale-105 transition ease-in-out">
                            <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gray-200 group-hover:opacity-75 lg:h-80">
                            <Link href={`/product/${product.slug}`}>
                              
                                <Image 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                                    width={300}
                                    height={300}
                                    priority={true}
                                    ></Image>
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
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-200">${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}