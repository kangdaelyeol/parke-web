export default function ToasterMessage({ message }: { message: string }) {
    return (
        <div className="fixed flex justify-center bottom-[50px]">
            <div className="px-[30px] py-[15px] text-[20px] tracking-wider color-white bg-blue-500 rounded-[15px]">
                {message}
            </div>
        </div>
    )
}
