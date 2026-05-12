import type { ExperienceItem } from '../../types'

const EXPERIENCE_GAP_PX = 40
const PAGE_FOOTER_RESERVE_PX = 28
const PAGINATION_SAFETY_BUFFER_PX = 56

export interface PaginationCapacities {
  firstPageCapacity: number
  otherPageCapacity: number
}

export interface PagedExperience {
  indexes: number[]
  items: ExperienceItem[]
}

export const getDescriptionLines = (description: string[]) => {
  return description.length > 0 ? description : ['']
}

export const getPageCapacities = ({
  mainHeight,
  nameHeight,
  headerHeight,
  addHeight,
}: {
  mainHeight: number
  nameHeight: number
  headerHeight: number
  addHeight: number
}): PaginationCapacities => {
  const firstPageCapacity = Math.max(
    1,
    mainHeight -
      nameHeight -
      headerHeight -
      addHeight -
      PAGE_FOOTER_RESERVE_PX -
      PAGINATION_SAFETY_BUFFER_PX
  )

  const otherPageCapacity = Math.max(
    1,
    mainHeight -
      headerHeight -
      addHeight -
      PAGE_FOOTER_RESERVE_PX -
      PAGINATION_SAFETY_BUFFER_PX
  )

  return {
    firstPageCapacity,
    otherPageCapacity,
  }
}

export const buildPageIndexes = ({
  itemHeights,
  firstPageCapacity,
  otherPageCapacity,
}: {
  itemHeights: number[]
  firstPageCapacity: number
  otherPageCapacity: number
}) => {
  if (itemHeights.length === 0) {
    return [[]]
  }

  const pages: number[][] = []
  let currentPage: number[] = []
  let remaining = firstPageCapacity
  let pageCapacity = firstPageCapacity

  itemHeights.forEach((height, index) => {
    const requiredSpace =
      currentPage.length > 0 ? EXPERIENCE_GAP_PX + height : height

    if (requiredSpace > remaining && currentPage.length > 0) {
      pages.push(currentPage)
      currentPage = [index]
      pageCapacity = otherPageCapacity
      remaining = pageCapacity - height
      return
    }

    currentPage.push(index)
    remaining -= requiredSpace
  })

  pages.push(currentPage)
  return pages
}

export const toPagedExperience = (
  pageIndexes: number[][],
  experience: ExperienceItem[]
): PagedExperience[] => {
  const maxIndex = experience.length

  const safePages = pageIndexes
    .map((indexes) => {
      const safeIndexes = indexes.filter(
        (index) => index >= 0 && index < maxIndex
      )

      return {
        indexes: safeIndexes,
        items: safeIndexes.map((index) => experience[index]),
      }
    })
    .filter((page) => page.items.length > 0)

  return safePages.length > 0
    ? safePages
    : [
        {
          indexes: [],
          items: [],
        },
      ]
}
