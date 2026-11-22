# DOKUMENTACJA TECHNICZNA PROJEKTU: MIGRACJA ARCHITEKTURY I DOMENY BIZNESOWEJ

## 1. TABELA MAPOWANIA ZASOBÓW PROJEKTU (PHP -> REACT/VITE)

| Komponent PHP (Źródło) | Odpowiednik React (Cel) | Ścieżka docelowa | Funkcja w systemie |
| :--- | :--- | :--- | :--- |
| `sklep_muzyczny/index.php` | `App.jsx` + `HomePage.jsx` | `src/App.jsx`, `src/pages/HomePage.jsx` | Punkt wejścia SPA, routing klienta |
| `sklep_muzyczny/html/store.php` | `StorePage.jsx` | `src/pages/StorePage.jsx` | Katalog produktów, filtry, sortowanie |
| `sklep_muzyczny/html/product.php`| `ProductPage.jsx` | `src/pages/ProductPage.jsx` | Karta produktu, opinie, dodawanie do koszyka |
| `sklep_muzyczny/html/login.php` | `LoginPage.jsx` | `src/pages/LoginPage.jsx` | Formularze autoryzacji i rejestracji |
| `sklep_muzyczny/html/cart.php` | `CartPage.jsx` | `src/pages/CartPage.jsx` | Koszyk zamówień, lista konfiguracji |
| `sklep_muzyczny/html/account.php` | `AccountPage.jsx` | `src/pages/AccountPage.jsx` | Panel klienta, historia sesji |
| `sklep_muzyczny/html/guitar.php` | `ConfiguratorPage.jsx` | `src/pages/ConfiguratorPage.jsx` | Konfigurator domku narzędziowego |
| `sklep_muzyczny/components/header.php` | `Header.jsx` | `src/components/Header.jsx` | Pasek nawigacyjny z detekcją sesji |
| `sklep_muzyczny/components/footer.shtml` | `Footer.jsx` | `src/components/Footer.jsx` | Stopka informacyjna |
| `sklep_muzyczny/components/product_comp.php` | `ProductCard.jsx` | `src/components/ProductCard.jsx` | Generyczna karta produktowa |
| `sklep_muzyczny/handlers/account_login.php` | `AuthContext.jsx::login` | `src/context/AuthContext.jsx` | Stan i metody uwierzytelniania |
| `sklep_muzyczny/handlers/account_create.php`| `AuthContext.jsx::register`| `src/context/AuthContext.jsx` | Walidacja i rejestracja konta |
| `sklep_muzyczny/handlers/cart_add.php` | `CartContext.jsx::addToCart` | `src/context/CartContext.jsx` | Zarządzanie stanem koszyka |
| `sklep_muzyczny/handlers/save_guitar.php` | `CartContext.jsx::addConfiguratorToCart` | `src/context/CartContext.jsx` | Zapis zestawu konfiguratora |
| `sklep_muzyczny/scripts/mysql_connect.php` | Mock / Data Layer | `src/data/products.js` | Statyczna warstwa danych produktów |
| `sklep_muzyczny/css/main.css` | Tailwind / CSS | `src/index.css` | Style globalne i tokeny projektowe |

---

## 2. REJESTR USUNIĘTYCH BŁĘDÓW WIZUALNYCH I OPTYMALIZACJI UI

| Obszar / Plik | Zidentyfikowany błąd wizualny | Zastosowane rozwiązanie architektoniczne | Stan po naprawie |
| :--- | :--- | :--- | :--- |
| `src/index.css` | Ostrzeżenia LightningCSS `@tailwind` at-rules | Usunięcie dyrektyw kompilatora, wdrożenie natywnych zmiennych CSS i resetu | Kompilacja 100% czysta (0 warnings) |
| `src/components/Header.jsx` | Poziomy pasek przewijania (`w-screen`), nakładanie treści | Przejście na `w-full`, dodanie `backdrop-blur-md`, paddingu systemowego i kontenera `max-w-7xl` | Płynny fixed navbar bez overflow |
| `src/pages/HomePage.jsx` | Podwójne sekcje `h-[100vh]` z ukrytą treścią i pustką | Kompaktowy, responsywny Hero z tagami i siatka referencji | Pełna czytelność Above The Fold |
| `src/pages/StorePage.jsx` | Nagłówek `100vh` spychający katalog poza ekran | Banner nagłówkowy `pt-28 pb-12`, dwukolumnowy układ z responsywnym panelem filtrów | Natychmiastowa widoczność towarów |
| `src/components/ProductCard.jsx` | Puste szare tło i niesformatowany emoji `🏗️` | Dynamiczne tła gradientowe według kategorii, status magazynowy, hover lift `-translate-y-1` | Nowoczesne karty z mikromacierzami |
| `src/pages/ProductPage.jsx` | Sztywny margines `m-[250px_0_108px_0]` i 6-kolumnowy grid | Usunięcie arbitralnych marginesów, grid responsywny `1->2->4`, czytelny breadcrumb | Poprawny layout na każdym ekranie |
| `src/pages/ConfiguratorPage.jsx` | Nagłówek `100vh` oraz uciekające podsumowanie cenowe | Skrócenie nagłówka, sticky sidebar (`sticky top-28`) z sumowaniem w czasie rzeczywistym | Koszyk konfiguratora widoczny w trakcie scrolla |
| `src/pages/CartPage.jsx` | Zwężony kontener `w-1/2` ucinający zawartość na tabletach | Układ dwukolumnowy `flex-1` + `w-96`, podsumowanie zamówienia z darmową dostawą | Pełna responsywność koszyka |
| `src/pages/LoginPage.jsx` | Sztywne szerokości inputów `w-[55%]`, `basis-40%` | Dwie niezależne, zbalansowane karty formularzy z focus-ringami i siatką pól | Estetyczne formularze z walidacją |
| `src/components/Footer.jsx` | Tło gradientowe z jasnoniebieskiego i brak kontrastu | Głęboki grafit `bg-slate-950` z wyraźnym podziałem 4-kolumnowym | Standard korporacyjny stopki e-commerce |

