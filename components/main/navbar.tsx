// components/main/navbar.tsx (Updated with Profile Image)
'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useCosmicSettings } from "@/contexts/cosmic-context";

const NAV_LINKS = [
  { title: "About", link: "/" },
  { title: "Skills", link: "/skills" },
  { 
    title: "Research", 
    link: "/research",
    dropdown: [
      { title: "Research Domains", link: "/research/domains" },
      { title: "Publications", link: "/research/publications" },
      { title: "Ongoing Research", link: "/research/ongoing" }
    ]
  },
  { title: "Cosmic Play", link: "/cosmic-play", special: true },
  { 
    title: "Projects", 
    link: "/projects",
    dropdown: [
      { title: "QuantBoX", link: "/projects/quantbox" },
      { title: "AutoAnalytiX", link: "/projects/autoanalytix" },
      { title: "separator", link: "#" },
      { title: "All Projects", link: "/projects" }
    ]
  },
  { title: "Experience", link: "/experience" },
  { title: "Contact", link: "/contact" }
];

const SOCIALS = [
  // Your social links here
];

export const Navbar = () => {
  const settings = useCosmicSettings();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  return (
    <div className="w-full h-[80px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-10">
      {/* Navbar Container */}
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        {/* Profile Image + Name ONLY (no logo) */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          {/* ONLY Your Profile Image */}
          <Image
            src="/logo.png" // 👈 REPLACE THIS with your profile image path
            alt="Priyansh Singhal"
            width={50}
            height={50}
            draggable={false}
            className="cursor-pointer rounded-full border-2 border-purple-500 object-cover"
          />
          <div className="hidden md:flex font-bold text-white text-lg">
            Priyansh Singhal
          </div>
        </Link>

        {/* Web Navbar */}
        <div className="hidden md:flex w-auto h-full flex-row items-center justify-center">
          <div className="flex items-center justify-between h-auto border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] px-[25px] py-[12px] rounded-full text-white">
            {NAV_LINKS.map((link) => (
              <div key={link.title} className="relative group">
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => handleDropdownToggle(link.title)}
                      className="cursor-pointer transition mx-3 text-base font-medium text-white hover:text-[rgb(112,66,248)] flex items-center gap-1"
                    >
                      {link.title}
                      <ChevronDownIcon className="h-4 w-4" />
                    </button>
                    {activeDropdown === link.title && (
                      <div className="absolute top-full left-0 mt-2 bg-[#030014] border border-purple-500/30 rounded-lg py-2 min-w-[200px] z-50">
                        {link.dropdown.map((dropdownItem, index) => (
                          dropdownItem.title === "separator" ? (
                            <div key={index} className="border-t border-gray-600 my-2" />
                          ) : (
                            <Link
                              key={index}
                              href={dropdownItem.link}
                              className="block px-4 py-2 text-white hover:bg-purple-500/20 hover:text-purple-400 transition"
                            >
                              {dropdownItem.title}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ) : link.special ? (
                  <button
                    onClick={() => settings?.setModalOpen(true)}
                    className="cursor-pointer transition mx-3 text-base font-medium text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text hover:from-purple-300 hover:via-pink-400 hover:to-red-400 font-bold text-lg animate-pulse"
                  >
                    {link.title}
                  </button>
                ) : (
                  <Link
                    href={link.link}
                    className="cursor-pointer transition mx-3 text-base font-medium text-white hover:text-[rgb(112,66,248)]"
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Social Icons (Web) */}
        <div className="hidden md:flex flex-row gap-5">
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
              className="hover:scale-110 transition-transform"
            >
              <Icon className="h-6 w-6 text-white hover:text-[rgb(112,66,248)]" />
            </Link>
          ))}
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-white focus:outline-none text-4xl hover:text-[rgb(112,66,248)] transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-[#030014] p-6 flex flex-col items-center text-white md:hidden border-t border-[rgba(112,66,248,0.3)]">
          {/* Profile Image for Mobile ONLY */}
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/logo.png" // 👈 REPLACE THIS with your profile image path
              alt="Priyansh Singhal"
              width={40}
              height={40}
              draggable={false}
              className="rounded-full border-2 border-purple-500 object-cover"
            />
            <div className="font-bold text-white">
              Priyansh Singhal
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-5">
            {NAV_LINKS.map((link) => (
              <div key={link.title} className="text-center">
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => handleDropdownToggle(link.title)}
                      className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-center text-lg font-medium flex items-center gap-1"
                    >
                      {link.title}
                      <ChevronDownIcon className="h-4 w-4" />
                    </button>
                    {activeDropdown === link.title && (
                      <div className="mt-2 flex flex-col gap-2">
                        {link.dropdown.map((dropdownItem, index) => (
                          dropdownItem.title === "separator" ? (
                            <div key={index} className="border-t border-gray-600 my-2" />
                          ) : (
                            <Link
                              key={index}
                              href={dropdownItem.link}
                              className="block text-purple-400 hover:text-purple-300 transition"
                            >
                              {dropdownItem.title}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ) : link.special ? (
                  <button
                    onClick={() => settings?.setModalOpen(true)}
                    className="cursor-pointer transition text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text font-bold text-lg"
                  >
                    {link.title}
                  </button>
                ) : (
                  <Link
                    href={link.link}
                    className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-center text-lg font-medium"
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Social Icons (Mobile) */}
          <div className="flex flex-row gap-5 mt-6">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                key={name}
                className="hover:scale-110 transition-transform"
              >
                <Icon className="h-6 w-6 text-white hover:text-[rgb(112,66,248)]" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};