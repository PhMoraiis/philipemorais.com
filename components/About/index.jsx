import Image from "next/image";
import Link from "next/link";

const About = () => {



  return (
    <div id="about" className="w-full md:h-screen p-2 flex items-center py-16">
      <div className="max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <p className="uppercase text-xl tracking-widest text-[#4a9b7f]">Sobre Mim</p>
          <h2 className="py-4">Descubra Mais</h2>

          <p className="py-2 text-gray-600">// Desenvolvedor Front-end em Brasília-DF, Brasil.</p>

          <p className="py-2 text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat vitae deserunt natus, rem odit sit provident perferendis accusamus ea voluptatem quo nobis itaque distinctio voluptates aut corporis repudiandae, molestias labore.</p>

          <p className="py-2 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, eos reprehenderit? In error inventore, ullam, fuga numquam, est eum illo esse at delectus nostrum vero aut repellat mollitia minima dolor?</p>
          <Link href="">
            <p className="py-2 text-gray-600 underline cursor-pointer">Veja alguns dos meus principais projetos</p>
          </Link>
        </div>
        <div className="w-full h-auto m-auto shadow-xl shadow-gray-400 flex items-center justify-center p-4 hover:scale-105 ease-in duration-300 rounded-full">
          <Image
            src={'/images/Image1.png'}
            alt={'Imagem do Philipe'}
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export { About };