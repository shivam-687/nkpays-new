/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SelectProps } from '@radix-ui/react-select'
import { api } from '@/utils/api'
import { FormControl } from '../ui/form'
import { nanoid } from 'nanoid'
import { Loader2 } from 'lucide-react'

type SchemeSelectorProps = {
    planId: number,

} & SelectProps

const SchemeSelector = ({
    planId,
    ...props
}: SchemeSelectorProps) => {
    const {data, isLoading} = api.schemes.getAllByPlanId.useQuery({planId});
    return (
        <Select {...props}>
            <FormControl>
                <SelectTrigger>
                    <SelectValue placeholder="Select any scheme" />
                </SelectTrigger>
            </FormControl>
            <SelectContent>
                {
                    isLoading ? 
                    <div className='flex items-center p-2 justify-center'><Loader2 className="mr-2 h-4 w-4 animate-spin" /></div>
                    : <>
                    {
                        data?.map(scheme => {
                            return <SelectItem key={nanoid()} value={`${scheme.id}`}>{scheme.name}</SelectItem>
                        })
                    }
                    </>
                    
                }
            </SelectContent>
        </Select>
    )
}

export default SchemeSelector