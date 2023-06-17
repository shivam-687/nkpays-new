import {
  Code2,
  CreditCard,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PropsWithChildren } from "react";

export function LoginDropdown({children}: PropsWithChildren) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {
          children || <Button size="lg" variant={'glow'}>Login</Button>
        }
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-50">
        <DropdownMenuLabel>Login As</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Distributor</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Retailer</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Code2 className="mr-2 h-4 w-4" />
            <span>API & Whitelable Partner</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LoginDropdown;
