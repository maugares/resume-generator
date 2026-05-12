import { afterEach, describe, expect, it } from 'vitest'
import { buildPreviewSnapshotHtml } from '../previewSnapshot'

afterEach(() => {
  document.head.innerHTML = ''
  document.body.innerHTML = ''
})

describe('buildPreviewSnapshotHtml', () => {
  it('returns null when no preview pages exist', () => {
    expect(buildPreviewSnapshotHtml()).toBeNull()
  })

  it('builds printable html using document css and removes no-print nodes', () => {
    const style = document.createElement('style')
    style.textContent = '.resume-page{display:flex}.accent{color:red}'
    document.head.appendChild(style)

    document.body.innerHTML = `
      <article class="resume-page">
        <p class="accent">Visible text</p>
        <div class="no-print">Should not be present</div>
      </article>
    `

    const html = buildPreviewSnapshotHtml()

    expect(html).not.toBeNull()
    expect(html).toContain('Visible text')
    expect(html).not.toContain('Should not be present')
    expect(html).toContain('@page')
    expect(html).toContain('print-color-adjust: exact')
    expect(html).toContain('.resume-page')
    expect(html).toMatch(/accent/)
  })

  it('includes all rendered resume pages in the snapshot', () => {
    document.body.innerHTML = `
      <article class="resume-page"><span>Page A</span></article>
      <article class="resume-page"><span>Page B</span></article>
    `

    const html = buildPreviewSnapshotHtml()

    expect(html).not.toBeNull()
    expect(html).toContain('Page A')
    expect(html).toContain('Page B')
  })
})
