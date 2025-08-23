"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Clock, GraduationCap, Languages, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { TEACHERS } from "@/mock/teacher.mock"



interface TeacherDetailProps {
  teacherId: string
}
interface BookingFormData {
  studentName: string;
  email: string;
  phone: string;
  courseType: string;
  level: string;
  note: string;
}
export function TeacherDetail({ teacherId }: TeacherDetailProps) {
  const [isTrialFormOpen, setIsTrialFormOpen] = useState(false)
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState("")
  const [formData, setFormData] = useState<BookingFormData>({
    studentName: "",
    email: "",
    phone: "",
    courseType: "",
    level: "",
    note: ""
  })
  const navigate = useNavigate()
  const teacher = TEACHERS.find((t) => String(t.id) === teacherId)

  if (!teacher) {
    return (
      <div className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy giáo viên</h1>
          <Link to="/teachers">
            <Button>Quay lại danh sách</Button>
          </Link>
        </div>
      </div>
    )
  }
  const basePrice = Number.parseInt(String(teacher.price).replace(/[^\d]/g, "")) // Chuyển đổi giá thành số nguyên
  const totalLessons = selectedCourse === "2-months" ? 8 : 16;
  const totalAmount = (basePrice * totalLessons);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData = {
      teacherId: teacher.id,
      teacherName: teacher.name,
      courseType: selectedCourse,
      totalAmount,
      bookingInfo: {
        ...formData,
        courseType: selectedCourse,
        numberOfLessons: totalLessons
      }
    }
    sessionStorage.setItem("bookingData", JSON.stringify(bookingData))

    navigate(`/teachers/${teacher.id}/booking`)
  }
  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }
  return (
    <div className="py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <Link
          to="/teachers"
          className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại danh sách giáo viên
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Teacher Info */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <img
                    src={teacher.avatar || "/placeholder.svg"}
                    alt={teacher.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-foreground mb-2">{teacher.name}</h1>
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{teacher.country}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{teacher.rating}</span>
                      <span className="text-muted-foreground">({teacher.reviews} đánh giá)</span>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {teacher.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Giới thiệu</h3>
                    <p className="text-muted-foreground leading-relaxed">{teacher.bio}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold">Học vấn</h4>
                      </div>
                      <p className="text-muted-foreground">{teacher.education}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold">Kinh nghiệm</h4>
                      </div>
                      <p className="text-muted-foreground">{teacher.experience}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Languages className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Ngôn ngữ</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {teacher.languages?.map((language: string) => (
                        <Badge key={language} variant="outline">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Section */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-center">
                  <span className="text-2xl font-bold text-primary">{teacher.price}</span>
                  <span className="text-sm text-muted-foreground">/buổi</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Trial Lesson Dialog */}
                <Dialog open={isTrialFormOpen} onOpenChange={setIsTrialFormOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-primary hover:bg-primary/90">Học thử miễn phí</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Đăng ký học thử miễn phí</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="name">Họ và tên</Label>
                        <Input id="name" placeholder="Nhập họ và tên của bạn" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Nhập email của bạn" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input id="phone" placeholder="Nhập số điện thoại" />
                      </div>
                      <div>
                        <Label htmlFor="level">Trình độ hiện tại</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn trình độ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Mới bắt đầu</SelectItem>
                            <SelectItem value="elementary">Cơ bản</SelectItem>
                            <SelectItem value="intermediate">Trung cấp</SelectItem>
                            <SelectItem value="advanced">Nâng cao</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="note">Ghi chú (tùy chọn)</Label>
                        <Textarea id="note" placeholder="Mục tiêu học tập, thời gian phù hợp..." />
                      </div>
                      <Button type="submit" className="w-full">
                        Đăng ký học thử
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* Course Booking Dialog */}
                <Dialog open={isBookingFormOpen} onOpenChange={setIsBookingFormOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full bg-transparent">
                      Booking khóa học
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Đăng ký khóa học</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="student-name">Họ và tên học viên</Label>
                        <Input
                          id="student-name"
                          placeholder="Nhập họ và tên học viên"
                          onChange={(e) => handleInputChange('studentName', e.target.value)}
                          required
                          value={formData.studentName}
                        />

                      </div>
                      <div>
                        <Label htmlFor="student-email">Email</Label>
                        <Input
                          id="student-email"
                          type="email"
                          placeholder="Nhập email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required />
                      </div>
                      <div>
                        <Label htmlFor="student-phone">Số điện thoại</Label>
                        <Input
                          id="student-phone"
                          placeholder="Nhập số điện thoại"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="course-type">Loại khóa học</Label>
                        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại khóa học" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2-months">
                              Khóa 2 tháng - {(Number.parseInt(String(teacher.price).replace(/[^\d]/g, "")) * 8) / 1000}.000đ
                            </SelectItem>
                            <SelectItem value="4-months">
                              Khóa 4 tháng - {(Number.parseInt(String(teacher.price).replace(/[^\d]/g, "")) * 16) / 1000}.000đ
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="student-level">Trình độ hiện tại</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn trình độ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Mới bắt đầu</SelectItem>
                            <SelectItem value="elementary">Cơ bản</SelectItem>
                            <SelectItem value="intermediate">Trung cấp</SelectItem>
                            <SelectItem value="advanced">Nâng cao</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="course-note">Ghi chú</Label>
                        <Textarea id="course-note" placeholder="Mục tiêu học tập, lịch học mong muốn..." />
                      </div>
                      {selectedCourse && (
                        <div className="p-4 bg-muted rounded-lg">
                          <h4 className="font-semibold mb-2">Thông tin khóa học:</h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedCourse === "2-months" ? "Khóa 2 tháng (8 buổi)" : "Khóa 4 tháng (16 buổi)"}
                          </p>
                          <p className="text-sm font-semibold">
                            Tổng chi phí:{" "}
                            {selectedCourse === "2-months"
                              ? `${(Number.parseInt(String(teacher.price).replace(/[^\d]/g, "")) * 8) / 1000}.000đ`
                              : `${(Number.parseInt(String(teacher.price).replace(/[^\d]/g, "")) * 16) / 1000}.000đ`}
                          </p>
                        </div>
                      )}
                      <Button type="button" onClick={handleBooking} className="w-full">
                        Đăng ký khóa học
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