---

## 3. TABELA MODELU DANYCH PO MIGRACJI DOMENOWEJ

| Tabela relacyjna | Pole | Typ danych | Klucz | Opis biznesowy |
| :--- | :--- | :--- | :--- | :--- |
| `kategoria_produktu` | `Id_kategorii_produktu` | `INT(11)` | `PK, AI` | Identyfikator kategorii budowlanej |
| `kategoria_produktu` | `Nazwa_kategorii_produktu` | `VARCHAR(60)` | - | Nazwa działu (np. Elektronarzędzia, Instalacje) |
| `kategoria_produktu` | `Opis_kategorii_produktu` | `TEXT` | - | Charakterystyka asortymentu w kategorii |
| `produkt` | `Id_produktu` | `BIGINT(20)` | `PK, AI` | Identyfikator jednostki towarowej |
| `produkt` | `Nazwa_produktu` | `VARCHAR(100)` | - | Nazwa handlowa materiału/narzędzia |
| `produkt` | `Opis_produktu` | `TEXT` | - | Karta techniczna artykułu |
| `produkt` | `Cena_jednostkowa` | `DECIMAL(8,2)` | - | Wartość brutto w PLN |
| `produkt` | `Zdjecie_produktu` | `VARCHAR(100)` | - | Ścieżka do pliku graficznego |
| `produkt` | `Id_kategorii_produktu` | `INT(11)` | `FK` | Relacja do tabeli `kategoria_produktu` |
| `klient` | `Id_klienta` | `BIGINT(20)` | `PK, AI` | Identyfikator klienta |
| `klient` | `Email` | `VARCHAR(60)` | `UNIQUE` | Identyfikator logowania |
| `klient` | `haslo` | `VARCHAR(255)` | - | Zaszyfrowany hash hasła |
| `koszyk` | `Id_koszyka` | `BIGINT(20)` | `PK, AI` | Identyfikator koszyka |
| `koszyk` | `Id_klienta` | `BIGINT(20)` | `FK` | Relacja 1:1 z klientem |
| `produkt_koszyk` | `Id_produktu`, `Id_koszyka`| `BIGINT(20)` | `COMPOSITE PK` | Asocjacja produktu z koszykiem |
| `produkt_koszyk` | `ilosc` | `MEDIUMINT(8)` | - | Liczba zamówionych sztuk/opakowań |
| `domek_narzedziowy` | `Id_domku` | `INT(11)` | `PK, AI` | Instancja skonfigurowanego domku (d. gitara) |
| `domek_narzedziowy` | `Id_scian` | `BIGINT(20)` | `FK` | Wybrany wariant ścian (kat. 101) |
| `domek_narzedziowy` | `Id_dachu` | `BIGINT(20)` | `FK` | Wybrany wariant pokrycia dachowego (kat. 102) |
| `domek_narzedziowy` | `Id_podlogi` | `BIGINT(20)` | `FK` | Wybrany wariant podłogi (kat. 103) |
| `domek_narzedziowy` | `Id_drzwi` | `BIGINT(20)` | `FK` | Wybrany model drzwi (kat. 104) |
| `domek_narzedziowy` | `Id_okna` | `BIGINT(20)` | `FK` | Wybrany moduł stolarki okiennej (kat. 105) |
| `domek_narzedziowy` | `Cena_calkowita` | `DECIMAL(10,2)`| - | Suma bazowa + suma komponentów |
| `domek_koszyk` | `Id_domku`, `Id_koszyka` | `INT/BIGINT` | `COMPOSITE PK` | Powiązanie instancji domku z koszykiem |
| `opinia` | `Id_opinii` | `BIGINT(20)` | `PK, AI` | Identyfikator recenzji |
| `opinia` | `Tresc_opinii` | `TEXT` | - | Treść opinii klienta |
| `opinia` | `Id_produktu` | `BIGINT(20)` | `FK` | Powiązany produkt budowlany |
| `opinia` | `Id_klienta` | `BIGINT(20)` | `FK` | Autor recenzji |

