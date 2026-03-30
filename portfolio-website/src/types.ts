export type AccentColor = 'blue' | 'violet' | 'cyan' | 'red'

export interface Project {
  id: string
  number: string
  title: string
  category: string
  year: string
  summary: string
  challenge: string
  contribution: string
  impact: string
  stack: string[]
  repo?: string
  accent: AccentColor
  buildNote: string
}

export interface ResearchItem {
  id: string
  number: string
  title: string
  status: 'Active' | 'Building' | 'Exploring' | 'In Progress'
  summary: string
  tags: string[]
}

export interface TimelineEntry {
  range: string
  title: string
  org: string
  detail: string
}

export interface Milestone {
  date: string
  title: string
  org: string
  detail: string
  type: 'education' | 'work' | 'cert'
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface PersonalInfo {
  name: string
  firstName: string
  lastName: string
  titleLine: string
  location: string
  email: string
  github: string
  githubHandle: string
  linkedin: string
  linkedinHandle: string
  status: string
  institution: string
  bio: string
  tape: string[]
}
