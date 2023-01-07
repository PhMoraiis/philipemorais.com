import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <p>Volte para a página <Link href="/"><a>Inicial</a></Link></p>
    </div>
  );
};

export default NotFound;