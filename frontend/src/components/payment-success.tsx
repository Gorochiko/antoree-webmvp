import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { CheckCircle } from "lucide-react"
import { confirmBookingPayment } from "@/lib/action"

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState("checking...")

useEffect(() => {
  const checkPayment = async () => {
    const bookingId = searchParams.get("bookingId")
    const resultCode = searchParams.get("resultCode")

    if (resultCode === "0" && bookingId) {
      try {
        await confirmBookingPayment(bookingId)
        setStatus("success")
      } catch (error) {
        console.error("Confirm payment error:", error)
        setStatus("failed")
      }
    } else {
      setStatus("failed")
    }
  }

  checkPayment()
}, [searchParams])

  if (status === "success") {
    return (
      <div className="container text-center py-20">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-green-600">Thanh toán thành công!</h1>
        <p className="mt-2">Cảm ơn bạn đã đặt khóa học. Thông tin chi tiết đã được gửi qua email.</p>
      </div>
    )
  }

  if (status === "failed") {
    return <p className="text-center text-red-500 py-20">Thanh toán thất bại hoặc bị hủy!</p>
  }

  return <p className="text-center py-20">Đang xác thực giao dịch...</p>
}
