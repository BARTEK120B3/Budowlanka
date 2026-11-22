import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider, useCart } from '../context/CartContext'
import CheckoutPage from '../pages/CheckoutPage'
import { useEffect } from 'react'

// helper - dodaje produkty do koszyka przed renderem
function SetupCart({ children }) {
  const { addToCart } = useCart()
  useEffect(() => {
    addToCart({ id: 1, name: 'Młotek ślusarski 500g', price: 45.99, categoryId: 1 }, 2)
    addToCart({ id: 2, name: 'Cement portlandzki', price: 22.5, categoryId: 3 }, 1)
  }, [])
  return children
}

function renderCheckout(user = { id: 1, name: 'Jan', email: 'jan@test.pl' }, withItems = false) {
  if (user) {
    localStorage.setItem('budowlany_user', JSON.stringify(user))
  }
  return render(
    <AuthProvider>
      <CartProvider>
        <MemoryRouter initialEntries={['/checkout']}>
          <Routes>
            <Route
              path="/checkout"
              element={
                withItems ? (
                  <SetupCart><CheckoutPage /></SetupCart>
                ) : (
                  <CheckoutPage />
                )
              }
            />
            <Route path="/login" element={<div>Login</div>} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    </AuthProvider>
  )
}

describe('CheckoutPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('przekierowuje na login gdy niezalogowany', () => {
    renderCheckout(null)
    // nie powinno renderować formularza checkoutu
    expect(screen.queryByTestId('checkout-title')).not.toBeInTheDocument()
  })

  it('wyświetla komunikat o pustym koszyku', () => {
    renderCheckout()
    expect(screen.getByText('Koszyk jest pusty')).toBeInTheDocument()
    expect(screen.getByText('Przejdź do sklepu')).toBeInTheDocument()
  })

  it('renderuje formularz z danymi usera dla zalogowanego z produktami', () => {
    renderCheckout({ id: 1, name: 'Jan Kowalski', email: 'jan@test.pl' }, true)
    expect(screen.getByTestId('checkout-title')).toHaveTextContent('Podsumowanie zamówienia')
    expect(screen.getByTestId('checkout-name').value).toBe('Jan Kowalski')
    expect(screen.getByTestId('checkout-email').value).toBe('jan@test.pl')
  })

  it('waliduje puste pola formularza', () => {
    renderCheckout({ id: 1, name: '', email: '' }, true)
    const submitBtn = screen.getByTestId('place-order')
    fireEvent.click(submitBtn)
    expect(screen.getByText('Podaj imię i nazwisko')).toBeInTheDocument()
    expect(screen.getByText('Podaj numer telefonu')).toBeInTheDocument()
  })

  it('składa zamówienie po wypełnieniu formularza', () => {
    renderCheckout({ id: 1, name: 'Jan', email: 'jan@test.pl' }, true)

    // wypełniamy brakujące pola
    fireEvent.change(screen.getByTestId('checkout-phone'), { target: { value: '500100200' } })
    fireEvent.change(screen.getByTestId('checkout-street'), { target: { value: 'Budowlana 1' } })
    fireEvent.change(screen.getByTestId('checkout-city'), { target: { value: 'Warszawa' } })
    fireEvent.change(screen.getByTestId('checkout-zip'), { target: { value: '00-001' } })

    fireEvent.click(screen.getByTestId('place-order'))

    expect(screen.getByTestId('order-success')).toHaveTextContent('Zamówienie złożone!')
    expect(screen.getByTestId('order-number')).toBeInTheDocument()
    // numer zamówienia zaczyna się od BM-
    expect(screen.getByTestId('order-number').textContent).toMatch(/^BM-\d{6}$/)
  })

  it('wyświetla produkty w podsumowaniu zamówienia', () => {
    renderCheckout({ id: 1, name: 'Jan', email: 'jan@test.pl' }, true)
    expect(screen.getByText(/Młotek ślusarski 500g/)).toBeInTheDocument()
    expect(screen.getByText(/Cement portlandzki/)).toBeInTheDocument()
  })

  it('pozwala wybrać metodę płatności', () => {
    renderCheckout({ id: 1, name: 'Jan', email: 'jan@test.pl' }, true)
    const blikRadio = screen.getByLabelText('📱 BLIK')
    fireEvent.click(blikRadio)
    expect(blikRadio.checked).toBe(true)
  })
})
