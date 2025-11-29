import { BackgroundBeams } from "../ui/background-beams";

import { ReactNode } from 'react';

export function BackgroundBeamsDemo({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen bg-neutral-950 relative flex flex-row items-center justify-center antialiased  border-red-600">
      <div className="z-10 mx-auto   border-green-500 flex items-center">
        {children}
      </div>
      <BackgroundBeams />
    </div>
  );
}
