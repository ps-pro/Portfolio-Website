// BACKUP STORAGE - components/premium-experience.tsx 
// This is your sexy component - DON'T DELETE THIS!

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const workExperience = [
  {
    id: 1,
    title: "Lead Frontend Developer",
    company: "TechCorp Solutions",
    duration: "Jan 2023 - Present",
    desc: "Developed and maintained user-facing features using modern frontend technologies.",
    thumbnail: "/exp4.svg",
    gradient: "from-orange-500/20 via-yellow-500/20 to-amber-500/20",
    glowColor: "shadow-orange-500/50",
    points: [
      "Led a team of 5 developers in creating responsive web applications using React.js and Next.js framework.",
      "Implemented advanced state management solutions and optimized application performance by 40%.",
      "Collaborated with UX/UI designers to deliver pixel-perfect implementations and seamless user experiences."
    ]
  },
  {
    id: 2,
    title: "Mobile App Dev - JSM Tech",
    company: "JSM Technologies",
    duration: "Jun 2022 - Dec 2022",
    desc: "Designed and developed mobile app for both iOS & Android platforms using React Native.",
    thumbnail: "/exp2.svg",
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    glowColor: "shadow-blue-500/50",
    points: [
      "Built cross-platform mobile applications serving over 10,000 active users with React Native framework.",
      "Integrated third-party APIs and implemented real-time chat functionality using Socket.io and Firebase.",
      "Optimized app performance and reduced loading times by 50% through efficient code splitting techniques."
    ]
  },
  {
    id: 3,
    title: "Freelance App Dev Project",
    company: "Independent Contractor",
    duration: "Mar 2022 - May 2022",
    desc: "Led the dev of a mobile app for a client, from initial concept to deployment on app stores.",
    thumbnail: "/exp3.svg",
    gradient: "from-emerald-500/20 via-green-500/20 to-lime-500/20",
    glowColor: "shadow-emerald-500/50",
    points: [
      "Managed complete project lifecycle from requirement analysis to successful App Store deployment.",
      "Developed custom e-commerce solution with payment gateway integration and inventory management system.",
      "Delivered project 2 weeks ahead of schedule while maintaining high code quality standards."
    ]
  },
  {
    id: 4,
    title: "Frontend Engineer Intern",
    company: "StartupHub Inc",
    duration: "Aug 2021 - Feb 2022",
    desc: "Assisted in the development of a web-based platform using React.js, enhancing interactivity.",
    thumbnail: "/exp1.svg",
    gradient: "from-purple-500/20 via-pink-500/20 to-red-500/20",
    glowColor: "shadow-purple-500/50",
    points: [
      "Contributed to developing interactive dashboard components using React.js and TypeScript technologies.",
      "Participated in code reviews and implemented responsive design patterns for mobile-first approach.",
      "Assisted senior developers in debugging complex issues and learned industry best practices."
    ]
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.8,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

const ExperienceCard = ({ 
  experience, 
  index, 
  isLeft 
}: { 
  experience: typeof workExperience[0], 
  index: number,
  isLeft: boolean 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex items-center mb-16">
      {/* Timeline Icon */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 180 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border-4 border-black-100 flex items-center justify-center"
        >
          <Image
            src={experience.thumbnail}
            alt={experience.title}
            width={24}
            height={24}
            className="w-6 h-6 object-contain filter brightness-0 invert"
          />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        variants={cardVariants}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative w-[45%] ${isLeft ? 'mr-auto pr-16' : 'ml-auto pl-16'}`}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-500 animate-pulse" />
        
        <motion.div
          animate={{
            scale: isHovered ? 1.02 : 1,
            rotateY: isHovered ? (isLeft ? 2 : -2) : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`relative p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-gradient-to-br ${experience.gradient} hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 transition-all duration-500 ${experience.glowColor} hover:shadow-2xl`}
        >
          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <motion.h3 
                  animate={{
                    color: isHovered ? "#e879f9" : "#ffffff",
                  }}
                  className="text-xl lg:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300"
                >
                  {experience.title}
                </motion.h3>
                
                <p className="text-purple-300 font-medium text-lg">
                  {experience.company}
                </p>
                
                <p className="text-gray-400 text-sm">
                  {experience.duration}
                </p>
              </div>
            </div>

            {/* Description */}
            <motion.p 
              animate={{
                color: isHovered ? "#e5e7eb" : "#9ca3af",
              }}
              className="text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors duration-300"
            >
              {experience.desc}
            </motion.p>

            {/* Bullet Points */}
            <div className="space-y-3">
              {experience.points.map((point, pointIndex) => (
                <motion.div
                  key={pointIndex}
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: pointIndex * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mt-2 flex-shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : "30%" }}
              className="h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl"
        />
      </motion.div>
    </div>
  );
};

export const PremiumExperience = () => {
  return (
    <section className="py-20 relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
              Work Experience
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-500 to-blue-500 opacity-30"
               style={{ height: `${(workExperience.length - 1) * 300 + 100}px` }} />
          
          {/* Timeline Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {workExperience.map((experience, index) => (
              <ExperienceCard 
                key={experience.id} 
                experience={experience} 
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-purple-500/20 to-transparent blur-3xl" />
      </div>
    </section>
  );
};

