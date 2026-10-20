export const CircleGradient = () => {
    return (
        <>
            <div
                className="pointer-events-none absolute -left-24 -top-24 h-[400px] w-[400px] animate-drift-1"
                style={{
                    background:
                        'radial-gradient(circle, var(--parke-glow-1) 0%, transparent 60%)',
                }}
            />
            <div
                className="pointer-events-none absolute -bottom-24 -right-24 h-[400px] w-[400px] animate-drift-2"
                style={{
                    background:
                        'radial-gradient(circle, var(--parke-glow-2) 0%, transparent 60%)',
                }}
            />
        </>
    )
}
