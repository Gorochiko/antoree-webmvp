import { FeaturesSection } from "./features-section";
import { HeroSection } from "./hero-section";
import { TeacherGrid } from "./teacher-grid";


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <TeacherGrid />
      <FeaturesSection />
      
    </div>
  );
}