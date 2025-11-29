"use client";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "./components/ui/SideBarComponent";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "./lib/utils";
import Search from "./components/elements/Search";
// import { boolean } from "zod";

export function SidebarDemo() {
  // console.log(sessionStorage.getItem('email'));
  const location = useLocation();

  const links = [
    {
      label: "Dashboard",
      href: "/homepage",
      icon: (
        <IconBrandTabler color="white" className="bg-white text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt  className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "AboutUs",
      href: "/settings",
      icon: (
        <IconSettings className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/logout",
      icon: (
        <IconArrowLeft className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState<boolean>(false);
  localStorage.setItem("open", open.toString());

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100  w-full flex-1  mx-auto border border-neutral-700 overflow-hidden",
        "h-screen" 
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => {
                // console.log("link", link);
                return <SidebarLink key={idx} link={link} />;
              })}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard currentPath={location.pathname} open={open} />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre"
      >
        Scholar Safe
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = ({
  currentPath,
  open,
}: {
  currentPath: string;
  open: boolean;
}) => {
  console.log(currentPath);
  return (
    <>
      <Search open={open} />
    </>
  );
};
