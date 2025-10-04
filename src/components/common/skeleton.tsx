export default function Skeleton({
    width,
    height,
}: {
    width?: number | string
    height?: number | string
}) {
    return (
        <div
            className="skeleton skeleton-dark"
            style={{
                width,
                height,
            }}
        ></div>
    )
}
