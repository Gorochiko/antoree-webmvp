"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, Smartphone, Building2, CheckCircle, Wallet } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { createBooking } from "@/lib/action"

interface BookingData {
  teacherId: string
  teacherName: string
  courseType: string
  totalAmount: number
  bookingInfo: {
    studentName: string
    email: string
    notes?: string
  }
}

export function PaymentMethod() {
  const navigate = useNavigate()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [selectedMethod, setSelectedMethod] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const data = sessionStorage.getItem("bookingData")
    if (data) {
      setBookingData(JSON.parse(data))
    } else {
      navigate("/teachers")
    }
  }, [navigate])

  const handlePayment = async () => {
    if (!selectedMethod || !bookingData) return

    setIsProcessing(true)
    setError(null)

    try {
      if (selectedMethod === "momo") {
        const response = await createBooking({
          email: bookingData.bookingInfo.email,
          teacherId: bookingData.teacherId,
          teacherName: bookingData.teacherName,
          courseType: bookingData.courseType,
          totalAmount: bookingData.totalAmount,
          notes: bookingData.bookingInfo.notes || "",
          status: "pending",
        });

        const momoResponse = (response as any).momoResponse;
        if (momoResponse && momoResponse.payUrl) {
      
          window.location.href = momoResponse.payUrl;
        } else {
          alert("Không nhận được link thanh toán từ Momo!");
        }
      } else {
        setTimeout(() => {
          setIsProcessing(false)
          setPaymentComplete(true)
          sessionStorage.removeItem("bookingData")

          setTimeout(() => {
            navigate("/teachers")
          }, 3000)
        }, 2000)
      }
    } catch (error: any) {
      console.error('Payment error:', error)
      setError(error.message || 'Đã xảy ra lỗi khi thanh toán')
      setIsProcessing(false)
    }
  }

  if (!bookingData) {
    return (
      <div className="container max-w-2xl mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy thông tin đặt khóa học</h1>
        <Link to="/teachers">
          <Button>Quay lại danh sách giáo viên</Button>
        </Link>
      </div>
    )
  }

  if (paymentComplete && selectedMethod !== "momo") {
    return (
      <div className="container max-w-2xl mx-auto py-20 px-4 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4 text-green-600">Thanh toán thành công!</h1>
        <p className="text-muted-foreground mb-6">
          Cảm ơn bạn đã đặt khóa học. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
        </p>
        <p className="text-sm text-muted-foreground">Đang chuyển hướng...</p>
      </div>
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="container max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/teachers">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Thanh toán khóa học</h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin đặt khóa học</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Giáo viên:</span>
                <span className="font-medium">{bookingData.teacherName}</span>
              </div>
              <div className="flex justify-between">
                <span>Loại khóa học:</span>
                <span className="font-medium">{bookingData.courseType}</span>
              </div>
              <div className="flex justify-between">
                <span>Học viên:</span>
                <span className="font-medium">{bookingData.bookingInfo.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span className="font-medium">{bookingData.bookingInfo.email}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Tổng cộng:</span>
                <span className="text-primary">{bookingData.totalAmount.toLocaleString('vi-VN')}đ</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chọn phương thức thanh toán</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                <div className="space-y-4">
                  {/* Momo Wallet */}
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="momo" id="momo" />
                    <Wallet className="h-5 w-5 text-pink-500" />
                    <Label htmlFor="momo" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Ví Momo</div>
                        <div className="text-sm text-muted-foreground">Thanh toán nhanh chóng qua ví Momo</div>
                      </div>
                    </Label>
                  </div>

                  {/* Credit Card */}
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Thẻ tín dụng/Ghi nợ</div>
                        <div className="text-sm text-muted-foreground">Visa, Mastercard, JCB</div>
                      </div>
                    </Label>
                  </div>

                  {/* Mobile Banking */}
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="mobile-banking" id="mobile-banking" />
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="mobile-banking" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Mobile Banking</div>
                        <div className="text-sm text-muted-foreground">Vietcombank, Techcombank, BIDV, VPBank</div>
                      </div>
                    </Label>
                  </div>

                  {/* Bank Transfer */}
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="bank-transfer" className="flex-1 cursor-pointer">
                      <div>
                        <div className="font-medium">Chuyển khoản ngân hàng</div>
                        <div className="text-sm text-muted-foreground">Chuyển khoản trực tiếp qua ngân hàng</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {selectedMethod === "credit-card" && (
                <div className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="card-number">Số thẻ</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Ngày hết hạn</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="card-name">Tên trên thẻ</Label>
                    <Input id="card-name" placeholder="NGUYEN VAN A" />
                  </div>
                </div>
              )}

              {selectedMethod === "mobile-banking" && (
                <div className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="bank-select">Chọn ngân hàng</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="">Chọn ngân hàng</option>
                      <option value="vcb">Vietcombank</option>
                      <option value="tcb">Techcombank</option>
                      <option value="bidv">BIDV</option>
                      <option value="vpbank">VPBank</option>
                    </select>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Bạn sẽ được chuyển hướng đến ứng dụng ngân hàng để hoàn tất thanh toán.
                    </p>
                  </div>
                </div>
              )}

              {selectedMethod === "bank-transfer" && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Thông tin chuyển khoản:</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Ngân hàng:</strong> Vietcombank
                      </p>
                      <p>
                        <strong>Số tài khoản:</strong> 1234567890
                      </p>
                      <p>
                        <strong>Chủ tài khoản:</strong> CONG TY TNHH GIAO DUC ABC
                      </p>
                      <p>
                        <strong>Nội dung:</strong> THANHTOAN {bookingData.teacherId} {bookingData.bookingInfo.studentName}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === "momo" && (
                <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                  <p className="text-sm text-pink-800">
                    Bạn sẽ được chuyển hướng đến ứng dụng Momo để hoàn tất thanh toán.
                  </p>
                </div>
              )}

              <Button
                className="w-full mt-6"
                onClick={handlePayment}
                disabled={!selectedMethod || isProcessing}
              >
                {isProcessing ? "Đang xử lý..." : `Thanh toán ${bookingData.totalAmount.toLocaleString('vi-VN')}đ`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}