import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import { MoonIcon, SunIcon } from "heroicons/react/24/outline";
import { IconMoon, IconSunFilled } from "@tabler/icons-react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode by adding/removing 'dark' class on <html>
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  return (
    <motion.header
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Flowers & Saints</span>
            <img
              className="h-8 w-auto"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/creative-SW6QDQbcVuwPgb6a2CYtYmRbsJa4k1.png"
              alt="Flowers & Saints Logo"
            />
          </Link>
        </div>
        <div className="flex gap-x-12">
          <Link
            to="https://www.flowersandsaints.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
          >
            Work
          </Link>
          <Link
            to="https://www.flowersandsaints.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            to="https://www.flowersandsaints.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>
        <div className="flex flex-1 justify-end">
          <button
            onClick={toggleDarkMode}
            className="rounded-full p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {darkMode ? (
              <IconSunFilled
              className="h-5 w-5" />
            ) : (
              <IconMoon
              className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>
    </motion.header>
  );
}