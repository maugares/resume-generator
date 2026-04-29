import { cssStyles } from '../cssStyles'
import * as fs from 'fs'

// Mocking 'fs' or virtual modules in Vitest
vi.mock('fs', () => ({
  default: {
    readFileSync: vi.fn().mockReturnValue('body { margin: 0; padding: 0; }'),
  },
}))

describe('cssStyles', () => {
  it('should be a non-empty string', () => {
    expect(typeof cssStyles).toBe('string')
    expect(cssStyles.length).toBeGreaterThan(0)
  })

  it('should contain valid CSS content', () => {
    expect(cssStyles).toContain('body')
    expect(cssStyles).toContain('margin')
    expect(cssStyles).toContain('padding')
  })
})
