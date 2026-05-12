import { render } from '@testing-library/react'
import { Avatar } from '../Avatar'

describe('Avatar', () => {
  it('renders a circular avatar element', () => {
    const { container } = render(<Avatar />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
