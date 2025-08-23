import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Video, BookOpen, Award, Clock, Headphones } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Đặt lịch linh hoạt",
    description: "Chọn thời gian học phù hợp với lịch trình của bạn, có thể thay đổi dễ dàng",
  },
  {
    icon: Video,
    title: "Học trực tuyến HD",
    description: "Lớp học trực tuyến chất lượng cao với công nghệ video call hiện đại",
  },
  {
    icon: BookOpen,
    title: "Tài liệu đa dạng",
    description: "Thư viện tài liệu phong phú từ cơ bản đến nâng cao, cập nhật liên tục",
  },
  {
    icon: Award,
    title: "Chứng chỉ uy tín",
    description: "Nhận chứng chỉ hoàn thành khóa học được công nhận quốc tế",
  },
  {
    icon: Clock,
    title: "Hỗ trợ 24/7",
    description: "Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc của bạn",
  },
  {
    icon: Headphones,
    title: "Luyện nghe chuyên sâu",
    description: "Hệ thống luyện nghe với nhiều giọng điệu và tốc độ khác nhau",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tại sao chọn EnglishTutor?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi cung cấp trải nghiệm học tập toàn diện với công nghệ hiện đại
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-card-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
