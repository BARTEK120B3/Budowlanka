import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import ProductPage from '../pages/ProductPage'

function renderPage(productId = '1', user = null) {
  if (user) {
    localStorage.setItem('budowlany_user', JSON.stringify(user))
  }
  return render(
    <AuthProvider>
      <CartProvider>
        <MemoryRouter initialEntries={[`/product/${productId}`]}>
          <Routes>
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    </AuthProvider>
  )
}

describe('Testy karty produktu (ProductPage)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('poprawnie ładuje dane produktu (młotek id=1)', () => {
    renderPage('1')
    expect(screen.getByText('Młotek ślusarski 500g')).toBeInTheDocument()
    expect(screen.getAllByText(/Narzędzia ręczne/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/45\.99 zł/)).toBeInTheDocument()
  })

  it('wyświetla odpowiednią ikonę kategorii zamiast twardo wbitego dźwigu', () => {
    renderPage('1')
    // Młotek (kategoria Narzędzia ręczne) powinien mieć ikonę 🔨
    expect(screen.getByTestId('product-icon')).toHaveTextContent('🔨')
  })

  it('wiertarka ma inną właściwą ikonę elektronarzędzi (⚡)', () => {
    renderPage('2')
    expect(screen.getByTestId('product-icon')).toHaveTextContent('⚡')
  })

  it('pokazuje komunikat błędu gdy podamy nieistniejące ID produktu', () => {
    renderPage('9999')
    expect(screen.getByText('Produkt nie znaleziony.')).toBeInTheDocument()
    expect(screen.getByText('Wróć do sklepu')).toBeInTheDocument()
  })

  it('blokuje dodanie do koszyka niezalogowanemu użytkownikowi', () => {
    renderPage('1')
    const addBtn = screen.getByTestId('add-to-cart')
    fireEvent.click(addBtn)
    expect(screen.getByText('Zaloguj się, aby dodać do koszyka')).toBeInTheDocument()
  })

  it('dodaje produkt do koszyka gdy użytkownik jest zalogowany', () => {
    renderPage('1', { id: 1, name: 'Tomek', email: 'tomek@test.pl' })
    const addBtn = screen.getByTestId('add-to-cart')
    fireEvent.click(addBtn)
    expect(screen.getByText('Dodano do koszyka!')).toBeInTheDocument()
  })

  it('pozwala zalogowanemu użytkownikowi dodać nową opinię o produkcie', () => {
    renderPage('1', { id: 1, name: 'Tomek', email: 'tomek@test.pl' })
    const textarea = screen.getByTestId('review-textarea')
    fireEvent.change(textarea, { target: { value: 'Bardzo porządny młotek, polecam do warsztatu!' } })
    const submitBtn = screen.getByText('Opublikuj')
    fireEvent.click(submitBtn)

    expect(screen.getByText('Bardzo porządny młotek, polecam do warsztatu!')).toBeInTheDocument()
    expect(screen.getAllByText('Tomek').length).toBeGreaterThanOrEqual(2)
  })

  it('pozwala zmienić liczbę zamawianych sztuk w polu numerycznym', () => {
    renderPage('1')
    const countInput = screen.getByLabelText(/Ilość:/)
    fireEvent.change(countInput, { target: { value: '4' } })
    expect(countInput.value).toBe('4')
  })
})
