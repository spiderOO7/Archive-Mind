import { BackgroundBeamsDemo } from "./components/elements/BeamsBackground";
import { useNavigate } from "react-router";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <BackgroundBeamsDemo>
      <div className="flex-col justify-center">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Welcome to Scholar-Safe
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          A database of projects and research papers of IIITL students.
          <br />
          Check for the existing ideas of students and the tech stacks they used
          in the projects and also the architecture of the project.
        </p>
        <button
          className="relative z-10 mt-4 bg-neutral-700 text-white py-2 px-6 rounded-full hover:bg-neutral-600 transition-colors duration-200 focus:ring-2 focus:ring-neutral-500 focus:outline-none mx-auto block"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </div>
    </BackgroundBeamsDemo>
  );
}
export default LandingPage;
