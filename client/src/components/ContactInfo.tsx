import { EditableText } from './EditableText'
import { Header } from './Header'
import { useResumeContext } from '../context/ResumeContext'

export function ContactInfo() {
  const { formData, handleChange } = useResumeContext()

  return (
    <section>
      <Header title="Contact" />
      <div className="space-y-2">
        <EditableText
          value={formData.phone}
          onChange={(v) => handleChange('phone', v)}
          placeholder="Phone"
        />
        <EditableText
          value={formData.email}
          onChange={(v) => handleChange('email', v)}
          placeholder="Email"
          className="break-all"
        />
        <EditableText
          value={formData.address}
          onChange={(v) => handleChange('address', v)}
          placeholder="Address"
        />
      </div>
    </section>
  )
}
