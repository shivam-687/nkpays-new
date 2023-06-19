import { type ProductListItem } from '@/schema/product.schema'
import { type Product } from '@prisma/client'
import React from 'react'
import ProductCard, { ProductSkeleton } from './ProductCard'
import { nanoid } from 'nanoid'

const ProductGrid = ({
    products,
    loading
}: {
    products: Product[]|ProductListItem[],
    loading?: boolean
}) => {


    if(loading){
        return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-5'>
                {
                    Array(5).fill(null).map(d => {
                        return <ProductSkeleton key={nanoid()}/>
                    })
                }
            </div>
        )
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-5'>
        {
            products.map(product => {
                return <ProductCard key={nanoid()} product={product}/>
            })
        }
    </div>
  )
}

export default ProductGrid