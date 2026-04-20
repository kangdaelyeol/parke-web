export const Header = () => {
    return (
        <div className="pt-7 px-6 w-full">
            <div className="max-w-150 mx-auto flex items-center *:font-phone">
                <div className="w-10 rounded-[5px] overflow-hidden *:block">
                    <img
                        src="/app-icon.webp"
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="flex items-center ml-1.5 *:font-medium *:text-[20px]">
                    <span className="text-white tracking-[0.15em]">PARK</span>
                    <span className="text-blue-primary tracking-[0.15em]">
                        É
                    </span>
                </div>
            </div>
        </div>
    )
}
