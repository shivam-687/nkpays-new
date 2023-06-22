import { formateCurrency } from '@/lib/utils'
import { type ProductListItem } from '@/schema/product.schema'
import { type Product } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import ProductEnquiryDialog from '../productEnquiry/ProductEnquiryFormDialog'
import { Skeleton } from '../ui/skeleton'

export type ProductCradProps = {
    product: Product | ProductListItem
}

export const ProductSkeleton = () => {
    return (
        <div className="max-w-sm">
                <div className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg overflow-hidden">
                    <Skeleton className='aspect-square bg-gray-200 relative'>
                        
                    </Skeleton>
                    <div className="py-6 px-8 rounded-lg bg-white space-y-3">
                        <div className='space-y-2'>
                        <Skeleton className="w-full h-5" ></Skeleton>
                        <Skeleton className="w-1/2 h-5" ></Skeleton>
                        </div>
                        <Skeleton className='w-20 h-10 rounded' />
                    </div>
                    
                </div>
            </div>
    )
}

const ProductCard = ({
    product
}: ProductCradProps) => {
    return (
        <>
            <div className="max-w-sm">
                <div className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg overflow-hidden">
                    <div className='aspect-square bg-gray-200 relative'>
                        <Image className="object-cover" fill src={product.thumbnail || '/assets/images/product-placeholder.png'} alt="" />
                    </div>
                    <div className="py-6 px-8 rounded-lg bg-white">
                        <h3 className="text-gray-700 font-medium text-xl mb-3 hover:text-gray-900 hover:cursor-pointer line-clamp-2" title={product.title}>{product.title}</h3>

                        <ProductEnquiryDialog
                            product={product}
                            trigger={
                                <button className="mt-6 py-2 px-4 bg-yellow-400 text-gray-800 font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300">Enquiry</button>
                            } />

                    </div>
                    <div className="absolute top-2 right-2 py-2 px-4 bg-white rounded-lg">
                        <span className="text-md">{formateCurrency(Number(product.price) || 0)}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard