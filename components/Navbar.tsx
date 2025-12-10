// components/Navbar.tsx

"use client";

import { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/theme/theme-toggle";
import DarkLogo from "../public/taskflow-dark-theme.png";
import LightLogo from "../public/taskflow-light-theme.png";
import { useTheme } from "next-themes";
export default function Navbar() {
  const { isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const { theme } = useTheme();

  const currentLogo = theme === "dark" ? DarkLogo : LightLogo;

  useEffect(() => {
    setMenuOpen(false);
  }, [isSignedIn]);

  const navItemsSignedOut = [
    { label: "Home", href: "/" },
    { label: "Sign-in", href: "/sign-in" },
    { label: "Sign-up", href: "/sign-up" },
  ];

  const navItemsSignedIn = [
    { label: "Home", href: "/" },
    { label: "My Tasks", href: "/tasks" },
  ];

  const containerVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    exit: { y: "-100%", opacity: 0, transition: { duration: 0.4 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 },
    }),
  };

  return (
    <nav className="flex justify-between items-center py-4 bg-white shadow md:px-10 px-5 dark:bg-[#191919] text-[#37352f] dark:text-[#ffffffcf]  sticky top-0 z-100">
      <Link href="/" className="text-xl font-semibold">
        <Image
          src={currentLogo}
          alt="Site  logo"
          width={200}
          height={50}
          priority
        />
      </Link>
      <ThemeToggle />
      <div className="hidden md:flex gap-4 items-center">
        {isSignedIn ? (
          <>
            <Link href="/tasks" className="hover:underline">
              My Tasks
            </Link>
            <UserButton />
          </>
        ) : (
          <>
            <Link href="/sign-in">Sign In</Link>
            <Link href="/sign-up">Sign Up</Link>
          </>
        )}
      </div>
      <div className="flex items-center md:hidden">
        <button onClick={() => setMenuOpen(true)}>
          <Menu className="text-blue-900 w-6 h-6 dark:text-[#ffffffcf]" />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="menu"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="fixed inset-0  bg-white dark:bg-gray-800 backdrop-blur-lg p-8 flex flex-col items-center justify-center opacity-100"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4"
              >
                <X className="w-6 h-6 text-blue-900 dark:text-white" />
              </button>

              <motion.nav
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-full max-w-md"
              >
                {isSignedIn ? (
                  <>
                    {navItemsSignedIn.map((item, index) => (
                      <motion.div
                        key={item.label}
                        custom={index}
                        variants={itemVariants}
                        className="text-blue-900 dark:text-[#ffffffcf] text-xl font-semibold text-center py-4 border-b border-blue-300 transition-colors duration-300"
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          data-aos="fade-up"
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                    <div className="dark:text-[#ffffffcf] text-xl font-semibold text-center py-4 border-b border-blue-300 transition-colors duration-300 ">
                      <UserButton />
                    </div>
                  </>
                ) : (
                  navItemsSignedOut.map((item, index) => (
                    <motion.div
                      key={item.label}
                      custom={index}
                      variants={itemVariants}
                      className="text-blue-900 dark:text-[#ffffffcf] text-xl font-semibold text-center py-4 border-b border-blue-300 transition-colors duration-300 hover:text-blue-600 cursor-pointer"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        data-aos="fade-up"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))
                )}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
