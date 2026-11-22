import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider, useCart } from '../context/CartContext'
import CartPage from '../pages/CartPage'
import { useEffect } from 'react'

function SetupCartWithItems({ children }) {
  const { addToCart } = useCart()
  useEffect(() => {
    addToCart({ id: 1, name: 'Młotek ślusarski 500g', price: 45.99 }, 2)
  }, [])
  return children
}

function renderCart(mockUser = { id: 1, name: 'Jan', email: 'jan@test.pl' }, withItems = false) {
  if (mockUser) {
    localStorage.setItem('budowlany_user', JSON.stringify(mockUser))
  }
  return render(
    <AuthProvider>
      <CartProvider>
        <MemoryRouter initialEntries={['/cart']}>
          {withItems ? (
            <SetupCartWithItems>
              <CartPage />
            </SetupCartWithItems>
          ) : (
            <CartPage />
          )}
        </MemoryRouter>
      </CartProvider>
    </AuthProvider>
  )
}

describe('CartPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('wyświetla pusty koszyk dla zalogowanego użytkownika', () => {
    renderCart()
    expect(screen.getByText('Koszyk jest pusty')).toBeInTheDocument()
    expect(screen.getByText('Suma: 0.00 zł')).toBeInTheDocument()
  })

  it('renderuje pozycje dodane do koszyka i pozwala usunąć', () => {
    renderCart({ id: 1, name: 'Jan', email: 'jan@test.pl' }, true)
    expect(screen.getByText('Młotek ślusarski 500g')).toBeInTheDocument()
    expect(screen.getByText(/2 x/)).toBeInTheDocument()

    const removeBtn = screen.getByTestId('remove-1')
    fireEvent.click(removeBtn)
    expect(screen.queryByTestId('remove-1')).not.toBeInTheDocument()
  })
})
