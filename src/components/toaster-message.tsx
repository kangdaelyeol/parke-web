export const ToasterMessage = ({ message }: { message: string }) => {
    return (
        <div className="fixed flex justify-center bottom-[110px] left-0 w-screen z-10 animate-toaster">
            <div className="px-[50px] py-[15px] text-[20px] tracking-wider text-white font-medium bg-blue-primary rounded-[15px]">
                {message}
            </div>
        </div>
    )
}
