// import React from "react";
import { Heading } from "lucide-react";
import { FloatingDock } from "../ui/floating-dock";
import {
    IconArticle,
  IconExchange,
  IconHome,
  IconNewSection,
  IconSend2,
} from "@tabler/icons-react";

export function FloatingDockDemo({ setNum}:{ setNum: React.Dispatch<React.SetStateAction<number>>}) {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome  className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      numb:0
    },

    {
      title: "Title",
      icon: (
        <Heading className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      numb:1
    },

    {
      title: "Description",
      icon: (
        // <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        <IconArticle className="h-full w-full text-neutral-500 dark:text-neutral-300"  />
        
      ),
      href: "#",
      numb:2
    },
    {
      title: "Upload File",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      numb:3
    },
    {
      title: "Tech Stack",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      numb:4
    },
    {
      title: "Submit",
      icon: (
        <IconSend2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      numb:12
    },

  ];
  return (
    <div className="flex items-center justify-center h-[10rem] w-full ">
      <FloatingDock
        mobileClassName="translate-y-20" 
        items={links}
        setNum={setNum}
      />
    </div>
  );
}
