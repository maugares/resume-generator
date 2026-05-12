import { Avatar, EditableText } from '../ui'
import {
  ContactInfo,
  Education,
  Experience,
  Languages,
  Skills,
} from '../sections'
import type { PagedExperience } from './pagination'

interface ResumePageProps {
  pageNumber: number
  totalPages: number
  isFirstPage: boolean
  isLastPage: boolean
  name: string
  onNameChange: (value: string) => void
  pageData: PagedExperience
  setPageRef: (el: HTMLElement | null) => void
}

export const ResumePage = ({
  pageNumber,
  totalPages,
  isFirstPage,
  isLastPage,
  name,
  onNameChange,
  pageData,
  setPageRef,
}: ResumePageProps) => {
  return (
    <article
      data-page-number={pageNumber}
      ref={setPageRef}
      className="resume-page flex w-a4 h-a4 bg-white shadow-md print:m-0 print:shadow-none"
    >
      <aside className="w-[36%] bg-resume-slate text-white px-8 py-12 flex flex-col gap-10">
        {isFirstPage ? (
          <>
            <Avatar />
            <ContactInfo />
            <Education />
            <Languages />
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
            value={name}
            onChange={onNameChange}
            className="text-[42px] font-extrabold uppercase mb-12 tracking-tight"
            placeholder="YOUR NAME"
          />
        )}

        <Experience
          items={pageData.items}
          itemIndexes={pageData.indexes}
          showAddButton={isLastPage}
          showHeader={isFirstPage}
        />

        <div className="no-print absolute bottom-4 right-6 text-[11px] font-semibold uppercase tracking-wide text-resume-slate/50">
          Page {pageNumber} / {totalPages}
        </div>
      </main>
    </article>
  )
}
