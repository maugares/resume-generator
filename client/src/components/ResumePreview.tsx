import { EditableText } from './EditableText'
import { ContactInfo } from './ContactInfo'
import { Education } from './Education'
import { Experience } from './Experience'
import { Avatar } from './Avatar'
import { Skills } from './Skills'
import { useResumeContext } from '../context/ResumeContext'

export const ResumePreview = () => {
  const { formData, handleChange } = useResumeContext()

  return (
    <div className="flex justify-center p-10 min-h-screen">
      <article
        id="resume-document"
        className="flex w-a4 h-a4 bg-white  print:m-0 print:shadow-none"
      >
        <aside className="w-[36%] bg-resume-slate text-white px-8 py-12 flex flex-col gap-10">
          <Avatar />
          <ContactInfo />
          <Education />
          <Skills />
        </aside>

        <main className="flex-1 p-14 text-resume-slate">
          <EditableText
            value={formData.name}
            onChange={(v) => handleChange('name', v)}
            className="text-[42px] font-extrabold uppercase mb-12 tracking-tight"
            placeholder="YOUR NAME"
          />

          <Experience />
        </main>
      </article>
    </div>
  )
}
