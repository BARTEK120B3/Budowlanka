import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import ConfiguratorPage from '../pages/ConfiguratorPage'

function renderConfigurator(user = null) {
  if (user) {
    localStorage.setItem('budowlany_user', JSON.stringify(user))
  }
  return render(
    <AuthProvider>
      <CartProvider>
        <MemoryRouter initialEntries={['/configurator']}>
          <ConfiguratorPage />
        </MemoryRouter>
      </CartProvider>
    </AuthProvider>
  )
}

describe('Testy kreatora domku (ConfiguratorPage)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('wyświetla nagłówek i wszystkie 5 sekcji komponentów', () => {
    renderConfigurator()
    expect(screen.getByRole('heading', { name: 'Konfigurator domku' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Ściany' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Dach' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Podłoga' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Drzwi' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Okna' })).toBeInTheDocument()
  })

  it('nie pozwala zapisać projektu jeśli użytkownik nie jest zalogowany', () => {
    renderConfigurator(null)
    const saveBtn = screen.getByTestId('save-configurator')
    fireEvent.click(saveBtn)
    expect(screen.getByText('Zaloguj się, aby zapisać konfigurację')).toBeInTheDocument()
  })

  it('nie pozwala zapisać domku dopóki nie wybierzemy wszystkich 5 elementów', () => {
    renderConfigurator({ id: 1, name: 'Janek', email: 'janek@test.pl' })
    const saveBtn = screen.getByTestId('save-configurator')
    fireEvent.click(saveBtn)
    expect(screen.getByText('Wybierz wszystkie komponenty przed zapisaniem!')).toBeInTheDocument()
  })

  it('dodaje element do podsumowania i powiększa cenę o jego wartość', () => {
    renderConfigurator({ id: 1, name: 'Janek', email: 'janek@test.pl' })
    expect(screen.getByText('Razem: 2000.00 zł')).toBeInTheDocument()

    const addButtons = screen.getAllByText('Dodaj do konfiguratora')
    fireEvent.click(addButtons[0]) // Deska elewacyjna sosnowa 850 zł

    expect(screen.getByText('Razem: 2850.00 zł')).toBeInTheDocument()
    expect(screen.getByText(/Deska elewacyjna sosnowa — 850\.00 zł/)).toBeInTheDocument()
  })

  it('pozwala usunąć wybrany element przyciskiem Usuń i obniża cenę z powrotem', () => {
    renderConfigurator({ id: 1, name: 'Janek', email: 'janek@test.pl' })
    const addButtons = screen.getAllByText('Dodaj do konfiguratora')
    fireEvent.click(addButtons[0]) // dodajemy deskę 850 zł
    expect(screen.getByText('Razem: 2850.00 zł')).toBeInTheDocument()

    const removeBtn = screen.getByText('Usuń')
    fireEvent.click(removeBtn)

    expect(screen.getByText('Razem: 2000.00 zł')).toBeInTheDocument()
    expect(screen.queryByText(/Deska elewacyjna sosnowa — 850\.00 zł/)).not.toBeInTheDocument()
  })
})
