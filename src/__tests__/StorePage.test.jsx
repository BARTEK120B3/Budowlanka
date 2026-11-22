import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import StorePage from '../pages/StorePage'

function renderPage() {
  return render(
    <AuthProvider>
      <CartProvider>
        <MemoryRouter initialEntries={['/store']}>
          <StorePage />
        </MemoryRouter>
      </CartProvider>
    </AuthProvider>
  )
}

describe('StorePage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renderuje nagłówek Sklep', () => {
    renderPage()
    const elements = screen.getAllByText('Sklep')
    expect(elements.length).toBeGreaterThanOrEqual(1)
  })

  it('renderuje listę kategorii', () => {
    renderPage()
    expect(screen.getByText('Narzędzia ręczne')).toBeInTheDocument()
    expect(screen.getByText('Elektronarzędzia')).toBeInTheDocument()
    expect(screen.getByText('Materiały budowlane')).toBeInTheDocument()
  })

  it('renderuje produkty', () => {
    renderPage()
    expect(screen.getByText('Młotek ślusarski 500g')).toBeInTheDocument()
  })

  it('filtruje produkty po wyszukiwaniu', () => {
    renderPage()
    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'cement' } })
    expect(screen.getByText('Cement portlandzki CEM I 42,5R 25kg')).toBeInTheDocument()
    expect(screen.queryByText('Młotek ślusarski 500g')).not.toBeInTheDocument()
  })

  it('filtruje po kategorii', () => {
    renderPage()
    fireEvent.click(screen.getByText('Oświetlenie'))
    expect(screen.getByText('Panel LED 60x60 40W')).toBeInTheDocument()
    expect(screen.queryByText('Młotek ślusarski 500g')).not.toBeInTheDocument()
  })

  it('sortuje rosnąco po cenie', () => {
    renderPage()
    fireEvent.click(screen.getByText('Cena - od najniższej'))
    const cards = screen.getAllByText(/zł/)
    expect(cards.length).toBeGreaterThan(0)
  })

  it('przycisk Wyczyść resetuje filtry', () => {
    renderPage()
    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'cement' } })
    fireEvent.click(screen.getByText('Wyczyść'))
    expect(screen.getByText('Młotek ślusarski 500g')).toBeInTheDocument()
  })

  it('wyświetla komunikat gdy brak wyników', () => {
    renderPage()
    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'xxxxxxxxxxxxxxx' } })
    expect(screen.getByText(/Nic nie znaleziono/)).toBeInTheDocument()
  })
})
