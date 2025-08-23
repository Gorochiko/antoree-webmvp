
import { Star, Users, Clock } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto text-center">
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Học tiếng Anh 1-1 với
            <span className="text-primary"> giáo viên chuyên nghiệp</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Tìm giáo viên phù hợp, đặt lịch học thử miễn phí và bắt đầu hành trình chinh phục tiếng Anh của bạn ngay hôm
            nay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Giáo viên chuyên nghiệp</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Star className="h-6 w-6 text-accent" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">4.9/5</div>
              <div className="text-sm text-muted-foreground">Đánh giá trung bình</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">24/7</div>
              <div className="text-sm text-muted-foreground">Hỗ trợ học tập</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
