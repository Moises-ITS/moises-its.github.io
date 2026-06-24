export interface Project {
  id: string
  number: string
  title: string
  category: string
  year: string
  summary: string
  stack: string[]
  /** GitHub repo URL — update in data.ts when ready */
  repo: string
  /** Optional preview image — place file in public/projects/ then set path, e.g. `/projects/shpe-app.jpg` */
  image?: string
  accent: 'blue' | 'violet' | 'cyan' | 'red'
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
  emailMailto: string
  github: string
  githubHandle: string
  linkedin: string
  linkedinHandle: string
  status: string
  institution: string
  bio: string
}
