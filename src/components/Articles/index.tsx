const Articles = () => {
  const cardStyle = {
    backgroundImage: 'url(\'/images/Group 2.png\')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className="flex flex-col w-[90vw] lg:w-[30vw] h-[50vh] lg:h-[50vh] rounded-xl overflow-hidden relative glass">
      <div className="h-1/2" style={cardStyle}></div>
      <div className="dark:bg-dark-300 bg-light-100 text-dark-100 dark:text-light-100 p-6 h-1/2">
        <div className="flex flex-col items-start gap-y-3 h-full">
          <span className="text-md uppercase tracking-wider font-visageBd">Tópico</span>
          <h2 className="text-lg font-bold">Título do Artigo</h2>
          <p className="text-sm">Descrição do artigo. Pode ser uma breve introdução ao conteúdo.</p>
          <span className="text-xs">Data de Publicação: 28 de Janeiro de 2024</span>
        </div>
      </div>
    </div>
  )
}

export default Articles
