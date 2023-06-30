import { Page } from '@prisma/client'
import React from 'react'
import PageHeader from '../shared/page/PageHeader'
import { formateDate } from '@/lib/utils'

export type PageViwerProps = {
    page: Page
}

const PageViwer = ({
    page
}: PageViwerProps) => {
  return (
    <>
    <PageHeader headerTitle={page.name}/>

    <article className='max-w-2xl mx-auto prose-xl prose'>
        <div>
            <span className='text-sm text-muted-foreground italic'> Last updated on {formateDate(page.updatedAt)}</span>
        </div>

        <div>
            <div dangerouslySetInnerHTML={{__html: page.content||''}}></div>
        </div>
    </article>
    </>
  )
}

export default PageViwer