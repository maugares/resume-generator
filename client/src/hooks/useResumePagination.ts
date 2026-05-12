import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { ExperienceItem } from '../types'
import {
  buildPageIndexes,
  getPageCapacities,
  toPagedExperience,
} from '../components/resumePreview/pagination'

export const useResumePagination = ({
  name,
  experience,
}: {
  name: string
  experience: ExperienceItem[]
}) => {
  const [pageIndexes, setPageIndexes] = useState<number[][]>([[]])
  const [currentPage, setCurrentPage] = useState(1)

  const pageRefs = useRef<Array<HTMLElement | null>>([])
  const measureMainRef = useRef<HTMLElement | null>(null)
  const measureNameRef = useRef<HTMLHeadingElement | null>(null)
  const measureHeaderRef = useRef<HTMLHeadingElement | null>(null)
  const measureAddRef = useRef<HTMLDivElement | null>(null)
  const measureItemRefs = useRef<Array<HTMLDivElement | null>>([])

  useLayoutEffect(() => {
    const mainHeight = measureMainRef.current?.clientHeight ?? 0
    const nameHeight = measureNameRef.current?.clientHeight ?? 0
    const headerHeight = measureHeaderRef.current?.clientHeight ?? 0
    const addHeight = measureAddRef.current?.clientHeight ?? 0

    if (!mainHeight || !headerHeight) {
      return
    }

    const { firstPageCapacity, otherPageCapacity } = getPageCapacities({
      mainHeight,
      nameHeight,
      headerHeight,
      addHeight,
    })

    const itemHeights = experience.map((_, index) => {
      const measured = measureItemRefs.current[index]?.clientHeight ?? 0
      return Math.max(1, measured)
    })

    const pages = buildPageIndexes({
      itemHeights,
      firstPageCapacity,
      otherPageCapacity,
    })

    setPageIndexes(pages)
    setCurrentPage((prev) => Math.min(prev, pages.length))

    return () => {
      measureItemRefs.current = measureItemRefs.current.slice(
        0,
        experience.length
      )
    }
  }, [name, experience])

  useEffect(() => {
    const observedPages = pageRefs.current.filter(Boolean) as HTMLElement[]
    if (observedPages.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length === 0) {
          return
        }

        const pageNumber = Number(
          visible[0].target.getAttribute('data-page-number')
        )

        if (!Number.isNaN(pageNumber)) {
          setCurrentPage(pageNumber)
        }
      },
      {
        threshold: [0.35, 0.5, 0.75],
      }
    )

    observedPages.forEach((page) => observer.observe(page))

    return () => observer.disconnect()
  }, [pageIndexes.length])

  const pagedExperience = useMemo(() => {
    return toPagedExperience(pageIndexes, experience)
  }, [pageIndexes, experience])

  const totalPages = pagedExperience.length

  useEffect(() => {
    setCurrentPage((prev) => Math.max(1, Math.min(prev, totalPages)))
  }, [totalPages])

  return {
    currentPage,
    totalPages,
    pagedExperience,
    pageRefs,
    measureMainRef,
    measureNameRef,
    measureHeaderRef,
    measureAddRef,
    measureItemRefs,
  }
}
