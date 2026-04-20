export const ToasterMessage = ({ message }: { message: string }) => {
    return (
        <div className="fixed flex justify-center bottom-[200px] left-0 w-screen z-10">
            <div className="px-[50px] py-[15px] text-[20px] tracking-wider color-white bg-blue-500 rounded-[15px]">
                {message}
            </div>
        </div>
    )
}
