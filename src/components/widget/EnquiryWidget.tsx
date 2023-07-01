import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,

  DialogHeader,
  DialogTitle,
 
} from "@/components/ui/dialog"
import ContactForm from "../shared/ContactForm"
import { useEffect, useState } from "react"
import { Separator } from "../ui/separator";
import WhatsappButton from "./WhatsappButton";

export function EnquiryWidget() {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    const toggle = () =>{
        // console.log("toggle")
        setOpen(prev => !prev)
    }

    useEffect(() => {
      console.log(open)
    }, [open])
    
    
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      {/* <DialogTrigger asChild > */}
        <Button onClick={() => toggle()} className="-rotate-90 fixed top-1/3 -right-7 z-40" variant="glow">Enquiry Now</Button>
      {/* </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enquiry Now</DialogTitle>
          <DialogDescription>
            {`Got a question? Let's Chat! Reach out to us using our enquiry form and let's turn your queries into solutions.`}
          </DialogDescription>
        </DialogHeader>
        <ContactForm onSubmit={() => handleClose()}/>
        <Separator className=""></Separator>
        <WhatsappButton/>
      </DialogContent>
    </Dialog>
  )
}
