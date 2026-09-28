import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,color,box-shadow,transform,border-color] duration-300 ease-(--ease-out-expo) outline-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-voice disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-ink text-paper shadow-[0_1px_0_rgb(255_255_255/0.12)_inset,0_10px_30px_-12px_rgb(13_20_36/0.55)] hover:bg-ink-2',
        light: 'bg-paper text-ink hover:bg-white',
        outline: 'border border-ink/15 bg-transparent text-ink hover:border-ink/40 hover:bg-ink/[0.03]',
        outlineLight: 'border border-white/20 bg-transparent text-white hover:border-white/50 hover:bg-white/[0.06]',
        ghost: 'text-ink hover:bg-ink/[0.05]',
        link: 'h-auto rounded-none px-0 text-ink underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-5 text-[0.9375rem]',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-13 px-7 text-base',
        icon: 'size-11',
        iconSm: 'size-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)
