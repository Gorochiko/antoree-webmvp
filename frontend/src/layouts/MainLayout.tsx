
import { Header } from "@/components/header"
import { Outlet } from "react-router-dom";
import { Footer } from "@/components/footer"
function MainLayout() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
                <Outlet />
            <Footer />
        </div>
    )
}
export default MainLayout;