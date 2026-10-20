import { useParkeContext } from '@/contexts'

export const useActionState = () => {
    const ctx = useParkeContext()
    const disabled = ctx.loading || !!ctx.error || !ctx.phone

    return {
        ...ctx,
        disabled,
        // 미리보기에서는 모양은 그대로 두고 복사·전화만 막는다
        copyBlocked: disabled || ctx.preview,
        telHref: disabled || ctx.preview ? undefined : `tel:${ctx.phone}`,
        disabledStyle: disabled && 'opacity-40 pointer-events-none',
    }
}
