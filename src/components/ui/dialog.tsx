import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-night/55 backdrop-blur-md data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in',
        className,
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  closeLabel = 'Закрыть',
  closeClassName,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & { closeLabel?: string; closeClassName?: string }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <div className="pointer-events-none fixed inset-0 z-50 grid place-items-center p-2.5 sm:p-6">
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            'pointer-events-auto relative w-full outline-none data-[state=closed]:animate-dialog-out data-[state=open]:animate-dialog-in',
            className,
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close
            className={cn(
              'absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full border border-ink/10 bg-paper/80 text-ink backdrop-blur transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-voice sm:top-4 sm:right-4 sm:size-11',
              closeClassName,
            )}
          >
            <XIcon className="size-5" strokeWidth={1.6} />
            <span className="sr-only">{closeLabel}</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </div>
    </DialogPortal>
  )
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn(className)} {...props} />
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description data-slot="dialog-description" className={cn(className)} {...props} />
}

export { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogClose, DialogTitle, DialogDescription }
