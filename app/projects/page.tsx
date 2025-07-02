"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaLocationArrow } from "react-icons/fa6";
import { PinContainer } from "@/components/ui/3d-pin";

// Your actual project data
const projects = [
  {
    id: 1,
    title: "FigPro - Collaborative Design Tool",
    des: "A collaborative design tool with real-time collaboration, vector editing, and a responsive UI.",
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=464&h=300&fit=crop",
    iconLists: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg"
    ],
    link: "https://figma.com",
    sourceCode: "https://github.com"
  },
  {
    id: 2,
    title: "Yoom - Video Conferencing App",
    des: "Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.",
    img: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=464&h=300&fit=crop",
    iconLists: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
    ],
    link: "https://zoom.us",
    sourceCode: "https://github.com"
  },
  {
    id: 3,
    title: "AI Image SaaS - Canva Application",
    des: "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=464&h=300&fit=crop",
    iconLists: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    ],
    link: "https://canva.com",
    sourceCode: "https://github.com"
  },
  {
    id: 4,
    title: "Animated Apple iPhone 3D Website",
    des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects.",
    img: "https://images.unsplash.com/photo-1592286622648-eef49cf2eeba?w=464&h=300&fit=crop",
    iconLists: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg"
    ],
    link: "https://apple.com",
    sourceCode: "https://github.com"
  }
];

export default function ProjectsPage() {
  return (
    <section id="projects" className="pt-32 pb-20">
      {/* Title - EXACT same styling as PremiumExperience "Work Experience" */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-20 mb-16"
      >
        <motion.h1 
          className="text-5xl lg:text-7xl font-bold mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
            Recent Projects
          </span>
        </motion.h1>
        
        <motion.div
            initial={{ width: "100px" }}
            animate={{ 
              width: ["100px","600px", "100px"]
            }}
            transition={{ 
              duration: 4,
              delay: 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
            className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"
          />
      </motion.div>

      {/* Projects Grid */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-24 gap-y-8 p-4">
        {projects.map(({ id, des, iconLists, img, link, sourceCode, title }) => (
          <div
            key={id}
            className="flex h-[32rem] w-[90vw] items-center justify-center sm:h-[41rem] sm:w-[570px] lg:min-h-[32.5rem]"
          >
            <PinContainer title="Visit" href={link}>
              {/* Project Image Container */}
              <div className="relative mb-10 flex h-[30vh] w-[80vw] items-center justify-center overflow-hidden sm:h-[40vh] sm:w-[570px]">
                {/* Background */}
                <div className="relative h-full w-full overflow-hidden bg-[#13162d] lg:rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
                </div>

                {/* Project Image */}
                <Image
                  height={300}
                  width={464}
                  src={img}
                  alt={title}
                  className="absolute bottom-0 z-10 rounded-lg"
                />
              </div>

              {/* Project Title */}
              <h1 className="line-clamp-1 text-base font-bold md:text-xl lg:text-2xl">
                {title}
              </h1>

              {/* Project Description */}
              <p 
                className="line-clamp-2 text-sm font-light lg:text-xl lg:font-normal mt-3"
                style={{ color: "#BEC1DD" }}
              >
                {des}
              </p>

              {/* Bottom Section - Icons and Source Code Link */}
              <div className="mb-3 mt-7 flex items-center justify-between">
                {/* Tech Stack Icons */}
                <div className="flex items-center">
                  {iconLists.map((icon, i) => (
                    <div
                      key={icon}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.2] bg-black lg:h-10 lg:w-10"
                      style={{
                        transform: `translateX(-${5 * i * 2}px)`,
                      }}
                    >
                      <Image
                        height={20}
                        width={20}
                        src={icon}
                        alt="tech icon"
                        className="p-1"
                      />
                    </div>
                  ))}
                </div>

                {/* Source Code Link */}
                <div className="flex items-center justify-center">
                  <Link
                    href={sourceCode}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center text-sm text-purple-400 md:text-xs lg:text-xl"
                  >
                    Source Code
                    <FaLocationArrow className="ms-3" color="#CBACF9" />
                  </Link>
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </section>
  );
}