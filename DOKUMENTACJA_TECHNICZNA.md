# DOKUMENTACJA PROJEKTU: SKLEP BUDOWLANY "BUDMASTER"

**Przedmiot:** Testowanie i dokumentowanie aplikacji (TiDA)  
**Klasa:** 5TP (Technik Programista)  
**Rok szkolny:** 2025/2026  
**Technologie:** React 19, Vite 8, Tailwind CSS, Vitest 5, React Testing Library  

---

## 1. Wstęp i opis projektu

Projekt został zrealizowany w ramach zajęć z przedmiotu *Testowanie i dokumentowanie aplikacji*. Aplikacja to nowoczesny sklep internetowy typu SPA (Single Page Application) dla marketu budowlanego **BudMaster**, stworzony w bibliotece React z wykorzystaniem narzędzia Vite. 

Klient ma możliwość przeglądania katalogu materiałów budowlanych i narzędzi, filtrowania i sortowania produktów, rejestracji oraz logowania, a także samodzielnego zaprojektowania domku narzędziowego w dedykowanym konfiguratorze modułowym. Całość wieńczy moduł kasy z możliwością sfinalizowania zamówienia.

### Główne funkcjonalności aplikacji:
- **Katalog produktów i sklep (`StorePage`):** Wyszukiwarka tekstowa (szukanie w nazwach, opisach i kategoriach), filtrowanie po kategoriach, sortowanie po cenie rosnąco i malejąco.
- **Szczegóły produktu (`ProductPage`):** Dynamicznie dobrane ikony i tła kategorii, opis techniczny, wybór ilości zamawianych sztuk, sekcja powiązanych artykułów oraz system dodawania opinii przez zalogowanych użytkowników.
- **Kreator domku narzędziowego (`ConfiguratorPage`):** Interaktywny konfigurator pozwalający dobrać 5 modułów (ściany, dach, podłogę, drzwi, okna) z dynamicznym przeliczaniem ceny całkowitej (cena bazowa konstrukcji szkieletowej 2000 zł + wybrane komponenty).
- **Koszyk zakupowy (`CartPage`):** Zbiorczy podgląd dodanych materiałów oraz zaprojektowanych domków, możliwość usuwania pojedynczych towarów oraz całych projektów domków, wyliczanie łącznej kwoty do zapłaty.
- **Kasa i finalizacja zakupu (`CheckoutPage`):** Formularz danych wysyłkowych z walidacją, wybór metody płatności (BLIK, przelew, za pobraniem), generowanie numeru zamówienia `BM-XXXXXX` oraz czyszczenie koszyka.
- **Panel klienta (`AccountPage`):** Dane zalogowanego użytkownika oraz szybki podgląd aktualnego koszyka.
- **System autoryzacji (`AuthContext`):** Rejestracja, logowanie z weryfikacją hasła, zapobieganie duplikatom e-mail i wylogowanie (dane zachowywane w `localStorage`).

---

## 2. Architektura i struktura plików projektu

Aplikacja została podzielona na moduły z podziałem na strony (`pages`), komponenty wielokrotnego użytku (`components`), warstwę stanu (`context`), dane (`data`) oraz testy jednostkowe i integracyjne (`__tests__`).

| Komponent / Plik | Ścieżka w projekcie | Rola w systemie |
| :--- | :--- | :--- |
| `HomePage.jsx` | `src/pages/HomePage.jsx` | Strona główna z banerem powitalnym i sekcją opinii klientów |
| `StorePage.jsx` | `src/pages/StorePage.jsx` | Katalog produktów, wyszukiwarka, filtry kategorii i sortowanie cen |
| `ProductPage.jsx` | `src/pages/ProductPage.jsx` | Karta produktu, dobór ikony kategorii, opinie i dodawanie do koszyka |
| `LoginPage.jsx` | `src/pages/LoginPage.jsx` | Formularze logowania i rejestracji nowych klientów |
| `CartPage.jsx` | `src/pages/CartPage.jsx` | Koszyk zamówień z listą towarów, zestawów domków i łączną kwotą |
| `CheckoutPage.jsx` | `src/pages/CheckoutPage.jsx` | Moduł kasy: formularz dostawy, wybór płatności, złożenie zamówienia |
| `AccountPage.jsx` | `src/pages/AccountPage.jsx` | Profil użytkownika z podglądem zawartości koszyka |
| `ConfiguratorPage.jsx` | `src/pages/ConfiguratorPage.jsx` | Modułowy konfigurator 5 kroków budowy domku narzędziowego |
| `Header.jsx` | `src/components/Header.jsx` | Pasek nawigacyjny z logo, linkami i dynamicznym licznikiem koszyka |
| `Footer.jsx` | `src/components/Footer.jsx` | Stopka informacyjna z danymi kontaktowymi i prawami autorskimi |
| `ProductCard.jsx` | `src/components/ProductCard.jsx` | Kafelek produktu używany w sklepie, konfiguratorze i profilu |
| `AuthContext.jsx` | `src/context/AuthContext.jsx` | Kontekst uwierzytelniania, rejestracji i stanu zalogowania |
| `CartContext.jsx` | `src/context/CartContext.jsx` | Kontekst koszyka dla produktów standardowych i konfiguracji domków |
| `products.js` | `src/data/products.js` | Baza produktów, kategorii, komponentów konfiguratora i mapowania ikon |

