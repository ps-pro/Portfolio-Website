import { CyberpunkResearch } from "@/components/main/research";

const ResearchPage = () => {
  return (
    <main className="relative min-h-screen bg-black-100 pt-20 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(120,119,198,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(120,119,198,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]" />
      
      {/* Main content */}
      <div className="relative z-10">
        <CyberpunkResearch />
      </div>
    </main>
  );
};

export default ResearchPage;