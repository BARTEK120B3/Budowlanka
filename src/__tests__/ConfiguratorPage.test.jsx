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

describe('ConfiguratorPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renderuje nagłówek i sekcje komponentów', () => {
    renderConfigurator()
    expect(screen.getByRole('heading', { name: 'Konfigurator domku' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Ściany' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Dach' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Podłoga' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Drzwi' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Okna' })).toBeInTheDocument()
  })

  it('wymaga logowania przed zapisem domku', () => {
    renderConfigurator(null)
    const saveBtn = screen.getByTestId('save-configurator')
    fireEvent.click(saveBtn)
    expect(screen.getByText('Zaloguj się, aby zapisać konfigurację')).toBeInTheDocument()
  })

  it('blokuje zapis przy niekompletnych komponentach', () => {
    renderConfigurator({ id: 1, name: 'Jan', email: 'jan@test.pl' })
    const saveBtn = screen.getByTestId('save-configurator')
    fireEvent.click(saveBtn)
    expect(screen.getByText('Wybierz wszystkie komponenty przed zapisaniem!')).toBeInTheDocument()
  })

  it('pozwala dodać komponent i aktualizuje cenę bazową (2000 zł)', () => {
    renderConfigurator({ id: 1, name: 'Jan', email: 'jan@test.pl' })
    expect(screen.getByText('Razem: 2000.00 zł')).toBeInTheDocument()

    const addButtons = screen.getAllByText('Dodaj do konfiguratora')
    fireEvent.click(addButtons[0]) // dodaje pierwszy komponent (Deska elewacyjna sosnowa 850 zł)

    expect(screen.getByText('Razem: 2850.00 zł')).toBeInTheDocument()
    expect(screen.getByText(/Deska elewacyjna sosnowa — 850\.00 zł/)).toBeInTheDocument()
  })
})
