import type { RefObject } from 'react'
import type { ExperienceItem } from '../../types'
import { getDescriptionLines } from './pagination'

interface HiddenMeasurementPageProps {
  name: string
  experience: ExperienceItem[]
  measureMainRef: RefObject<HTMLElement | null>
  measureNameRef: RefObject<HTMLHeadingElement | null>
  measureHeaderRef: RefObject<HTMLHeadingElement | null>
  measureAddRef: RefObject<HTMLDivElement | null>
  measureItemRefs: RefObject<Array<HTMLDivElement | null>>
}

export const HiddenMeasurementPage = ({
  name,
  experience,
  measureMainRef,
  measureNameRef,
  measureHeaderRef,
  measureAddRef,
  measureItemRefs,
}: HiddenMeasurementPageProps) => {
  return (
    <div
      className="pointer-events-none fixed -left-2499.75 top-0 opacity-0"
      aria-hidden
    >
      <article className="flex w-a4 h-a4">
        <aside className="w-[36%]" />
        <main ref={measureMainRef} className="flex-1 p-14 text-resume-slate">
          <h1
            ref={measureNameRef}
            className="text-[42px] font-extrabold uppercase mb-12 tracking-tight"
          >
            {name || 'YOUR NAME'}
          </h1>

          <section>
            <h3
              ref={measureHeaderRef}
              className="text-[14px] font-bold uppercase border-b border-resume-slate/20 pb-2 mb-4 tracking-[1px]"
            >
              Experience
            </h3>

            <div className="space-y-10">
              {experience.map((exp: ExperienceItem, index) => (
                <div
                  key={`measure-${index}`}
                  ref={(el) => {
                    measureItemRefs.current[index] = el
                  }}
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <p className="text-[16px] leading-tight font-bold">
                      {exp.position || 'Position'}
                    </p>
                    <p className="text-[16px] leading-tight text-black font-medium">
                      {exp.startDate || 'Start'} - {exp.endDate || 'End'}
                    </p>
                  </div>
                  <p className="text-[15px] leading-tight text-black italic mb-3">
                    {exp.company || 'Company'}
                  </p>
                  <ul className="list-disc pl-5 space-y-0.5 text-[16px] leading-tight text-black">
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
  )
}
