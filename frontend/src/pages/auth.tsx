"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, GraduationCap, Users, Globe } from "lucide-react"

export default function AuthPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login:", loginData)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Register:", registerData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 px-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground font-sans">English Academy</h1>
            </div>
            <p className="text-xl text-muted-foreground font-serif leading-relaxed">
              Nâng cao trình độ tiếng Anh của bạn với phương pháp học hiện đại và hiệu quả
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center bg-black justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground font-sans">Giáo viên chuyên nghiệp</h3>
                <p className="text-muted-foreground font-serif">Đội ngũ giáo viên bản ngữ và có chứng chỉ quốc tế</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center bg-black  justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground font-sans">Lớp học tương tác</h3>
                <p className="text-muted-foreground font-serif">Học tập trong môi trường năng động và thân thiện</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center bg-black  justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground font-sans">Chứng chỉ quốc tế</h3>
                <p className="text-muted-foreground font-serif">Chuẩn bị cho các kỳ thi IELTS, TOEFL, TOEIC</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth Forms */}
        <div className="w-full max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login" className="font-sans">
                Đăng nhập
              </TabsTrigger>
              <TabsTrigger value="register" className="font-sans">
                Đăng ký
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="border-0 shadow-xl">
                <CardHeader className="space-y-2 text-center">
                  <CardTitle className="text-2xl font-bold text-foreground font-sans">Chào mừng trở lại!</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="font-sans">
                        Email
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="font-serif"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="font-sans">
                        Mật khẩu
                      </Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="font-serif"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="remember" className="rounded" />
                        <Label htmlFor="remember" className="text-sm font-serif">
                          Ghi nhớ đăng nhập
                        </Label>
                      </div>
                      <Button variant="link" className="p-0 h-auto font-serif text-accent">
                        Quên mật khẩu?
                      </Button>
                    </div>
                    <Button type="submit" className="w-full font-sans">
                      Đăng nhập
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card className="border-0 shadow-xl">
                <CardHeader className="space-y-2 text-center">
                  <CardTitle className="text-2xl font-bold text-foreground font-sans">Tạo tài khoản mới</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name" className="font-sans">
                        Họ và tên
                      </Label>
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                        className="font-serif"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="font-sans">
                        Email
                      </Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        className="font-serif"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="font-sans">
                        Mật khẩu
                      </Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        className="font-serif"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password" className="font-sans">
                        Xác nhận mật khẩu
                      </Label>
                      <Input
                        id="register-confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        className="font-serif"
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="terms" className="rounded" required />
                      <Label htmlFor="terms" className="text-sm font-serif">
                        Tôi đồng ý với{" "}
                        <Button variant="link" className="p-0 h-auto text-accent font-serif">
                          điều khoản sử dụng
                        </Button>
                      </Label>
                    </div>
                    <Button type="submit" className="w-full font-sans">
                      Tạo tài khoản
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Mobile branding */}
          <div className="lg:hidden mt-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="text-xl font-bold text-foreground font-sans">English Academy</h2>
            </div>
            <p className="text-muted-foreground font-serif">Nâng cao trình độ tiếng Anh với phương pháp học hiện đại</p>
          </div>
        </div>
      </div>
    </div>
  )
}
