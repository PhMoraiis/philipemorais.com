import { Skill } from "./Skill";
import { motion } from "framer-motion";

const Skills = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
      }}
      id="skills"
      className="w-full lg:h-screen p-2">
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
        <p className="text-xl tracking-widest uppercase text-[#4a9b7f]">Habilidades</p>
        <h2 className="py-4">Minha Stack</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Skill src={'https://cdn.cdnlogo.com/logos/h/84/html.svg'} alt={'Logo HTML'} name={'HTML'} />
          <Skill src={'https://cdn.cdnlogo.com/logos/c/18/css.svg'} alt={'CSS Logo'} name={'CSS'} />
          <Skill src={'https://cdn.cdnlogo.com/logos/b/74/bootstrap-5.svg'} alt={'Bootstrap Logo'} name={'Bootstrap'} />
          <Skill src={'https://cdn.cdnlogo.com/logos/t/58/tailwindcss.svg'} alt={'Tailwind CSS Logo'} name={'Tailwind CSS'} />
          <Skill src={'https://cdn.cdnlogo.com/logos/j/33/javascript.svg'} alt={'JavaScript Logo'} name={'Javascript'} />
          <Skill src={'https://cdn.cdnlogo.com/logos/t/96/typescript.svg'} alt={'Typescript Logo'} name={'Typescript'} />
          <Skill src={'https://cdn.cdnlogo.com/logos/n/94/nodejs-icon.svg'} alt={'NodeJS Logo'} name={'NodeJS'} />
          <Skill src={'https://cdn.cdnlogo.com/logos/r/63/react.svg'} alt={'ReactJS Logo'} name={'ReactJS'} />
          <Skill src={'https://cdn.cdnlogo.com/logos/n/80/next-js.svg'} alt={'NextJS Logo'} name={'NextJS'} />
          <Skill src={'https://cdn.cdnlogo.com/logos/a/51/angular.svg'} alt={'Angular Logo'} name={'Angular'} />
          <Skill src={'https://cdn.cdnlogo.com/logos/p/3/python.svg'} alt={'Python Logo'} name={'Python'} />
          <Skill src={'https://cdn.cdnlogo.com/logos/g/55/github.svg'} alt={'GitHub Logo'} name={'GitHub'} />
        </div>
      </div>
    </motion.div>
  );
}

export { Skills };
