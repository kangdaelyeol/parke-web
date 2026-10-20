import { useParkeContext } from '@/contexts'

export const useActionState = () => {
    const ctx = useParkeContext()
    const disabled = ctx.loading || !!ctx.error || !ctx.phone

    return {
        ...ctx,
        disabled,
        telHref: disabled ? undefined : `tel:${ctx.phone}`,
        disabledStyle: disabled && 'opacity-40 pointer-events-none',
    }
}
