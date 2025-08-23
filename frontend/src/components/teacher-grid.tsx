import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock } from "lucide-react"
import { Link } from "react-router-dom"

const teachers = [
  {
id: "TCH001",    name: "Sarah Johnson",
    avatar: "/professional-teacher-woman.png",
    rating: 4.9,
    reviews: 127,
    country: "USA",
    specialties: ["IELTS", "Business English"],
    experience: "5 năm",
    price: "300.000đ",
    description: "Chuyên gia IELTS với kinh nghiệm giảng dạy tại các trường đại học hàng đầu",
  },
  {
    id: "TCH002",
    name: "Michael Chen",
    avatar: "/asian-male-teacher.png",
    rating: 4.8,
    reviews: 89,
    country: "Canada",
    specialties: ["Conversation", "Grammar"],
    experience: "3 năm",
    price: "250.000đ",
    description: "Giáo viên năng động, chuyên về giao tiếp và ngữ pháp thực tế",
  },
  {
    id: "TCH003",
    name: "Emma Wilson",
    avatar: "/professional-blonde-teacher.png",
    rating: 5.0,
    reviews: 203,
    country: "UK",
    specialties: ["TOEFL", "Academic Writing"],
    experience: "7 năm",
    price: "400.000đ",
    description: "Thạc sĩ Ngôn ngữ học, chuyên gia về viết học thuật và TOEFL",
  },
  {
    id: "TCH004",
    name: "David Brown",
    avatar: "/professional-teacher-man-beard.png",
    rating: 4.7,
    reviews: 156,
    country: "Australia",
    specialties: ["Pronunciation", "Accent Training"],
    experience: "4 năm",
    price: "280.000đ",
    description: "Chuyên gia phát âm, giúp học viên cải thiện giọng nói tự nhiên",
  },
]

export function TeacherGrid() {
  return (
    <section id="teachers" className="py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Giáo viên nổi bật</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Khám phá đội ngũ giáo viên chuyên nghiệp với kinh nghiệm giảng dạy phong phú
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((teacher) => (
            <Card key={teacher.id} className="bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <img
                    src={teacher.avatar || "/placeholder.svg"}
                    alt={teacher.name}
                    className="w-20 h-20 rounded-full mb-3 object-cover"
                  />
                  <h3 className="font-semibold text-lg text-card-foreground mb-1">{teacher.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{teacher.country}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-sm">{teacher.rating}</span>
                  <span className="text-sm text-muted-foreground">({teacher.reviews})</span>
                </div>

                <div className="flex flex-wrap gap-1 justify-center mb-3">
                  {teacher.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-2">{teacher.description}</p>

                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{teacher.experience}</span>
                </div>

                <div className="text-center mb-4">
                  <span className="text-lg font-bold text-primary">{teacher.price}</span>
                  <span className="text-sm text-muted-foreground">/buổi</span>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex flex-col gap-2">
                <Link to={`/teachers/${teacher.id}`} className="w-full">
                  <Button className="w-full bg-primary hover:bg-primary/90">Học thử miễn phí</Button>
                </Link>
                <Link to={`/teachers/${teacher.id}`} className="w-full">
                  <Button variant="outline" className="w-full bg-transparent">
                    Xem hồ sơ
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/teachers">
            <Button size="lg" variant="outline">
              Xem tất cả giáo viên
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