---

## 4. DIAGRAM STRUKTURY WIZUALNEJ LAYOUTU (ASCII)

```
+-------------------------------------------------------------------------+
| [Header] w-full fixed top-0 h-20 bg-white/90 backdrop-blur-md           |
| [Logo: 🏗️ BudMaster]         [Sklep] [Konfigurator 3D] [Koszyk] [Konto]|
+-------------------------------------------------------------------------+
|                                                                         |
|                          (Główny obszar widoku)                         |
|                                                                         |
| +-------------------------+  +----------------------------------------+ |
| |       SIDEBAR           |  |           SIATKA PRODUKTÓW             | |
| |  - Szukaj produktu      |  |                                        | |
| |  - Sortowanie (Cena)    |  |  +------------+ +------------+         | |
| |  - Kategorie:           |  |  | Produkt 1  | | Produkt 2  |         | |
| |    * Narzędzia          |  |  |  [Ikona]   | |  [Ikona]   |         | |
| |    * Elektronarzędzia   |  |  |  [Cena]    | |  [Cena]    |         | |
| |    * Materiały          |  |  | [Szczegóły]| | [Szczegóły]|         | |
| |    * Instalacje         |  |  +------------+ +------------+         | |
| |    * Farby / Lakiery    |  |                                        | |
| |    * Oświetlenie        |  |  +------------+ +------------+         | |
| |                         |  |  | Produkt 3  | | Produkt 4  |         | |
| +-------------------------+  +----------------------------------------+ |
|                                                                         |
+-------------------------------------------------------------------------+
| [Footer] bg-slate-950 text-gray-300 py-16                               |
| [O firmie BudMaster]   [Kontakt]   [Social Media]   [Informacje/Prawa]  |
+-------------------------------------------------------------------------+
```

---

## 5. MACIERZ WERYFIKACJI INŻYNIERII JAKOŚCI (WYNIKI TESTÓW)

| Plik zestawu testowego | Liczba testów | Czas wykonania | Weryfikowane reguły biznesowe |
| :--- | :--- | :--- | :--- |
| `src/__tests__/products.test.js` | 11 | 5ms | Poprawność typów, unikalność ID, integralność relacji kategorii z produktami |
| `src/__tests__/CartContext.test.jsx` | 7 | 17ms | Inkrementacja ilości, usuwanie pozycji, czyszczenie koszyka, kalkulacja sumaryczna |
| `src/__tests__/AuthContext.test.jsx` | 7 | 16ms | Rejestracja, unikalność e-mail, weryfikacja hasła, terminacja sesji |
| `src/__tests__/Header.test.jsx` | 5 | 42ms | Rendering nawigacji, warunkowe renderowanie linków sesyjnych |
| `src/__tests__/Footer.test.jsx` | 5 | 48ms | Integralność danych kontaktowych, linków i stopki |
| `src/__tests__/ProductCard.test.jsx` | 7 | 59ms | Formatowanie cen PLN, przełącznik widoku konfiguratora, obsługa selektorów |
| `src/__tests__/HomePage.test.jsx` | 6 | 92ms | Routing modułów głównych, sekcja referencji klientów |
| `src/__tests__/StorePage.test.jsx` | 8 | 427ms | Filtr tekstu w nazwach i kategoriach, sortowanie rosnąco/malejąco, resetowanie |
| `src/__tests__/ProductPage.test.jsx` | 5 | 165ms | Pobieranie parametrów URL, walidacja formularza recenzji, asercje autoryzacji |
| `src/__tests__/LoginPage.test.jsx` | 3 | 247ms | Walidacja pól formularza, reakcja na błędne poświadczenia |
| `src/__tests__/CartPage.test.jsx` | 2 | 69ms | Podgląd pustego i wypełnionego koszyka, obsługa usuwania pozycji |
| `src/__tests__/AccountPage.test.jsx` | 1 | 32ms | Personalizacja nagłówka, skróty nawigacyjne do zamówień |
| `src/__tests__/ConfiguratorPage.test.jsx` | 4 | 371ms | Zabezpieczenie przed niepełnym wyborem, aktualizacja cen live, transfer do bazy |
| `src/__tests__/EndToEndFlow.test.jsx` | 1 | 338ms | Pełna ścieżka E2E: Rejestracja -> Wyszukanie wiertarki -> Karta -> Koszyk |
| **SUMA** | **72** | **1790ms** | **Wszystkie asercje zakończone statusem: PASSED** |
