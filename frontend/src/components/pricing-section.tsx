import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

const pricingPlans = [
  {
    name: "Gói Cơ bản",
    price: "1.200.000",
    period: "tháng",
    description: "Phù hợp cho người mới bắt đầu",
    features: [
      "4 buổi học 1-1 (60 phút/buổi)",
      "Tài liệu học tập cơ bản",
      "Hỗ trợ qua email",
      "Đánh giá tiến độ hàng tháng",
    ],
    popular: false,
  },
  {
    name: "Gói Tiêu chuẩn",
    price: "2.200.000",
    period: "tháng",
    description: "Lựa chọn phổ biến nhất",
    features: [
      "8 buổi học 1-1 (60 phút/buổi)",
      "Tài liệu học tập đầy đủ",
      "Hỗ trợ qua chat & email",
      "Đánh giá tiến độ hàng tuần",
      "Bài tập về nhà cá nhân hóa",
      "Ghi âm buổi học để ôn tập",
    ],
    popular: true,
  },
  {
    name: "Gói Cao cấp",
    price: "3.800.000",
    period: "tháng",
    description: "Cho học viên nghiêm túc",
    features: [
      "12 buổi học 1-1 (60 phút/buổi)",
      "Tài liệu học tập premium",
      "Hỗ trợ ưu tiên 24/7",
      "Đánh giá tiến độ hàng tuần",
      "Bài tập về nhà cá nhân hóa",
      "Ghi âm buổi học để ôn tập",
      "Mock test IELTS/TOEFL",
      "Tư vấn lộ trình cá nhân",
    ],
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Chọn gói học phù hợp</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Các gói học được thiết kế linh hoạt để phù hợp với mọi nhu cầu và ngân sách
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`relative bg-card ${plan.popular ? "ring-2 ring-primary shadow-lg" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Phổ biến nhất
                </Badge>
              )}

              <CardHeader className="text-center p-6">
                <h3 className="font-bold text-xl text-card-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">đ/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-0">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="p-6">
                <Button
                  className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Chọn gói này
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Không chắc chắn gói nào phù hợp? Hãy thử buổi học miễn phí!</p>
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Đặt lịch học thử miễn phí
          </Button>
        </div>
      </div>
    </section>
  )
}
