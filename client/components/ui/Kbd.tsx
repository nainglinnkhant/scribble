import * as React from 'react'

import { cn } from '@/lib/utils'

const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(
          'flex h-5 select-none items-center justify-center rounded border border-x-[1px] border-b-[3px] border-t-[1px] bg-background px-1.5 font-mono text-[10px] font-medium hover:border-b-[1.5px]',
          className
        )}
        {...props}
      >
        {children}
      </kbd>
    )
  }
)

Kbd.displayName = 'Kbd'

export { Kbd }
