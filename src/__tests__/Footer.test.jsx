import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer'

describe('Footer', () => {
  it('renderuje nazwę firmy', () => {
    render(<Footer />)
    expect(screen.getByText('BudMaster Sp. z o.o.')).toBeInTheDocument()
  })

  it('renderuje numer telefonu', () => {
    render(<Footer />)
    expect(screen.getByText('+48 512 345 678')).toBeInTheDocument()
  })

  it('renderuje adres email', () => {
    render(<Footer />)
    expect(screen.getByText('kontakt@budmaster.pl')).toBeInTheDocument()
  })

  it('renderuje sekcję social media', () => {
    render(<Footer />)
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('Facebook')).toBeInTheDocument()
    expect(screen.getByText('YouTube')).toBeInTheDocument()
  })

  it('renderuje copyright', () => {
    render(<Footer />)
    expect(screen.getByText('© 2026 BudMaster')).toBeInTheDocument()
  })
})
