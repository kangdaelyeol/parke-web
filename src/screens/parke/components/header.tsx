import AppLogo from '@/images/app-logo.png'

export const Header = () => {
    return (
        <div className="h-20 w-full">
            <div className="w-full mx-auto max-w-[440px] px-2">
                <img
                    src={AppLogo}
                    className="w-13 mt-3"
                    style={{ filter: 'var(--parke-logo-filter)' }}
                />
            </div>
        </div>
    )
}
