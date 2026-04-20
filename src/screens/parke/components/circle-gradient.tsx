export const CircleGradient = () => {
    return (
        <>
            <div
                className="pointer-events-none absolute -left-24 -top-24 h-[400px] w-[400px] animate-drift-1"
                style={{
                    background:
                        'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 60%)',
                }}
            />
            <div
                className="pointer-events-none absolute -bottom-24 -right-24 h-[400px] w-[400px] animate-drift-2"
                style={{
                    background:
                        'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 60%)',
                }}
            />
        </>
    )
}
