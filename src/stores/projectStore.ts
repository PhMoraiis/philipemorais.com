import { create } from 'zustand'

interface ProjectState {
  projects: any[];
  loading: boolean;
  error: string;
  setProjects: (projects: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  loading: true,
  error: '',
  setProjects: (projects) => set({ projects }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))

export default useProjectStore
