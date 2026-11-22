import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('Kompleksowy test E2E - cała ścieżka klienta sklepu BudMaster', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('scenariusz: rejestracja -> zakup narzędzia -> konfiguracja domku -> koszyk -> kasa i zamówienie', async () => {
    // 1. Wejście na stronę główną sklepu
    render(<App />)
    expect(screen.getByText('Twój jedyny wybór w materiałach budowlanych')).toBeInTheDocument()

    // 2. Klikamy w nagłówku "Logowanie / Rejestracja"
    const loginNav = screen.getByText('Logowanie / Rejestracja')
    fireEvent.click(loginNav)

    expect(screen.getByRole('heading', { name: 'Rejestracja' })).toBeInTheDocument()

    // 3. Rejestrujemy nowego klienta w formularzu
    fireEvent.change(screen.getByTestId('reg-name'), { target: { value: 'Marek Budowniczy' } })
    fireEvent.change(screen.getByTestId('reg-email'), { target: { value: 'marek@majster.pl' } })
    fireEvent.change(screen.getByTestId('reg-password'), { target: { value: 'bezpieczne123' } })
    fireEvent.click(screen.getByTestId('reg-submit'))

    // 4. Trafiamy na stronę profilu klienta z powitaniem
    expect(screen.getByTestId('account-greeting')).toHaveTextContent('Witaj, Marek Budowniczy')

    // 5. Przechodzimy do katalogu sklepu
    const storeNav = screen.getByText('Sklep')
    fireEvent.click(storeNav)
    expect(screen.getByTestId('search-input')).toBeInTheDocument()

    // 6. Szukamy wiertarki po nazwie
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'Wiertarko' } })
    expect(screen.getByText('Wiertarko-wkrętarka Bosch 18V')).toBeInTheDocument()

    // 7. Wchodzimy w kartę tego produktu
    const detailsBtn = screen.getByText('Szczegóły')
    fireEvent.click(detailsBtn)
    expect(screen.getByRole('heading', { name: 'Wiertarko-wkrętarka Bosch 18V' })).toBeInTheDocument()

    // 8. Wrzucamy wiertarkę do koszyka
    const addToCartBtn = screen.getByTestId('add-to-cart')
    fireEvent.click(addToCartBtn)
    expect(screen.getByText('Dodano do koszyka!')).toBeInTheDocument()

    // 9. Przechodzimy teraz do konfiguratora domku narzędziowego
    const configNav = screen.getByText('Konfigurator')
    fireEvent.click(configNav)
    expect(screen.getByRole('heading', { name: 'Konfigurator domku' })).toBeInTheDocument()

    // Wybieramy wszystkie 5 wymaganych elementów domku
    const addButtons = screen.getAllByText('Dodaj do konfiguratora')
    // Klikamy elementy z kolejnych kategorii
    fireEvent.click(addButtons[0]) // Ściany
    fireEvent.click(addButtons[3]) // Dach
    fireEvent.click(addButtons[5]) // Podłoga
    fireEvent.click(addButtons[7]) // Drzwi
    fireEvent.click(addButtons[9]) // Okna

    // Zapisujemy skompletowany domek i wrzucamy go do koszyka
    const saveConfigBtn = screen.getByTestId('save-configurator')
    fireEvent.click(saveConfigBtn)
    expect(screen.getByText('Konfiguracja zapisana i dodana do koszyka!')).toBeInTheDocument()

    // 10. Przechodzimy do koszyka
    const cartNav = screen.getByText(/Koszyk/)
    fireEvent.click(cartNav)

    expect(screen.getByTestId('cart-title')).toBeInTheDocument()
    expect(screen.getByText('Wiertarko-wkrętarka Bosch 18V')).toBeInTheDocument()
    expect(screen.getByText('Domek narzędziowy')).toBeInTheDocument()

    // 11. Przechodzimy do kasy (finalizacja zakupu)
    const checkoutNavBtn = screen.getByTestId('go-to-checkout')
    fireEvent.click(checkoutNavBtn)

    expect(screen.getByTestId('checkout-title')).toHaveTextContent('Podsumowanie zamówienia')

    // 12. Uzupełniamy formularz dostawy
    fireEvent.change(screen.getByTestId('checkout-phone'), { target: { value: '555222333' } })
    fireEvent.change(screen.getByTestId('checkout-street'), { target: { value: 'ul. Monterska 4' } })
    fireEvent.change(screen.getByTestId('checkout-city'), { target: { value: 'Poznań' } })
    fireEvent.change(screen.getByTestId('checkout-zip'), { target: { value: '60-001' } })

    // Wybieramy płatność BLIK
    fireEvent.click(screen.getByLabelText('📱 BLIK'))

    // 13. Składamy zamówienie
    fireEvent.click(screen.getByTestId('place-order'))

    // 14. Otrzymujemy potwierdzenie z wygenerowanym numerem zamówienia
    expect(screen.getByTestId('order-success')).toHaveTextContent('Zamówienie złożone!')
    expect(screen.getByTestId('order-number').textContent).toMatch(/^BM-\d{6}$/)
    expect(screen.getByText(/marek@majster\.pl/)).toBeInTheDocument()
  })
})
