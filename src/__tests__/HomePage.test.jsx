import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import HomePage from '../pages/HomePage'

function renderPage() {
  return render(
    <AuthProvider>
      <CartProvider>
        <MemoryRouter initialEntries={['/']}>
          <HomePage />
        </MemoryRouter>
      </CartProvider>
    </AuthProvider>
  )
}

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renderuje nagłówek BudMaster', () => {
    renderPage()
    expect(screen.getAllByText('BudMaster').length).toBeGreaterThan(0)
  })

  it('renderuje link do sklepu', () => {
    renderPage()
    const links = screen.getAllByText('Sklep')
    expect(links.length).toBeGreaterThan(0)
  })

  it('renderuje sekcję konfiguratora', () => {
    renderPage()
    expect(screen.getByText('Konfigurator domku')).toBeInTheDocument()
  })

  it('renderuje sekcję opinii klientów', () => {
    renderPage()
    expect(screen.getByText('Opinie naszych klientów')).toBeInTheDocument()
  })

  it('renderuje 3 karty opinii', () => {
    renderPage()
    expect(screen.getByText('Jan K.')).toBeInTheDocument()
    expect(screen.getByText('Anna M.')).toBeInTheDocument()
    expect(screen.getByText('Piotr W.')).toBeInTheDocument()
  })

  it('renderuje footer', () => {
    renderPage()
    expect(screen.getByText('BudMaster Sp. z o.o.')).toBeInTheDocument()
  })
})
