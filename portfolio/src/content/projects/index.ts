import type { Project } from '../types'
import { cemetric } from './cemetric'
import { ledgerline } from './ledgerline'
import { northwind } from './northwind'
import { atlas } from './atlas'
import { sundry } from './sundry'

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECT REGISTRY
   ───────────────────────────────────────────────────────────────────────────
   To add a project: create a new file in this folder modelled on any existing
   one, import it here, and add it to the array. Order controls the order on
   the homepage. Nothing else needs to change — cards, filtering, routing and
   the full case-study page are all generated from this list.
   ═══════════════════════════════════════════════════════════════════════════ */

export const projects: Project[] = [cemetric, ledgerline, northwind, atlas, sundry]

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)

export const projectNeighbours = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: undefined, next: undefined }
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  }
}
