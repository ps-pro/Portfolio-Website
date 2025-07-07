// components/sub/hero-content.tsx
"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { AnimatedGreeting } from "@/components/ui/animated-greeting";
import { TypewriterRole } from "@/components/ui/typewriter-role";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";
import { ChatPanel } from "@/components/ui/chat-panel";

export const HeroContent = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
      >
        <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
          <motion.div
            variants={slideInFromTop}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] cursor-pointer"
            onClick={openChat}
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px]">
              Chat with me
            </h1>
          </motion.div>

          <motion.div
            variants={slideInFromLeft(0.5)}
            className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
          >
            <AnimatedGreeting />
          </motion.div>

          <motion.p
            variants={slideInFromLeft(0.8)}
            className="text-lg text-gray-400 my-5 max-w-[600px]"
          >
            <TypewriterRole />
            {" "} passionate about AI systems, data analytics, and research. I enjoy building solutions and sharing insights. Check out my skills, projects, and publications.
          </motion.p>

          <motion.a
            variants={slideInFromLeft(1)}
            href="https://drive.google.com/file/d/1epauWMNBGsKI6UroEBktFhQiZB__LTbF/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] hover:scale-105 transition-transform duration-300"
          >
            View Resume
          </motion.a>
        </div>

        <motion.div
          variants={slideInFromRight(0.8)}
          className="w-full h-full flex justify-center items-center"
        >
          <Image
            src="/hero-bg.svg"
            alt="work icons"
            height={650}
            width={650}
            draggable={false}
            className="select-none"
          />
        </motion.div>
      </motion.div>

      {/* Chat Panel */}
      <ChatPanel isOpen={isChatOpen} onClose={closeChat} />
    </>
  );
};