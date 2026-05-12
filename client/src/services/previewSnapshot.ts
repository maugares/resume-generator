const serializeStyle = (style: CSSStyleDeclaration): string => {
  return Array.from(style)
    .map((name) => `${name}:${style.getPropertyValue(name)};`)
    .join('')
}

const cloneWithInlineStyles = (source: HTMLElement): HTMLElement => {
  const clone = source.cloneNode(true) as HTMLElement

  const sourceElements = [
    source,
    ...Array.from(source.querySelectorAll<HTMLElement>('*')),
  ]
  const cloneElements = [
    clone,
    ...Array.from(clone.querySelectorAll<HTMLElement>('*')),
  ]

  sourceElements.forEach((element, index) => {
    const cloneElement = cloneElements[index]
    if (!cloneElement) {
      return
    }

    const computed = window.getComputedStyle(element)
    cloneElement.setAttribute('style', serializeStyle(computed))

    if (cloneElement.classList.contains('no-print')) {
      cloneElement.remove()
    }
  })

  return clone
}

export const buildPreviewSnapshotHtml = (): string | null => {
  if (typeof document === 'undefined') {
    return null
  }

  const pages = Array.from(
    document.querySelectorAll<HTMLElement>('.resume-page')
  )

  if (pages.length === 0) {
    return null
  }

  const pageHtml = pages
    .map((page) => {
      const clone = cloneWithInlineStyles(page)
      return clone.outerHTML
    })
    .join('\n')

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <style>
      @page {
        size: A4;
        margin: 0;
      }

      html,
      body {
        margin: 0;
        padding: 0;
        background: white;
      }

      .resume-page {
        page-break-after: always;
        break-after: page;
      }

      .resume-page:last-of-type {
        page-break-after: auto;
        break-after: auto;
      }
    </style>
  </head>
  <body>
${pageHtml}
  </body>
</html>`
}
