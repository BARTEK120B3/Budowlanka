import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import LoginPage from '../pages/LoginPage'

function renderPage() {
  return render(
    <AuthProvider>
      <CartProvider>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<div data-testid="account-page-mock">Konto klienta</div>} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    </AuthProvider>
  )
}

describe('Testy strony logowania i rejestracji (LoginPage)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('wyświetla formularze logowania i rejestracji obok siebie', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'Logowanie' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Rejestracja' })).toBeInTheDocument()
  })

  it('pokazuje błąd gdy próbujemy zalogować się na nieistniejące konto', () => {
    renderPage()
    fireEvent.change(screen.getByTestId('login-email'), { target: { value: 'nieznany@test.pl' } })
    fireEvent.change(screen.getByTestId('login-password'), { target: { value: 'haslo123' } })
    fireEvent.click(screen.getByTestId('login-submit'))
    expect(screen.getByText('Nie znaleziono użytkownika')).toBeInTheDocument()
  })

  it('wymaga podania podstawowych danych przy rejestracji', () => {
    renderPage()
    fireEvent.click(screen.getByTestId('reg-submit'))
    expect(screen.getByText('Wypełnij wymagane pola')).toBeInTheDocument()
  })

  it('rejestruje nowego klienta i przenosi go do panelu konta', () => {
    renderPage()
    fireEvent.change(screen.getByTestId('reg-name'), { target: { value: 'Tomasz' } })
    fireEvent.change(screen.getByTestId('reg-email'), { target: { value: 'tomasz@test.pl' } })
    fireEvent.change(screen.getByTestId('reg-password'), { target: { value: 'tajnehaslo' } })
    fireEvent.click(screen.getByTestId('reg-submit'))

    expect(screen.queryByText('Wypełnij wymagane pola')).not.toBeInTheDocument()
    expect(screen.getByTestId('account-page-mock')).toBeInTheDocument()
  })
})
