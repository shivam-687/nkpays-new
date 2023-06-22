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


const DimensionUnitList = [
    {
        value: 'meter',
        lable: 'Meter'
    },
    {
        value: 'cm',
        lable: 'Centemeter'
    },
]

const DimensionUnitSelector = ({
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
                    <SelectValue placeholder="Product Dimension unit"  />
                </SelectTrigger>
            </FormControl>
            <SelectContent>
                {
                    DimensionUnitList.map(unit => {
                        return <SelectItem key={nanoid()} value={unit.value}>{unit.lable}</SelectItem>
                    })
                }
            </SelectContent>
        </Select>
    )
}

export default DimensionUnitSelector