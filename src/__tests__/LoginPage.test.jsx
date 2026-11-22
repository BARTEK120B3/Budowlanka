import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import LoginPage from '../pages/LoginPage'

function renderPage() {
  return render(
    <AuthProvider>
      <CartProvider>
        <MemoryRouter initialEntries={['/login']}>
          <LoginPage />
        </MemoryRouter>
      </CartProvider>
    </AuthProvider>
  )
}

describe('LoginPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renderuje formularz logowania i rejestracji', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'Logowanie' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Rejestracja' })).toBeInTheDocument()
  })

  it('obsługuje błąd logowania dla nieistniejącego konta', () => {
    renderPage()
    fireEvent.change(screen.getByTestId('login-email'), { target: { value: 'nieistnieje@test.pl' } })
    fireEvent.change(screen.getByTestId('login-password'), { target: { value: 'haslo123' } })
    fireEvent.click(screen.getByTestId('login-submit'))
    expect(screen.getByText('Nie znaleziono użytkownika')).toBeInTheDocument()
  })

  it('rejestruje nowego użytkownika i waliduje wymagane pola', () => {
    renderPage()
    fireEvent.click(screen.getByTestId('reg-submit'))
    expect(screen.getByText('Wypełnij wymagane pola')).toBeInTheDocument()

    fireEvent.change(screen.getByTestId('reg-name'), { target: { value: 'Tomasz' } })
    fireEvent.change(screen.getByTestId('reg-email'), { target: { value: 'tomasz@test.pl' } })
    fireEvent.change(screen.getByTestId('reg-password'), { target: { value: 'tajnehaslo' } })
    fireEvent.click(screen.getByTestId('reg-submit'))

    expect(screen.queryByText('Wypełnij wymagane pola')).not.toBeInTheDocument()
  })
})
