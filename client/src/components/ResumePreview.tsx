import { ResumePage } from './resumePreview/ResumePage'
import { HiddenMeasurementPage } from './resumePreview/HiddenMeasurementPage'
import { useResumePagination } from '../hooks'
import { useResumeContext } from '../context'

export const ResumePreview = () => {
  const { formData, handleChange } = useResumeContext()
  const {
    currentPage,
    totalPages,
    pagedExperience,
    pageRefs,
    measureMainRef,
    measureNameRef,
    measureHeaderRef,
    measureAddRef,
    measureItemRefs,
  } = useResumePagination({
    name: formData.name,
    experience: formData.experience,
  })

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
              <ResumePage
                key={pageNumber}
                pageNumber={pageNumber}
                totalPages={totalPages}
                isFirstPage={isFirstPage}
                isLastPage={isLastPage}
                name={formData.name}
                onNameChange={(value) => handleChange('name', value)}
                pageData={page}
                setPageRef={(el) => {
                  pageRefs.current[pageIndex] = el
                }}
              />
            )
          })}
        </div>
      </div>

      <HiddenMeasurementPage
        name={formData.name}
        experience={formData.experience}
        measureMainRef={measureMainRef}
        measureNameRef={measureNameRef}
        measureHeaderRef={measureHeaderRef}
        measureAddRef={measureAddRef}
        measureItemRefs={measureItemRefs}
      />
    </div>
  )
}
