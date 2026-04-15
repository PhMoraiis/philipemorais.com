export const Header = () => {
  const texts = {
    name: "Philipe",
    lastName: "Morais",
    description:
      "Sou um desenvolvedor Front-end & UX/UI Designer que deseja contribuir para tornar a internet um lugar mais criativo, acessível e melhor.",
  };

  return (
    <header className="mx-auto max-w-4xl pt-8 md:pt-11">
      <div className="flex flex-col items-start justify-center">
        <h1 className="font-bethany text-4xl text-white leading-tight md:text-5xl">
          {texts.name}
          <br />
          {texts.lastName}
        </h1>
        <p className="mt-2 max-w-md font-dmsans text-base text-gray-200 md:text-md">
          {texts.description}
        </p>
      </div>
    </header>
  );
};
