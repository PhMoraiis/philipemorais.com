import { create } from 'zustand'

interface TechState {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  techs: any[];
  loading: boolean;
  error: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  addTech: (tech: any) => void;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  setTechs: (techs: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

const useTechStore = create<TechState>((set) => ({
  techs: [],
  loading: true,
  error: '',
  addTech: (tech) => set((state) => ({ techs: [...state.techs, tech] })),
  setTechs: (techs) => set({ techs }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))

export default useTechStore
