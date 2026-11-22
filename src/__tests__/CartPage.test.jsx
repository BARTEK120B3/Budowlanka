import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider, useCart } from '../context/CartContext'
import CartPage from '../pages/CartPage'
import { useEffect } from 'react'

// Pomocniczy komponent do wrzucenia produktów i domku do koszyka w testach
function SetupFullCart({ children }) {
  const { addToCart, addConfiguratorToCart } = useCart()
  useEffect(() => {
    addToCart({ id: 1, name: 'Młotek ślusarski 500g', price: 45.99 }, 2)
    addConfiguratorToCart({
      components: {
        101: { name: 'Deska elewacyjna sosnowa', price: 850 },
      },
      totalPrice: 2850,
    })
  }, [])
  return children
}

function SetupCartWithOnlyProducts({ children }) {
  const { addToCart } = useCart()
  useEffect(() => {
    addToCart({ id: 1, name: 'Młotek ślusarski 500g', price: 45.99 }, 2)
  }, [])
  return children
}

function renderCart(mockUser = { id: 1, name: 'Janek', email: 'janek@test.pl' }, cartMode = 'empty') {
  if (mockUser) {
    localStorage.setItem('budowlany_user', JSON.stringify(mockUser))
  }
  return render(
    <AuthProvider>
      <CartProvider>
        <MemoryRouter initialEntries={['/cart']}>
          <Routes>
            <Route
              path="/cart"
              element={
                cartMode === 'full' ? (
                  <SetupFullCart>
                    <CartPage />
                  </SetupFullCart>
                ) : cartMode === 'products' ? (
                  <SetupCartWithOnlyProducts>
                    <CartPage />
                  </SetupCartWithOnlyProducts>
                ) : (
                  <CartPage />
                )
              }
            />
            <Route path="/checkout" element={<div data-testid="checkout-page-mock">Strona kasy</div>} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    </AuthProvider>
  )
}

describe('Testy strony koszyka (CartPage)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('pokazuje komunikat o pustym koszyku gdy nic nie dodano', () => {
    renderCart()
    expect(screen.getByText('Koszyk jest pusty')).toBeInTheDocument()
    expect(screen.getByText('Suma: 0.00 zł')).toBeInTheDocument()
    expect(screen.getByTestId('go-to-checkout')).toBeDisabled()
  })

  it('wyświetla dodany produkt i pozwala go usunąć przyciskiem Usuń', () => {
    renderCart({ id: 1, name: 'Janek', email: 'janek@test.pl' }, 'products')
    expect(screen.getByText('Młotek ślusarski 500g')).toBeInTheDocument()
    expect(screen.getByText(/2 x/)).toBeInTheDocument()

    const removeBtn = screen.getByTestId('remove-1')
    fireEvent.click(removeBtn)
    expect(screen.queryByTestId('remove-1')).not.toBeInTheDocument()
  })

  it('poprawnie wyświetla konfigurację domku i pozwala ją usunąć z koszyka', () => {
    renderCart({ id: 1, name: 'Janek', email: 'janek@test.pl' }, 'full')
    expect(screen.getByText('Domek narzędziowy')).toBeInTheDocument()
    expect(screen.getByText('Deska elewacyjna sosnowa')).toBeInTheDocument()

    // Szukamy przycisku usuwania konfiguracji
    const removeConfigBtn = screen.getByText('Usuń konfigurację')
    expect(removeConfigBtn).toBeInTheDocument()

    fireEvent.click(removeConfigBtn)
    expect(screen.queryByText('Domek narzędziowy')).not.toBeInTheDocument()
    expect(screen.getByText('Brak konfiguracji')).toBeInTheDocument()
  })

  it('oblicza pełną sumę (materiały + domek) i przechodzi do kasy po kliknięciu', () => {
    renderCart({ id: 1, name: 'Janek', email: 'janek@test.pl' }, 'full')
    // Młotek: 2 * 45.99 = 91.98 zł, Domek: 2850.00 zł => Suma: 2941.98 zł
    expect(screen.getByText('Suma: 2941.98 zł')).toBeInTheDocument()

    const checkoutBtn = screen.getByTestId('go-to-checkout')
    expect(checkoutBtn).not.toBeDisabled()
    fireEvent.click(checkoutBtn)

    expect(screen.getByTestId('checkout-page-mock')).toBeInTheDocument()
  })
})