---

## 3. Zgłoszone usterki i wprowadzone poprawki

Podczas testowania aplikacji wykryliśmy błędy w interfejsie oraz logice działania, które zostały wyeliminowane:

| Wykryta usterka (błąd) | Gdzie występowała | Zastosowana poprawka |
| :--- | :--- | :--- |
| **Zła ikona produktu na karcie szczegółów** | `ProductPage.jsx` | Na stronie produktu wyświetlała się na stałe ikona dźwigu `🏗️`. Wprowadziliśmy globalne mapowanie `categoryIcons` w `products.js` – teraz narzędzia mają młotek `🔨`, elektronarzędzia piorun `⚡`, farby paletę `🎨`, materiały cegły `🧱`, a elementy domku drewno `🪵` i okna `🪟`. |
| **Przycisk w konfiguratorze domku wychodził poza kartę** | `ProductCard.jsx` | W trybie konfiguratora przyciski „Dodaj do konfiguratora” i „Szczegóły” znajdowały się obok siebie w jednym rzędzie, co rozpychało kartę i psuło układ. Zmieniliśmy układ: przycisk dodawania ma pełną szerokość (`w-full`), a link do szczegółów umieszczono pod spodem. |
| **Brak opcji usunięcia domku z koszyka** | `CartPage.jsx`, `CartContext.jsx` | Koszyk pozwalał na usuwanie jedynie zwykłych produktów. Zapisany domek zostawał w koszyku na stałe. Dodaliśmy funkcję `removeConfiguratorFromCart` w kontekście oraz przycisk *„Usuń konfigurację”* przy każdym projekcie. |
| **Błędna kwota do zapłaty w koszyku** | `CartPage.jsx` | Podsumowanie w sekcji bocznej wyświetlało `totalPrice` (kwotę samych materiałów standardowych), ignorując wartość skonfigurowanego domku. Poprawiliśmy to na `grandTotal`, która poprawnie sumuje materiały oraz konfiguracje domków. |
| **Licznik koszyka w nagłówku ignorował domki** | `CartContext.jsx` | Licznik w menu `Header` pokazywał `0`, nawet gdy w koszyku znajdował się domek. Poprawiliśmy `totalCount`, aby zliczał liczbę sztuk zwykłych towarów oraz liczbę projektów domków. |
| **Komunikat o pustym koszyku na profilu użytkownika pomimo dodanego domku** | `AccountPage.jsx` | Gdy klient dodał do koszyka sam domek, w profilu pojawiał się komunikat *„Koszyk jest pusty”*. Dodaliśmy w panelu konta informację o skonfigurowanych domkach z linkiem do koszyka. |
| **Wyszukiwarka nie przeszukiwała opisów** | `StorePage.jsx` | Wyszukiwanie działało wyłącznie po tytule i nazwie kategorii. Dodaliśmy sprawdzanie pola `description`, co pozwala odnaleźć produkty po ich cechach technicznych (np. „akumulator”, „gips”). |
| **Nieaktywny przycisk „Przejdź do kasy”** | `CartPage.jsx` | Przycisk w koszyku nie posiadał obsługi zdarzenia `onClick`. Podpięliśmy nawigację do nowej strony `/checkout` oraz zablokowaliśmy przycisk w sytuacji, gdy koszyk jest pusty. |

---

## 4. Moduł kasy i finalizacji zakupu (`CheckoutPage.jsx`)

Dla zapewnienia pełnego cyklu zakupowego wdrożyliśmy podstronę `/checkout`.

### Zasada działania modułu kasy:
1. **Ochrona dostępu:** Użytkownik niezalogowany jest automatycznie przekierowywany na stronę logowania (`/login`).
2. **Weryfikacja zawartości koszyka:** W przypadku pustego koszyka wyświetla się odpowiedni komunikat wraz z przyciskiem powrotu do katalogu.
3. **Formularz dostawy:**
   - Imię i nazwisko (pobierane domyślnie z profilu zalogowanego użytkownika),
   - Adres e-mail,
   - Numer telefonu kontaktowego,
   - Ulica i numer budynku/lokalu,
   - Miasto oraz kod pocztowy.
4. **Walidacja danych:** Sprawdzane jest wypełnienie wszystkich wymaganych pól. Przy próbie wysłania pustego formularza pojawiają się czytelne komunikaty błędów.
5. **Metody płatności:**
   - 💳 Przelew bankowy tradycyjny,
   - 📱 Płatność kodem BLIK,
   - 📦 Płatność przy odbiorze (za pobraniem).
6. **Boczne podsumowanie:** Zestawienie pozycji (standardowe materiały + konfiguracje domków), darmowa dostawa paletowa oraz łączna kwota do zapłaty.
7. **Obsługa złożenia zamówienia:**
   - Generowany jest unikalny identyfikator zamówienia (np. `BM-739102`),
   - Koszyk zostaje wyczyszczony (`clearCart`),
   - Wyświetla się ekran potwierdzenia zakupu z podanym numerem i możliwością powrotu na stronę główną lub do sklepu.

