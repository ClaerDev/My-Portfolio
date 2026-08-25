import { IconType } from "react-icons"

export interface MenuData {
  id: number
  label: string
  Icon: IconType
  Component: React.ComponentType
}

export interface ServiceData {
  id: number
  title: string
  description: string
  Icon: IconType
}

export interface ClientData {
  id: number
  name: string
  logoUrl: string
}

export interface TestimonialData {
  id: number
  quote: string
  userName: string
  userProfession: string
  userImage: { url: string }
}

export interface ExperienceData {
  id: string
  badge: string
  title: string
  subTitle: string
  desc: string
  experience: boolean
  logo?: { url: string }
}

export interface FieldValueData {
  id: string
  field: string
  value: string
}

export interface SkillData {
  id: string
  backEnd: FieldValueData[]
  frontEnd: FieldValueData[]
  knowledge: string[]
  languages: FieldValueData[]
}

export interface WorkData {
  id: string
  title: string
  description: string
  liveUrl: string
  githubUrl: string
  images: { url: string }[]
  technologies: string[]
  workTabs: { tab: string }[]
}

export interface ProfileData {
  name: string
  bio: string
  ownersPhoto: { url: string }
  bgImages: { url: string }[]
  cv: string
}

export interface PriceData {
  id: string
  title: string
  price: string
  features: string[]
}

export interface GuestBookData {
  id: string
  fullName: string
  message: string
  createdAt: string
  userImage: { url: string }
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  readTime: string
  coverImage: string
  tags: string[]
}

export interface StatItem {
  id: string
  label: string
  value: number
  suffix: string
  description: string
  Icon: import("react-icons").IconType
}

export interface TechStat {
  id: string
  name: string
  percentage: number
  color: string
}

export interface GithubStat {
  label: string
  value: string
  Icon: import("react-icons").IconType
}

// ── Admin Dashboard ──────────────────────────────────────────────────────────
export type AdminMessageType = "contact" | "booking"
export type AdminMessageStatus = "new" | "read" | "accepted"

export interface AdminMessage {
  id: string
  type: AdminMessageType
  status: AdminMessageStatus
  createdAt: string          // ISO string
  // contact fields
  fullName: string
  email: string
  message?: string
  // booking fields
  date?: string
  time?: string
  company?: string
  country?: string
  notes?: string
}
