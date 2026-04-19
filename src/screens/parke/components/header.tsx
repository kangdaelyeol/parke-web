export const Header = () => {
    return (
        <div className="pt-3 px-3 w-full">
            <div className="max-w-200 mx-auto flex items-center *:font-phone">
                <div className="w-10 rounded-[5px] overflow-hidden *:block">
                    <img
                        src="/app-icon.webp"
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="flex items-center ml-1 *:font-medium *:text-[20px]">
                    <span className="tracking-[0.2em]">PARK</span>
                    <span className="text-blue-primary tracking-[0.2em]">
                        É
                    </span>
                </div>
            </div>
        </div>
    )
}
