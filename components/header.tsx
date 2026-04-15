export const Header = () => {
  const texts = {
    name: "Philipe",
    lastName: "Morais",
    description:
      "Sou um desenvolvedor front-end que deseja contribuir para tornar a internet um lugar mais criativo, acessível e melhor.",
  };

  return (
    <header className="mx-auto max-w-4xl md:pt-11">
      <h1 className="mb-4 text-4xl text-gray-900 leading-tight dark:text-gray-100">
        {texts.name}
        <br />
        {texts.lastName}
      </h1>
      <p className="max-w-md font-medium font-sans text-gray-700 text-md dark:text-gray-300">
        {texts.description}
      </p>
    </header>
  );
};
