import { cn } from '@/utils'

export const GradientBox = () => {
    return (
        <div
            className={cn(
                'relative mr-auto p-0.5',
                'after:absolute after:top-[-100%] after:left-[-100%] after:w-[300%] after:h-[300%] overflow-hidden',
                'after:bg-[conic-gradient(transparent,transparent,transparent,transparent,transparent,transparent,transparent,transparent,#ffffff95,#fff)] after:bg-no-repeat after:animate-border',
            )}
        >
            <div className="relative z-10 py-3 px-4 bg-black">
                010-2413-0510
            </div>
        </div>
    )
}
