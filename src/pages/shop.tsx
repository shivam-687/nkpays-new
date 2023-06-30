import ContactSection from '@/components/landing-page/ContactSection';
import ProductGrid from '@/components/product/ProductGrid';
import DownloadAppSection from '@/components/shared/DownloadAppSection';
import { env } from '@/env.mjs';
import { api } from '@/utils/api'
import { NextSeo } from 'next-seo';
import React from 'react'

const ShopPage = () => {
  const { data, isLoading } = api.product.getAll.useQuery({});

  const title = '';
  const desc = '';
  return (
    <>
     <NextSeo
        title={title}
        description={desc}
        openGraph={{
          title: title,
          description: desc,
          url: env.NEXT_PUBLIC_SITE_URL,
          images: []
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <div className='py-20 bg-primary/30'>
        <h1 className='text-center text-6xl font-bold'>Shop</h1>
      </div>

      <div className="container px-4 pt-10 pb-20">
        <ProductGrid loading={isLoading} products={data?.data || []} />
      </div>


      <DownloadAppSection/>
      <ContactSection/>
    </>
  )
}

export default ShopPage