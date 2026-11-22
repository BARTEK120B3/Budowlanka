import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('EndToEndFlow - Pełny przepływ użytkownika sklepu budowlanego', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('wykonuje scenariusz: rejestracja -> sklep -> dodanie produktu do koszyka -> weryfikacja koszyka', async () => {
    // 1. Wejście na stronę główną
    const { container } = render(<App />)
    expect(screen.getByText('Twój jedyny wybór w materiałach budowlanych')).toBeInTheDocument()

    // 2. Przejście do logowania / rejestracji
    const loginNav = screen.getByText('Logowanie / Rejestracja')
    fireEvent.click(loginNav)

    expect(screen.getByRole('heading', { name: 'Rejestracja' })).toBeInTheDocument()

    // 3. Wypełnienie formularza rejestracji
    fireEvent.change(screen.getByTestId('reg-name'), { target: { value: 'Marek Budowniczy' } })
    fireEvent.change(screen.getByTestId('reg-email'), { target: { value: 'marek@majster.pl' } })
    fireEvent.change(screen.getByTestId('reg-password'), { target: { value: 'bezpieczne123' } })
    fireEvent.click(screen.getByTestId('reg-submit'))

    // 4. Po rejestracji użytkownik widzi powitanie na koncie
    expect(screen.getByTestId('account-greeting')).toHaveTextContent('Witaj, Marek Budowniczy')

    // 5. Nawigacja do Sklepu
    const storeNav = screen.getByText('Sklep')
    fireEvent.click(storeNav)
    expect(screen.getByTestId('search-input')).toBeInTheDocument()

    // 6. Wyszukanie wiertarki
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'Wiertarko' } })
    expect(screen.getByText('Wiertarko-wkrętarka Bosch 18V')).toBeInTheDocument()

    // 7. Przejście do szczegółów produktu
    const detailsBtn = screen.getByText('Szczegóły')
    fireEvent.click(detailsBtn)
    expect(screen.getByRole('heading', { name: 'Wiertarko-wkrętarka Bosch 18V' })).toBeInTheDocument()

    // 8. Dodanie do koszyka
    const addToCartBtn = screen.getByTestId('add-to-cart')
    fireEvent.click(addToCartBtn)
    expect(screen.getByText('Dodano do koszyka!')).toBeInTheDocument()

    // 9. Przejście do koszyka
    const cartNav = screen.getByText(/Koszyk/)
    fireEvent.click(cartNav)

    expect(screen.getByTestId('cart-title')).toHaveTextContent('Twój koszyk')
    expect(screen.getByText('Wiertarko-wkrętarka Bosch 18V')).toBeInTheDocument()
    expect(screen.getByText('Suma: 549.00 zł')).toBeInTheDocument()
  })
})
