import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        success:
          "border-transparent bg-green-500 text-white hover:bg-green-500/80",
        warning:
          "border-transparent bg-yellow-500 text-white hover:bg-yellow-500/80",
        outline: "text-foreground",

        outlinePrimary: "border-[#17a2b8] bg-transparent text-[#17a2b8] hover:text-[#17a2b8]/80",
        outlineSuccess: "border-[#28a745] bg-transparent text-[#28a745] hover:text-[#28a745]/80",
        outlineWarning: "border-[#ffc107] bg-transparent text-[#ffc107] hover:text-[#ffc107]/80",
        outlineDanger: "border-[#dc3545] bg-transparent text-[#dc3545] hover:text-[#dc3545]/80",
        outlineBlack: "border-[#343a40] bg-transparent text-[#343a40] hover:text-[#343a40]/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
