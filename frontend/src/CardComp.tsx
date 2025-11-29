import { IconChartDots3Filled } from "@tabler/icons-react";

const CardComp = ({
    idx,
    project_description,
    project_title,
    team_members,
    tech_stack,
    year_done,
    setView,
    setId
}: {
    idx: number,
    project_description: string,
    project_title: string,
    team_members: Array<string>,
    tech_stack: Array<string>,
    year_done: number,
    setView: React.Dispatch<React.SetStateAction<boolean>>,
    setId: React.Dispatch<React.SetStateAction<number>>
}) => {
  // console.log(project_description)
    return (
        <div className="bg-black text-white p-6 rounded-[40px] flex flex-col md:flex-row gap-6 max-w-2xl mx-auto h-[500px] w-[40%] " style={{paddingTop:"30px"}}>
          <button onClick={()=>{setView(true);setId(idx)}} className="flex flex-row gap-6 w-full h-full">
          {/* Project Description */}
          <div className="flex-1  p-6 rounded-xl  flex flex-col items-center text-center  w-1/2 h-[98%]  " style={{background:'rgba(42, 42, 42, 0.8)'}}>
            <div className="text-5xl mb-4 text-[48px]"><IconChartDots3Filled size={64} /></div>
            <h2 className="text-xl font-bold mb-4">{project_title}-{year_done}</h2>
            <p className="text-sm leading-relaxed overflow-hidden">
            {project_description}
            </p>
          </div>
    
          {/* Right Section */}
          <div className="flex-1 flex flex-col gap-6 w-1/2 h-[98%] ">
            {/* Tech Stack */}
            <div className="bg-[#1a1a1a] p-6 rounded-md h-1/2 w-full " style={{background:'rgba(42, 42, 42, 0.8)'}} >
              <h2 className="text-xl font-bold mb-2">TECH STACK</h2>
              <p className="text-sm leading-relaxed">
                {tech_stack.join(", ")}
              </p>
            </div>
    
            {/* Members */}
            <div className="bg-[#1a1a1a] p-6 rounded-md h-1/2 w-full " style={{background:'rgba(42, 42, 42, 0.8)'}} >
              <h2 className="text-xl font-bold mb-2">MEMBERS</h2>
              <p className="text-sm leading-relaxed">
                {team_members.join(",")}
              </p>
            </div>
          </div>
          </button>
        </div>
      );
};

export default CardComp;