---

## 5. Raport z testów automatycznych

Do weryfikacji poprawności działania aplikacji wykorzystano środowisko **Vitest** oraz bibliotekę **React Testing Library** (środowisko DOM emulowane za pomocą **jsdom**).

Testy uruchamia się poleceniem:
```bash
npm test
```

### Zestawienie wyników testów:

| Lp. | Plik testowy | Liczba testów | Zakres sprawdzanych funkcjonalności | Wynik |
| :---: | :--- | :---: | :--- | :---: |
| 1 | `src/__tests__/products.test.js` | 11 | Integralność danych produktów, poprawność kategorii, unikalność identyfikatorów ID | **PASSED** |
| 2 | `src/__tests__/AuthContext.test.jsx` | 7 | Rejestracja, blokowanie duplikatów e-mail, logowanie, błędne hasło, wylogowanie | **PASSED** |
| 3 | `src/__tests__/CartContext.test.jsx` | 8 | Dodawanie towarów, zwiększanie ilości, usuwanie materiałów i domków, czyszczenie koszyka | **PASSED** |
| 4 | `src/__tests__/Header.test.jsx` | 5 | Wyświetlanie logo, linki nawigacji, ukrywanie koszyka dla gości, licznik pozycji | **PASSED** |
| 5 | `src/__tests__/Footer.test.jsx` | 5 | Dane teleadresowe BudMaster, linki social media, stopka z prawami autorskimi | **PASSED** |
| 6 | `src/__tests__/ProductCard.test.jsx` | 7 | Renderowanie karty, formatowanie cen PLN, przycisk szczegółów, tryb konfiguratora | **PASSED** |
| 7 | `src/__tests__/HomePage.test.jsx` | 6 | Sekcja główna Hero, opinie klientów z ocenami gwiazdkowymi, przyciski skrótów | **PASSED** |
| 8 | `src/__tests__/StorePage.test.jsx` | 8 | Wyszukiwanie produktów, filtrowanie kategorii, sortowanie cenowe, przycisk resetu | **PASSED** |
| 9 | `src/__tests__/ProductPage.test.jsx` | 8 | Ładowanie danych produktu, poprawna ikona kategorii, dodawanie do koszyka, opinie | **PASSED** |
| 10 | `src/__tests__/LoginPage.test.jsx` | 4 | Formularz logowania i rejestracji, walidacja pustych pól, rejestracja klienta | **PASSED** |
| 11 | `src/__tests__/CartPage.test.jsx` | 4 | Obsługa pustego koszyka, usuwanie towarów i domków, sumowanie, przejście do kasy | **PASSED** |
| 12 | `src/__tests__/CheckoutPage.test.jsx` | 7 | Przekierowanie niezalogowanych, walidacja formularza, wybór BLIK, numer BM-XXXXXX | **PASSED** |
| 13 | `src/__tests__/AccountPage.test.jsx` | 3 | Powitanie użytkownika, blokada dla gości, podgląd skonfigurowanych domków w koszyku | **PASSED** |
| 14 | `src/__tests__/ConfiguratorPage.test.jsx` | 5 | Weryfikacja 5 kroków, blokada zapisu niekompletnego projektu, dodawanie i usuwanie części | **PASSED** |
| 15 | `src/__tests__/EndToEndFlow.test.jsx` | 1 | **Kompleksowy test E2E:** Rejestracja klienta -> Wyszukanie wiertarki w sklepie -> Dodanie do koszyka -> Konfiguracja domku (5/5) -> Przejście do kasy -> Formularz wysyłki i BLIK -> Złożenie zamówienia | **PASSED** |
| **SUMA** | **15 plików testowych** | **89 testów** | **Wszystkie asercje zakończone powodzeniem** | **89 / 89 ZALICZONE (100%)** |

---

## 6. Instrukcja instalacji i uruchomienia projektu

### Wymagania wstępne:
- Zainstalowane środowisko **Node.js** (wersja v18 lub wyższa).

### Dostępne skrypty:
1. **Instalacja bibliotek i zależności:**
   ```bash
   npm install
   ```
2. **Uruchomienie w trybie deweloperskim:**
   ```bash
   npm run dev
   ```
   Aplikacja będzie dostępna pod adresem lokalnym: `http://localhost:5173`.
3. **Uruchomienie automatycznych testów:**
   ```bash
   npm test
   ```
4. **Weryfikacja jakości kodu linterem:**
   ```bash
   npm run lint
   ```
5. **Budowanie wersji produkcyjnej:**
   ```bash
   npm run build
   ```

---

## 7. Podsumowanie zespołu

Projekt sklepu budowlanego **BudMaster** został pomyślnie zrealizowany. Aplikacja posiada kompletny katalog towarów, modułowy konfigurator domków ogrodowych oraz w pełni działającą ścieżkę finalizacji zamówienia w kasie. Wszystkie zgłoszone błędy interfejsu zostały usunięte, a wysoka jakość kodu została potwierdzona zestawem 89 testów automatycznych.
