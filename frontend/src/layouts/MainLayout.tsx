
import { Header } from "@/components/header"
import { Outlet } from "react-router-dom";
import { Footer } from "@/components/footer"
import { Toaster } from "sonner"
function MainLayout() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <Outlet />
            <Footer />
            <Toaster richColors position="top-center" />
        </div>
    )
}
export default MainLayout;