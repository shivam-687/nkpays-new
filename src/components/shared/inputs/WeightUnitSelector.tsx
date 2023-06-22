/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FormControl } from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { nanoid } from "nanoid"
import React from 'react'


const WeightUnitList = [
    {
        value: 'KG',
        lable: 'Kilo Gram (KG)'
    },
    {
        value: 'gram',
        lable: 'Gram'
    },
]

const WeightUnitSelector = ({
    onChange,
    value
}: {
    onChange?: (value: any) => void,
    value?: any
}) => {

    return (
        <Select onValueChange={onChange} defaultValue={value}>
            <FormControl>
                <SelectTrigger>
                    <SelectValue placeholder="Product weight unit"  />
                </SelectTrigger>
            </FormControl>
            <SelectContent>
                {
                    WeightUnitList.map(unit => {
                        return <SelectItem key={nanoid()} value={unit.value}>{unit.lable}</SelectItem>
                    })
                }
            </SelectContent>
        </Select>
    )
}

export default WeightUnitSelector