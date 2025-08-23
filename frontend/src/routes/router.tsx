import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';

// Layouts
import MainLayout from "@/layouts/MainLayout";
import PaymentPage from "@/pages/payment-method";
import PaymentSuccess from "@/components/payment-success";

// Pages
const Home = lazy(() => import("@/components/home"));
const AuthPage = lazy(() => import("@/pages/auth"));
const TeacherList = lazy(() => import("@/pages/teacher-list"));
const TeacherDetail = lazy(() => import("@/pages/teacher-detail"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="auth" element={<AuthPage />} />

            {/* Teacher routes */}
            <Route path="teachers">
              <Route index element={<TeacherList />} />
              <Route path=":teacherId" element={<TeacherDetail />} />
              <Route path=":teacherId/booking" element={<PaymentPage />} />
              
            </Route>
             
            {/* Other routes */}
            {/* <Route path="features" element={<Features />} />
            <Route path="pricing" element={<Pricing />} /> */}
          </Route>
           <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}