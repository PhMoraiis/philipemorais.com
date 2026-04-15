export const About = () => {
  return (
    <section className="mx-auto max-w-4xl pt-10 md:pt-12 md:pb-6">
      <h2 className="font-bethany text-2xl">Sobre Mim</h2>
      <div className="mt-6 flex flex-col items-start justify-center gap-4">
        <p className="mt-2 max-w-md font-dmsans text-base text-gray-200 md:text-md">
          Me chamo Philipe Morais, um desenvolvedor, designer e entusiasta de
          tecnologia. Atualmente sou estudante de Engenharia de Software na UnB
          e estagiário no Instituto Hardware BR. Mas estou sempre explorando as
          infinitas possibilidades da criatividade e da tecnologia.
        </p>
        <p className="mt-2 max-w-md font-dmsans text-base text-gray-200 md:text-md">
          Gosto de transformar ideias em realidade, seja criando interfaces
          digitais, prototipando experiências ou escrevendo código. Sou
          apaixonado por design e acredito que a tecnologia é uma ferramenta
          poderosa para contar histórias e criar grandes conexões.
        </p>
        <p className="mt-2 max-w-md font-dmsans text-base text-gray-200 md:text-md">
          Sou fundador da{" "}
          <a
            href="https://stellarbr.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Stellar Studio
          </a>
          , um estúdio de tecnologia, especializado em desenvolvimento de
          software e estratégia de social media, combinando toda a minha
          criatividade e experiência para proporcionar soluções incríveis.
        </p>
      </div>
    </section>
  );
};
