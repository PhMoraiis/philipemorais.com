'use client'

import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { Button } from '@/components/ui/button'
import { MultiStepLoader as Loader } from '@/components/ui/multi-step-loader'
import useProjectStore from '@/stores/projectStore'
import useTechStore from '@/stores/techStore'
import { useEffect } from 'react'

const Dashboard = () => {
  const { projects, loading: loadingProjects, setProjects, setLoading: setLoadingProjects, setError: setProjectError } = useProjectStore()
  const { techs, loading: loadingTechs, setTechs, setLoading: setLoadingTechs, setError: setTechError } = useTechStore()

  useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true)
      try {
        const response = await fetch('/api/projects')
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        setProjectError('Failed to fetch projects')
      } finally {
        // Simulating a loading timeout
        setTimeout(() => {
          setLoadingProjects(false)
        }, 12000) // Altere o tempo aqui, se necessário
      }
    }

    const fetchTechs = async () => {
      setLoadingTechs(true)
      try {
        const response = await fetch('/api/tech')
        const data = await response.json()
        setTechs(data)
      } catch (error) {
        setTechError('Failed to fetch techs')
      } finally {
        // Simulating a loading timeout
        setTimeout(() => {
          setLoadingTechs(false)
        }, 12000) // Altere o tempo aqui, se necessário
      }
    }

    fetchProjects()
    fetchTechs()
  }, [setProjects, setTechs, setLoadingProjects, setLoadingTechs, setProjectError, setTechError])

  const loading = loadingProjects || loadingTechs

  const loadingStates = [
    {
      text: 'Bem vindo ao OnPholio',
    },
    {
      text: 'Explorando novos horizontes',
    },
    {
      text: 'Preparando um café delicioso',
    },
    {
      text: 'Decifrando os segredos do universo',
    },
    {
      text: 'Fazendo algumas alterações no tempo',
    },
    {
      text: 'Preparando o palco',
    },
    {
      text: 'Coletando estrelas',
    },
    {
      text: 'Deixando as engrenagens girarem',
    },
  ]

  if (loading) {
    return (
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
    )
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] font-Relative">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Bem vindo de volta, Philipe!</h1>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              {projects.length === 0 && techs.length === 0 ? (
                <>
                  <h3 className="text-2xl font-bold tracking-tight">
                    Não há nenhum projeto ou tecnologia registrada.
                  </h3>
                  <p className="text-md text-muted-foreground">
                    Você pode começar adicionando um projeto.
                  </p>
                  <Button className="mt-4">Adicionar Projeto</Button>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold tracking-tight">
                    Você tem {projects.length} projetos e {techs.length} tecnologias registradas.
                  </h3>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
