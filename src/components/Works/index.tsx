import WorkCards from '../WorkCards'

const Works = () => {
  return (
    <section className="flex flex-col items-start justify-center text-dark-100 dark:text-light-200 bg-light-100 dark:bg-dark-100">
      <div>
        <h2 className="text-3xl font-visageBd">Trabalhos Recentes</h2>
      </div>
      <div className="flex flex-col items-center justify-center py-4">
        <div className="flex items-center justify-center gap-x-10">
          <WorkCards />
          <WorkCards />
          <WorkCards />
          <WorkCards />
          <WorkCards />
        </div>
      </div>
    </section>
  )
}

export default Works