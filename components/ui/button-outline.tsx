import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ButtonOutline({ className, ...props }: React.ComponentPropsWithoutRef<typeof Button>) {
  return (
    <Button
      variant="outline"
      className={cn("border-2 border-[#CE6439] text-[#CE6439] hover:bg-[#CE6439]/10 hover:text-[#CE6439]", className)}
      {...props}
    />
  )
}
