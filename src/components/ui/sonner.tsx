import { Toaster as Sonner, type ToasterProps } from 'sonner'

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast:
            '!rounded-2xl !border !border-ink/10 !bg-paper !text-ink !font-sans !shadow-[0_20px_60px_-20px_rgb(13_20_36/0.4)]',
          description: '!text-ink-soft',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
