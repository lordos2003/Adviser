import * as React from 'react'

import { cn } from '@/lib/utils'

const fieldBase =
  'w-full min-w-0 rounded-2xl border border-white/12 bg-white/[0.04] px-4 text-[0.9375rem] text-white transition-[border-color,background-color,box-shadow] duration-200 outline-none placeholder:text-white/35 hover:border-white/25 focus-visible:border-white/50 focus-visible:bg-white/[0.07] focus-visible:shadow-[0_0_0_4px_rgb(37_99_255/0.25)] focus-visible:outline-none aria-invalid:border-[#ff7a6b]/80 aria-invalid:shadow-[0_0_0_4px_rgb(255_122_107/0.15)] disabled:cursor-not-allowed disabled:opacity-50'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return <input type={type} data-slot="input" className={cn(fieldBase, 'h-13', className)} {...props} />
}

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return <textarea data-slot="textarea" className={cn(fieldBase, 'min-h-36 resize-y py-3.5 leading-relaxed', className)} {...props} />
}

export { Input, Textarea }
