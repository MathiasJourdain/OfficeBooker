import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition group">
      <div className="bg-blue-600 text-white p-1.5 rounded-lg group-hover:bg-blue-700 transition">
        <span className="text-xl">🏢</span>
      </div>
      <span className="font-bold text-gray-900 text-lg">OfficeBooker</span>
    </Link>
  )
}
