import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider, useCart } from '../context/CartContext'
import AccountPage from '../pages/AccountPage'
import { useEffect } from 'react'

function SetupAccountCart({ children }) {
  const { addToCart, addConfiguratorToCart } = useCart()
  useEffect(() => {
    addToCart({ id: 1, name: 'Młotek ślusarski 500g', price: 45.99, categoryId: 1 }, 1)
    addConfiguratorToCart({ components: {}, totalPrice: 2000 })
  }, [])
  return children
}

function renderAccount(user = null, withCart = false) {
  if (user) {
    localStorage.setItem('budowlany_user', JSON.stringify(user))
  }
  return render(
    <AuthProvider>
      <CartProvider>
        <MemoryRouter initialEntries={['/account']}>
          <Routes>
            <Route
              path="/account"
              element={
                withCart ? (
                  <SetupAccountCart>
                    <AccountPage />
                  </SetupAccountCart>
                ) : (
                  <AccountPage />
                )
              }
            />
            <Route path="/login" element={<div>Ekran logowania</div>} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    </AuthProvider>
  )
}

describe('Testy profilu użytkownika (AccountPage)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('pokazuje powitanie i maila zalogowanego ucznia/klienta', () => {
    renderAccount({ id: 10, name: 'Krzysztof', email: 'krzysztof@budowa.pl' })
    expect(screen.getByTestId('account-greeting')).toHaveTextContent('Witaj, Krzysztof')
    expect(screen.getByText('krzysztof@budowa.pl')).toBeInTheDocument()
    expect(screen.getByText('Przeglądaj sklep')).toBeInTheDocument()
  })

  it('przekierowuje na login jeśli nikt nie jest zalogowany', () => {
    renderAccount(null)
    expect(screen.getByText('Ekran logowania')).toBeInTheDocument()
  })

  it('wyświetla podgląd produktów i info o domku w koszyku', () => {
    renderAccount({ id: 10, name: 'Krzysztof', email: 'krzysztof@budowa.pl' }, true)
    expect(screen.getByText('Młotek ślusarski 500g')).toBeInTheDocument()
    expect(screen.getByText(/Skonfigurowane domki w koszyku: 1/)).toBeInTheDocument()
  })
})
