import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import Header from '../components/Header'

function renderWithProviders(ui) {
  return render(
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renderuje logo BudMaster', () => {
    renderWithProviders(<Header />)
    expect(screen.getByText('BudMaster')).toBeInTheDocument()
  })

  it('renderuje link Sklep', () => {
    renderWithProviders(<Header />)
    expect(screen.getByText('Sklep')).toBeInTheDocument()
  })

  it('renderuje link Konfigurator', () => {
    renderWithProviders(<Header />)
    expect(screen.getByText('Konfigurator')).toBeInTheDocument()
  })

  it('renderuje link logowania gdy niezalogowany', () => {
    renderWithProviders(<Header />)
    expect(screen.getByText('Logowanie / Rejestracja')).toBeInTheDocument()
  })

  it('nie renderuje Koszyk/Wyloguj gdy niezalogowany', () => {
    renderWithProviders(<Header />)
    expect(screen.queryByText('Wyloguj')).not.toBeInTheDocument()
    expect(screen.queryByText(/Koszyk/)).not.toBeInTheDocument()
  })
})
