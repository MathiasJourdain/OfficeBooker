import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export function ErrorPopup({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full text-center border-2 border-red-50">
        <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold">Oups, problème !</h2>
        <p className="text-gray-600 font-medium">{message}</p>
        <div className="flex justify-center pt-2">
          <Link href="/"><Button className="w-full bg-red-600 hover:bg-red-700">J'ai compris</Button></Link>
        </div>
      </div>
    </div>
  )
}
