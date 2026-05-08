/* client/src/components/Skills.tsx */
import { EditableText } from './EditableText'
import { Header } from './Header'
import { useResumeContext } from '../context/ResumeContext'

export function Skills() {
  const { formData, handleChange } = useResumeContext()

  return (
    <section>
      <Header title="Skills" />
      <EditableText
        value={formData.skills}
        onChange={(v) => handleChange('skills', v)}
        placeholder="Design, Development, UI/UX..."
        className="text-[13px] leading-relaxed text-gray-100"
      />
    </section>
  )
}
