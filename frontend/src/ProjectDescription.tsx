"use client"

import { useState } from "react"
import { X, Users, Code } from "lucide-react"

type Project = {
  project_description: string
  project_title: string
  team_members: Array<string>
  tech_stack: Array<string>
  year_done: number
  project_pdf_link: string
}

const ProjectDescription = ({
  id,
  data,
  setView
}: {
  id: number
  data: Project[]
  setView: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const project = data[id]
  const [isHovered, setIsHovered] = useState(false)
   console.log("Project ID:", data)
  if (!project) return null;
  console.log(data)
  return (
    <div
      className="relative h-[700px] w-[1100px] perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          h-full w-full bg-gradient-to-br from-slate-900 via-[#1a1f35] to-[#0f172a] rounded-3xl text-white 
          flex flex-row overflow-hidden shadow-glow
          transition-all duration-500 ease-out
          ${isHovered ? "transform-style-3d rotate-y-2 rotate-x-1" : ""}
        `}
      >
        {/* Close button */}
        <button
          onClick={()=>{setView(false)}}
          className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-500 to-pink-600
            text-white rounded-full w-10 h-10 flex items-center justify-center
            transition-all duration-300 hover:scale-110 shadow-neon-red
            animate-pulse-subtle"
        >
          <X size={20} />
        </button>

        {/* Left section */}
        <div
          className="h-full w-[70%] flex flex-col transform transition-transform duration-300 hover:translate-z-4 
          shadow-right-inner"
        >
          {/* Project title section */}
          <div
            className="h-1/4 w-full p-6 bg-gradient-to-r from-[#1e293b] to-[#0f172a] 
            transform transition-all duration-300 hover:translate-z-6 shadow-bottom-inner"
          >
            <h1
              className="text-[50px] font-bold text-transparent bg-clip-text bg-gradient-to-r 
              from-cyan-300 to-purple-400 leading-tight animate-shimmer"
            >
              {project.project_title}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Code size={18} className="text-cyan-400" />
              <p className="text-cyan-400 font-mono tech-stack-animate">{project.tech_stack.join(" • ")}</p>
            </div>
          </div>

          {/* Project description */}
          <div
            className="h-3/4 w-full p-6 overflow-auto custom-scrollbar bg-[#111827] 
            transform transition-transform duration-300 hover:translate-z-2 shadow-inner-subtle flex flex-row"
          >
            <div
              className="w-full h-full prose prose-invert  text-justify whitespace-pre-line leading-relaxed tracking-wide
              prose-headings:text-cyan-300 prose-a:text-purple-400 flex flex-row "
            >
              {/* {project.project_description} */}
              {/* {project.project_pdf_link} */}
                <iframe 
                src={project.project_pdf_link}
                className="w-full h-full flex items-center justify-center rounded-lg border-none shadow-md"
                title="Project PDF"
                frameBorder="0"
                // sandbox="allow-same-origin allow-scripts"
                ></iframe>
              
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="h-full w-[30%] flex flex-col transform transition-transform duration-300 hover:translate-z-4">
          {/* Avatar section */}
          <div
            className="h-[35%] w-full flex flex-col items-center justify-center 
            bg-gradient-to-b from-[#1e293b] to-[#0f172a] 
            transform transition-transform duration-300 hover:translate-z-6 shadow-bottom-inner"
          >
            <div
              className="h-3/4 w-[55%]   bg-black rounded-full 
              shadow-neon-blue transform transition-all duration-300 hover:scale-105 pulse-avatar"
            >
              {/* Avatar content could go here */}
            </div>
          </div>

          {/* Team members section */}
          <div className="h-[65%] w-full bg-[#111827] p-6 transform transition-transform duration-300 hover:translate-z-2">
            <div
              className="h-full w-full rounded-xl p-4 bg-gradient-to-br from-slate-900/80 to-slate-800/50 
              backdrop-blur-sm overflow-auto custom-scrollbar shadow-inner-subtle"
            >
              <div className="flex items-center gap-2 mb-4">
                <Users size={20} className="text-purple-400" />
                <h2
                  className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                  from-purple-400 to-pink-400"
                >
                  Members:
                </h2>
              </div>
              <div className="space-y-3">
                {project.team_members.map((member, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-700/30
                      transform transition-all duration-200 hover:translate-x-1 hover:shadow-neon-purple-sm
                      hover:from-slate-800/70 hover:to-slate-700/50"
                  >
                    <p className="font-medium">{member}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-right">
                <p className="text-sm text-cyan-300/80">Year: {project.year_done}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDescription
