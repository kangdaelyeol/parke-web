export const ToasterMessage = ({ message }: { message: string }) => {
    return (
        <div className="fixed flex justify-center bottom-[110px] left-0 w-screen z-10 animate-toaster">
            <div className="px-[30px] py-[12px] text-[20px] tracking-wider text-on-accent font-medium bg-accent rounded-[15px]">
                {message}
            </div>
        </div>
    )
}
