/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PlanData } from "@/schema/PlanSchema"
import { nanoid } from "nanoid"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import Link from "next/link"

const PlanCard = ({
    data,
}: {
    data: PlanData,
    bestOffer?: boolean
}) => {
    return (
        <div className='w-full max-w-md shadow-xl shadow-[#0484ec1a] rounded-2xl overflow-hidden group relative hover:-translate-y-5 hover:shadow-2xl hover:shadow-[#0484ec59] transition-all duration-300'>
            <div className='bg-gradient-to-tr to-[#0482EC] from-[#045CCC] min-h-[130px] flex items-center rounded-2xl justify-center shadow-xl shadow-[#0484ec42]'>
                <h2 className='text-xl font-bold text-white text-center max-w-[200px]'>{data.title}</h2>
            </div>

            {/* {
                data.bestOffer && <span className='absolute inline-block p-3 text-white bg-yellow-400 font-medium top-0 left-0 rounded-br-xl'>Best Offer</span>
            } */}

            <div className='px-5 pt-10 pb-5'>
                <div className='space-y-5'>
                    {
                        data.schemes.map(dt => {
                            return (
                                <div className='flex gap-5' key={nanoid()}>
                                    <div className='flex-grow'>
                                        <h3 className='uppercase font-medium text-gray-600'>{dt.name}</h3>
                                        <Separator />
                                        <p className='text-sm text-muted-foreground'>{dt.desc}</p>
                                    </div>
                                    <div className='font-medium text-gray-600 flex-grow-0'>{dt.price}</div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='flex items-center justify-center'>
                <div className='pt-10 space-y-3 max-w-xs w-full'>
                    <Link href={`/plans/${data.id}`}><Button className='w-full hover:bg-primary hover:text-primary-foreground' variant={'outline'}>Get Started</Button></Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default PlanCard;