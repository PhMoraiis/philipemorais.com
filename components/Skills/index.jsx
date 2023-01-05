import Image from "next/image";
import { Skill } from "./Skill";

const Skills = () => {
  return (
    <div id="skills" className="w-full lg:h-screen p-2">
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
        <p className="text-xl tracking-widest uppercase text-[#4a9b7f]">Skills</p>
        <h2 className="py-4">what i can do</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Skill />
        <Skill />
        <Skill />
        <Skill />
        <Skill />
        <Skill />
        <Skill />
        <Skill />
        </div>
      </div>
    </div>
  );
}

export { Skills };