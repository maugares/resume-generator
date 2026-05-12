const collectDocumentCss = (): string => {
  const cssChunks: string[] = []

  for (const sheet of Array.from(document.styleSheets)) {
    try {
      const rules = (sheet as CSSStyleSheet).cssRules
      for (const rule of Array.from(rules)) {
        cssChunks.push(rule.cssText)
      }
    } catch {
      // Ignore stylesheets we cannot read (e.g. cross-origin restrictions).
    }
  }

  return cssChunks.join('\n')
}

const clonePageForPrint = (source: HTMLElement): HTMLElement => {
  const clone = source.cloneNode(true) as HTMLElement

  clone
    .querySelectorAll<HTMLElement>('.no-print')
    .forEach((element) => element.remove())

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

  const cssText = collectDocumentCss()

  const pageHtml = pages
    .map((page) => {
      const clone = clonePageForPrint(page)
      return clone.outerHTML
    })
    .join('\n')

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <style>
      ${cssText}

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

      * {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .resume-page {
        width: 210mm;
        min-height: 297mm;
        page-break-after: always;
        break-after: page;
        overflow: hidden;
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
