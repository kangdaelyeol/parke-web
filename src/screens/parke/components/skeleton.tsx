import { cn } from '@/utils'

export const Skeleton = ({
    width,
    height,
}: {
    width?: number | string
    height?: number | string
}) => {
    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-[10px] w-[300px] h-[55px]',
                'after:content-[""] after:absolute after:inset-0 after:translate-x-full after:animate-skeleton',
                'after:bg-[linear-gradient(270deg,rgba(255,255,255,0),rgba(255,255,255,0.07),rgba(255,255,255,0))]',
            )}
            style={{
                width,
                height,
            }}
        />
    )
}
