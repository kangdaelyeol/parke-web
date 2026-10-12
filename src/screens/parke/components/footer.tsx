import { useParkeContext } from '@/contexts'
import { Copy, Phone } from '@/illustration'
import { cn } from '@/utils'

export const Footer = () => {
    const { copyPhone, phone, loading, error } = useParkeContext()
    const disabled = loading || !!error || !phone

    return (
        <div className="absolute bottom-5 px-6 w-full">
            <div className="max-w-[440px] mx-auto flex gap-[12px] text-[length:calc(18px*var(--parke-scale))] text-content *:select-none">
                <button
                    type="button"
                    onClick={copyPhone}
                    disabled={disabled}
                    className={cn(
                        buttonStyle,
                        'flex-1 border-[0.5px] border-line active:bg-line',
                        disabled && disabledStyle,
                    )}
                >
                    <Copy size={20} />
                    <span className="font-medium">복사</span>
                </button>
                <a
                    href={disabled ? undefined : `tel:${phone}`}
                    aria-disabled={disabled}
                    className={cn(
                        buttonStyle,
                        'flex-[2] bg-accent text-on-accent font-semibold active:brightness-80',
                        disabled && disabledStyle,
                    )}
                >
                    <Phone size={20} />
                    <span>전화하기</span>
                </a>
            </div>
        </div>
    )
}

const buttonStyle =
    'flex justify-center items-center gap-[10px] px-[20px] py-[14px] rounded-button cursor-pointer transition-opacity'

const disabledStyle = 'opacity-40 pointer-events-none'
