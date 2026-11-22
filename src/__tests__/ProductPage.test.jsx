import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import ProductPage from '../pages/ProductPage'

function renderPage(productId = '1') {
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

describe('ProductPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renderuje dane produktu dla id=1', () => {
    renderPage('1')
    expect(screen.getByText('Młotek ślusarski 500g')).toBeInTheDocument()
    expect(screen.getAllByText(/Narzędzia ręczne/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/45\.99 zł/)).toBeInTheDocument()
  })

  it('wyświetla błąd gdy produkt nie istnieje', () => {
    renderPage('9999')
    expect(screen.getByText('Produkt nie znaleziony.')).toBeInTheDocument()
  })

  it('wymaga zalogowania przed dodaniem do koszyka', () => {
    renderPage('1')
    const addBtn = screen.getByTestId('add-to-cart')
    fireEvent.click(addBtn)
    expect(screen.getByText('Zaloguj się, aby dodać do koszyka')).toBeInTheDocument()
  })

  it('wymaga zalogowania przed dodaniem opinii', () => {
    renderPage('1')
    const textarea = screen.getByTestId('review-textarea')
    fireEvent.change(textarea, { target: { value: 'Dobra jakość' } })
    const submitBtn = screen.getByText('Opublikuj')
    fireEvent.click(submitBtn)
    expect(screen.getByText('Zaloguj się, aby napisać opinię')).toBeInTheDocument()
  })

  it('zmienia ilość dodawanego produktu', () => {
    renderPage('1')
    const countInput = screen.getByLabelText(/Ilość:/)
    fireEvent.change(countInput, { target: { value: '4' } })
    expect(countInput.value).toBe('4')
  })
})
