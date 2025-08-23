import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Link } from "react-router-dom"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">EN</span>
            </div>
            <span  className="font-bold text-xl text-foreground">
                <a href="/">English</a>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/teachers"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Giáo viên
            </Link>
        
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <Link to="/auth">Đăng nhập</Link>
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
