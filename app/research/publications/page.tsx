// app/research/publications/page.tsx
"use client";

import { useEffect } from "react";

const PublicationsPage = () => {
  useEffect(() => {
    // Redirect to Google Scholar profile
    window.location.href = "https://scholar.google.com/citations?user=4flHofwAAAAJ&hl=en";
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-[#030014] text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold mb-2">Redirecting to Google Scholar...</h2>
        <p className="text-gray-400">
          If you&apos;re not redirected automatically, 
          <a 
            href="https://scholar.google.com/citations?user=4flHofwAAAAJ&hl=en"
            className="text-purple-500 hover:text-purple-400 ml-1 underline"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
};

export default PublicationsPage;