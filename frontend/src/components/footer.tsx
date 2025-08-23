import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">EN</span>
              </div>
              <span className="font-bold text-xl text-card-foreground">EnglishTutor</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nền tảng học tiếng Anh 1-1 hàng đầu Việt Nam, kết nối học viên với giáo viên chuyên nghiệp từ khắp nơi
              trên thế giới.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-card-foreground">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-card-foreground text-sm transition-colors">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-card-foreground text-sm transition-colors">
                  Giáo viên
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-card-foreground text-sm transition-colors">
                  Gói học
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-card-foreground text-sm transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-card-foreground text-sm transition-colors">
                  Hỗ trợ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-card-foreground">Hỗ trợ</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-card-foreground text-sm transition-colors">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-card-foreground text-sm transition-colors">
                  Hướng dẫn sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-card-foreground text-sm transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-card-foreground text-sm transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-card-foreground text-sm transition-colors">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-card-foreground">Liên hệ</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">support@englishtutor.vn</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">1900 1234</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">123 Nguyễn Huệ, Q1, TP.HCM</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium text-card-foreground text-sm">Đăng ký nhận tin</h5>
              <div className="flex gap-2">
                <Input placeholder="Email của bạn" className="text-sm" />
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Đăng ký
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">© 2024 EnglishTutor. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
