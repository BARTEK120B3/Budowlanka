import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import AccountPage from '../pages/AccountPage'

function renderAccount(user = null) {
  if (user) {
    localStorage.setItem('budowlany_user', JSON.stringify(user))
  }
  return render(
    <AuthProvider>
      <CartProvider>
        <MemoryRouter initialEntries={['/account']}>
          <AccountPage />
        </MemoryRouter>
      </CartProvider>
    </AuthProvider>
  )
}

describe('AccountPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('wyświetla powitanie oraz e-mail zalogowanego użytkownika', () => {
    renderAccount({ id: 10, name: 'Krzysztof', email: 'krzysztof@budowa.pl' })
    expect(screen.getByTestId('account-greeting')).toHaveTextContent('Witaj, Krzysztof')
    expect(screen.getByText('krzysztof@budowa.pl')).toBeInTheDocument()
    expect(screen.getByText('Przeglądaj sklep')).toBeInTheDocument()
  })
})
