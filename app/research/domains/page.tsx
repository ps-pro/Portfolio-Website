import { ResearchDomains } from "@/components/main/research-domains";

const ResearchDomainsPage = () => {
  return (
    <main className="relative min-h-screen bg-black-100 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(120,119,198,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(120,119,198,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      
      {/* Main content */}
      <div className="relative z-10 pt-20">
        <ResearchDomains />
      </div>
    </main>
  );
};

export default ResearchDomainsPage;