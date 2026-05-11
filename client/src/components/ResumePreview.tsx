import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { EditableText, Avatar } from './ui'
import { ContactInfo, Education, Experience, Skills } from './sections'
import { useResumeContext } from '../context'
import type { ExperienceItem } from '../types'

const EXPERIENCE_GAP_PX = 40
const PAGE_FOOTER_RESERVE_PX = 28
const PAGINATION_SAFETY_BUFFER_PX = 56

const getDescriptionLines = (description: string[]) => {
  return description.length > 0 ? description : ['']
}

const buildPageIndexes = ({
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

export const ResumePreview = () => {
  const { formData, handleChange } = useResumeContext()
  const [pageIndexes, setPageIndexes] = useState<number[][]>([[]])
  const [currentPage, setCurrentPage] = useState(1)

  const pageRefs = useRef<Array<HTMLElement | null>>([])
  const measureMainRef = useRef<HTMLElement | null>(null)
  const measureNameRef = useRef<HTMLElement | null>(null)
  const measureHeaderRef = useRef<HTMLElement | null>(null)
  const measureAddRef = useRef<HTMLElement | null>(null)
  const measureItemRefs = useRef<Array<HTMLDivElement | null>>([])

  useLayoutEffect(() => {
    const mainHeight = measureMainRef.current?.clientHeight ?? 0
    const nameHeight = measureNameRef.current?.clientHeight ?? 0
    const headerHeight = measureHeaderRef.current?.clientHeight ?? 0
    const addHeight = measureAddRef.current?.clientHeight ?? 0

    if (!mainHeight || !headerHeight) {
      return
    }

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

    const itemHeights = formData.experience.map((_, index) => {
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
  }, [formData.name, formData.experience])

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
    const maxIndex = formData.experience.length
    const safePages = pageIndexes
      .map((indexes) => {
        const safeIndexes = indexes.filter(
          (index) => index >= 0 && index < maxIndex
        )
        return {
          indexes: safeIndexes,
          items: safeIndexes.map((index) => formData.experience[index]),
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
  }, [pageIndexes, formData.experience])

  const totalPages = pagedExperience.length

  useEffect(() => {
    setCurrentPage((prev) => Math.max(1, Math.min(prev, totalPages)))
  }, [totalPages])

  return (
    <div className="flex justify-center p-10 min-h-screen">
      <div className="w-a4 max-w-full">
        <div className="no-print sticky top-4 z-20 mb-4 flex justify-end">
          <div className="rounded-full bg-resume-slate px-4 py-2 text-xs font-bold tracking-wide text-white shadow">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        <div className="space-y-8">
          {pagedExperience.map((page, pageIndex) => {
            const pageNumber = pageIndex + 1
            const isFirstPage = pageIndex === 0
            const isLastPage = pageIndex === totalPages - 1

            return (
              <article
                key={pageNumber}
                data-page-number={pageNumber}
                ref={(el) => {
                  pageRefs.current[pageIndex] = el
                }}
                className="resume-page flex w-a4 h-a4 bg-white shadow-md print:m-0 print:shadow-none"
              >
                <aside className="w-[36%] bg-resume-slate text-white px-8 py-12 flex flex-col gap-10">
                  {isFirstPage ? (
                    <>
                      <Avatar />
                      <ContactInfo />
                      <Education />
                      <Skills />
                    </>
                  ) : (
                    <div className="no-print mt-auto text-center text-white/70">
                      <p className="text-[11px] uppercase tracking-[1px]">
                        Resume Preview
                      </p>
                      <p className="mt-1 text-sm font-semibold">
                        Continued on Page {pageNumber}
                      </p>
                    </div>
                  )}
                </aside>

                <main className="relative flex-1 p-14 text-resume-slate">
                  {isFirstPage && (
                    <EditableText
                      value={formData.name}
                      onChange={(v) => handleChange('name', v)}
                      className="text-[42px] font-extrabold uppercase mb-12 tracking-tight"
                      placeholder="YOUR NAME"
                    />
                  )}

                  <Experience
                    items={page.items}
                    itemIndexes={page.indexes}
                    showAddButton={isLastPage}
                    showHeader={isFirstPage}
                  />

                  <div className="no-print absolute bottom-4 right-6 text-[11px] font-semibold uppercase tracking-wide text-resume-slate/50">
                    Page {pageNumber} / {totalPages}
                  </div>
                </main>
              </article>
            )
          })}
        </div>
      </div>

      <div
        className="pointer-events-none fixed -left-[9999px] top-0 opacity-0"
        aria-hidden
      >
        <article className="flex w-a4 h-a4">
          <aside className="w-[36%]" />
          <main ref={measureMainRef} className="flex-1 p-14 text-resume-slate">
            <h1
              ref={measureNameRef}
              className="text-[42px] font-extrabold uppercase mb-12 tracking-tight"
            >
              {formData.name || 'YOUR NAME'}
            </h1>

            <section>
              <h3
                ref={measureHeaderRef}
                className="text-[14px] font-bold uppercase border-b border-resume-slate/20 pb-2 mb-4 tracking-[1px]"
              >
                Experience
              </h3>

              <div className="space-y-10">
                {formData.experience.map((exp: ExperienceItem, index) => (
                  <div
                    key={`measure-${index}`}
                    ref={(el) => {
                      measureItemRefs.current[index] = el
                    }}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <p className="text-[15px] font-bold">
                        {exp.position || 'Position'}
                      </p>
                      <p className="italic text-gray-400 font-medium">
                        {exp.startDate || 'Start'} - {exp.endDate || 'End'}
                      </p>
                    </div>
                    <p className="text-gray-500 italic mb-3">
                      {exp.company || 'Company'}
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {getDescriptionLines(exp.description).map(
                        (line, lineIndex) => (
                          <li key={lineIndex}>{line || 'Description'}</li>
                        )
                      )}
                    </ul>
                  </div>
                ))}
                <div ref={measureAddRef} className="text-sm font-bold">
                  + Add Experience
                </div>
              </div>
            </section>
          </main>
        </article>
      </div>
    </div>
  )
}
