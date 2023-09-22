/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { convertNullToUndefined } from '@/lib/utils'
import { type LeadData, type LeadStatusEnumSchema, type UpdateLeadInput } from '@/schema/LeadSchema'
import { api } from '@/utils/api'
import React from 'react'
import { toast } from 'react-toastify'
import { type z } from 'zod'
import { Select, SelectItem, SelectTrigger,SelectContent, SelectValue } from '../ui/select'
import { LeadStatus } from '@prisma/client'

const LeadStatusChanger = ({
    lead
}: {
    lead: LeadData
}) => {
    const updateMutation = api.leads.update.useMutation();
    const ctx = api.useContext().leads;

    const update = async (value: z.infer<typeof LeadStatusEnumSchema>) => {
        const result: UpdateLeadInput = {...convertNullToUndefined(lead), status: value}
        try {
            const res = await updateMutation.mutateAsync(result);
            await ctx.getAll.invalidate();
            await ctx.getById.invalidate({id: lead.id})
            toast.success(`Lead status changed to ${value}`)
        } catch (error) {
            toast.error('There is problem in update Lead status')
        }
    }
  return (
    <Select onValueChange={value => void update(value as z.infer<typeof LeadStatusEnumSchema>)} value={lead.status}>
        <SelectTrigger>
            <SelectValue placeholder="Change Lead status"></SelectValue>
        </SelectTrigger>
        <SelectContent>
            <SelectItem value={LeadStatus.OPEN}>Open</SelectItem>
            <SelectItem value={LeadStatus.CLOSED}>Closed</SelectItem>
            <SelectItem value={LeadStatus.DECLINED}>Declined</SelectItem>
        </SelectContent>
    </Select>
  )
}

export default LeadStatusChanger