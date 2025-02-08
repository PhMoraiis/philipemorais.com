import type { ITech } from "../Techs/createTech"

export interface IProject {
  title: string
  description: string
  href: string
  initial_date: Date
  final_date: Date
  icon: string
  image: string
  techs: ITech[]
}