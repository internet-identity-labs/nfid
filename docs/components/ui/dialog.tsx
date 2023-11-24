'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

// @ts-ignore
const DialogPortal = ({ className, children, ...props }: DialogPrimitive.DialogPortalProps) => (
  // @ts-ignore
  <DialogPrimitive.Portal className={cn(className)} {...props}>
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
)
DialogPortal.displayName = DialogPrimitive.Portal.displayName

const DialogOverlay = React.forwardRef<
  // @ts-ignore
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  // @ts-ignore
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
  // @ts-ignore
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      'data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-100',
      className
    )}
    {...props}
    ref={ref}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  // @ts-ignore
  React.ElementRef<typeof DialogPrimitive.Content>,
  // @ts-ignore
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
  // @ts-ignore
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    {/* @ts-ignore */}
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0 fixed z-50 grid w-full gap-4 rounded-b-lg bg-white p-6 sm:max-w-lg sm:rounded-lg',
        'dark:bg-slate-900',
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  // @ts-ignore
  <div
    className={cn('flex flex-col space-y-2 text-center sm:text-left text-slate-900', className)}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  // @ts-ignore
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  // @ts-ignore
  React.ElementRef<typeof DialogPrimitive.Title>,
  // @ts-ignore
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
  // @ts-ignore
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-slate-900', 'dark:text-slate-50', className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  // @ts-ignore
  React.ElementRef<typeof DialogPrimitive.Description>,
  // @ts-ignore
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
  // @ts-ignore
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-slate-400', 'dark:text-slate-400', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
