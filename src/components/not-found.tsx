// NotFound.tsx
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#333] to-[#111] text-white">
            {/* 아이콘 영역 */}
            <div className="relative">
                <div className="text-[8rem] font-extrabold opacity-20 select-none">
                    404
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-24 h-24 text-indigo-400 animate-bounce drop-shadow-lg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9.75 9.75h.008v.008H9.75V9.75Zm4.5 0h.008v.008h-.008V9.75ZM8.25 15c.5 1.5 2 2.25 3.75 2.25s3.25-.75 3.75-2.25"
                        />
                        <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                    </svg>
                </div>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-wide">
                페이지를 찾을 수 없습니다
            </h1>
            <p className="mt-2 text-gray-400 text-lg">
                요청하신 페이지가 존재하지 않거나 이동되었어요.
            </p>

            <Link
                to="/"
                className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-xl shadow-md"
            >
                홈으로 돌아가기
            </Link>
        </div>
    )
}
