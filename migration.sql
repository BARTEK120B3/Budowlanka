-- =====================================================================
-- SKRYPT MIGRACYJNY BAZY DANYCH: SEMIQUAVER -> SKLEP_BUDOWLANY (BudMaster)
-- Dialekt: MySQL 8.x / MariaDB 10.4+
-- =====================================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `domek_koszyk`;
DROP TABLE IF EXISTS `domek_narzedziowy`;
DROP TABLE IF EXISTS `gitara_koszyk`;
DROP TABLE IF EXISTS `gitara`;
DROP TABLE IF EXISTS `produkt_koszyk`;
DROP TABLE IF EXISTS `opinia`;
DROP TABLE IF EXISTS `stan_magazynu`;
DROP TABLE IF EXISTS `zamowienie`;
DROP TABLE IF EXISTS `koszyk`;
DROP TABLE IF EXISTS `klient`;
DROP TABLE IF EXISTS `produkt`;
DROP TABLE IF EXISTS `kategoria_produktu`;
DROP TABLE IF EXISTS `magazyn`;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. KATEGORIE PRODUKTÓW BUDOWLANYCH
CREATE TABLE `kategoria_produktu` (
  `Id_kategorii_produktu` int(11) NOT NULL AUTO_INCREMENT,
  `Nazwa_kategorii_produktu` varchar(60) NOT NULL,
  `Opis_kategorii_produktu` text DEFAULT NULL,
  PRIMARY KEY (`Id_kategorii_produktu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `kategoria_produktu` (`Id_kategorii_produktu`, `Nazwa_kategorii_produktu`, `Opis_kategorii_produktu`) VALUES
(1, 'Narzędzia ręczne', 'Młotki, śrubokręty, klucze, piły ręczne'),
(2, 'Elektronarzędzia', 'Wiertarki, szlifierki, pilarki elektryczne'),
(3, 'Materiały budowlane', 'Cement, kleje, zaprawy, gipsy'),
(4, 'Instalacje', 'Rury, kształtki, zawory, przewody elektryczne'),
(5, 'Farby i lakiery', 'Farby ścienne, lakiery, impregnaty do drewna'),
(6, 'Oświetlenie', 'Żarówki, lampy, oprawy i panele LED'),
(101, 'Konfigurator - Ściany', 'Deski elewacyjne, płyty OSB, blachy ścienne'),
(102, 'Konfigurator - Dach', 'Blachodachówki modułowe, gonty bitumiczne'),
(103, 'Konfigurator - Podłoga', 'Deski kompozytowe, płyty betonowe podłogowe'),
(104, 'Konfigurator - Drzwi', 'Drzwi drewniane pełne i przeszklone'),
(105, 'Konfigurator - Okna', 'Okna PCV uchylne i stałe');

-- 2. PRODUKTY BUDOWLANE
CREATE TABLE `produkt` (
  `Id_produktu` bigint(20) NOT NULL AUTO_INCREMENT,
  `Nazwa_produktu` varchar(100) NOT NULL,
  `Opis_produktu` text DEFAULT NULL,
  `Cena_jednostkowa` decimal(8,2) NOT NULL,
  `Zdjecie_produktu` varchar(100) NOT NULL,
  `Id_kategorii_produktu` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_produktu`),
  KEY `Id_kategorii_produktu` (`Id_kategorii_produktu`),
  CONSTRAINT `fk_produkt_kategoria` FOREIGN KEY (`Id_kategorii_produktu`) REFERENCES `kategoria_produktu` (`Id_kategorii_produktu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `produkt` (`Id_produktu`, `Nazwa_produktu`, `Opis_produktu`, `Cena_jednostkowa`, `Zdjecie_produktu`, `Id_kategorii_produktu`) VALUES
(1, 'Młotek ślusarski 500g', 'Młotek ślusarski z trzonkiem z włókna szklanego. Waga 500g.', 45.99, '/img/mlotek.jpg', 1),
(2, 'Wiertarko-wkrętarka Bosch 18V', 'Akumulatorowa wiertarko-wkrętarka 18V z 2 akumulatorami 2.0Ah.', 549.00, '/img/wiertarka.jpg', 2),
(3, 'Cement portlandzki CEM I 42,5R 25kg', 'Cement portlandzki do betonu i zapraw murarskich.', 22.50, '/img/cement.jpg', 3),
(4, 'Rura PVC-U kanalizacyjna fi110 2m', 'Rura kanalizacyjna PVC-U fi110mm, długość 2m.', 18.90, '/img/rura.jpg', 4),
(5, 'Farba lateksowa biała 10L', 'Farba lateksowa do ścian i sufitów, kolor biały mat.', 129.99, '/img/farba.jpg', 5),
(6, 'Panel LED 60x60 40W 4000K', 'Panel LED natynkowy/podtynkowy 40W neutralna biel.', 89.00, '/img/panel_led.jpg', 6),
(7, 'Szlifierka kątowa 125mm 1200W', 'Szlifierka kątowa 125mm, 11000 obr/min, blokada wrzeciona.', 299.00, '/img/szlifierka.jpg', 2),
(8, 'Klej do płytek elastyczny C2TE 25kg', 'Klej cementowy odkształcalny do gresu i ceramiki.', 54.90, '/img/klej.jpg', 3),
(9, 'Zestaw kluczy nasadowych 1/2" 24szt', 'Walizka narzędziowa stal chromowo-wanadowa CrV.', 189.00, '/img/klucze_nasadowe.jpg', 1),
(10, 'Pilarka tarczowa 1400W 185mm', 'Pilarka tarczowa ręczna z prowadnicą równoległą.', 419.00, '/img/pilarka.jpg', 2),
(11, 'Zaprawa tynkarska c-w 25kg', 'Zaprawa tynkarska cementowo-wapienna wewnętrzna/zewnętrzna.', 15.90, '/img/zaprawa.jpg', 3),
(12, 'Żarówka LED E27 10W 3000K', 'Ciepłe światło LED 1055 lumenów, gwint E27.', 8.99, '/img/zarowka.jpg', 6),
(13, 'Impregnat do drewna orzech 5L', 'Ochronno-dekoracyjna powłoka powstrzymująca wilgoć i UV.', 79.00, '/img/impregnat.jpg', 5),
(14, 'Rura miedziana fi18 1m', 'Twarda rura miedziana do wody pitnej i centralnego ogrzewania.', 32.50, '/img/rura_miedziana.jpg', 4),
(15, 'Wkrętak krzyżowy PH2x150mm', 'Magnetyczna końcówka ze stali S2.', 24.90, '/img/wkretak.jpg', 1),
(16, 'Lakier akrylowy satyna 0.75L', 'Bezbarwny lakier wodorozcieńczalny do boazerii.', 39.90, '/img/lakier.jpg', 5),
(17, 'Przewód YDYp 3x2.5 100m', 'Miedziany przewód podtynkowy 450/750V.', 289.00, '/img/przewod.jpg', 4),
(18, 'Poziomnica laserowa krzyżowa', 'Zielony laser samopoziomujący ze statywem 1.2m.', 349.00, '/img/poziomnica.jpg', 1),
(19, 'Gips szpachlowy 20kg', 'Biały gips do bezpyłowego szpachlowania ścian.', 29.90, '/img/gips.jpg', 3),
(20, 'Plafon LED 24W IP44 sensor', 'Wodoodporna oprawa z czujnikiem zmierzchowo-ruchowym.', 109.00, '/img/plafon.jpg', 6),
-- Produkty konfiguratora domku (101-105)
(201, 'Deska elewacyjna sosnowa', 'Element ścienny sosna impregnowana', 850.00, '/img/deska_sosnowa.jpg', 101),
(202, 'Panel OSB 18mm', 'Płyta OSB-3 konstrukcyjna', 620.00, '/img/osb.jpg', 101),
(203, 'Blacha trapezowa T18', 'Ocynkowana powlekana blacha ścienna', 480.00, '/img/blacha_sciana.jpg', 101),
(204, 'Blachodachówka modułowa', 'Stalowa dachówka antracyt mat', 1200.00, '/img/blachodachowka.jpg', 102),
(205, 'Gont bitumiczny', 'Gont karpiówka czerwona', 750.00, '/img/gont.jpg', 102),
(206, 'Deska tarasowa kompozytowa', 'Ryflowany profil WPC ciemny brąz', 980.00, '/img/deska_tarasowa.jpg', 103),
(207, 'Płyta betonowa 50x50', 'Płyta chodnikowa gładka szara', 350.00, '/img/plyta_betonowa.jpg', 103),
(208, 'Drzwi drewniane pełne', 'Skrzydło sosnowe z zamkiem i zawiasami', 650.00, '/img/drzwi.jpg', 104),
(209, 'Drzwi z przeszkleniem', 'Skrzydło z szybą zespoloną', 820.00, '/img/drzwi_okienko.jpg', 104),
(210, 'Okno uchylne PCV 60x80', 'Jednoszybowe okno gospodarcze', 320.00, '/img/okno.jpg', 105),
(211, 'Okno stałe PCV 100x60', 'Doświetle stałe nieotwierane', 280.00, '/img/okno_stale.jpg', 105);

-- 3. KLIENCI
CREATE TABLE `klient` (
  `Id_klienta` bigint(20) NOT NULL AUTO_INCREMENT,
  `Nazwisko` varchar(50) NOT NULL,
  `Imie` varchar(50) NOT NULL,
  `Nr_telefonu` varchar(24) NOT NULL,
  `Email` varchar(60) NOT NULL UNIQUE,
  `Miasto` varchar(50) NOT NULL,
  `Ulica` varchar(50) NOT NULL,
  `Wiek` int(3) DEFAULT NULL,
  `Plec` enum('K','M') DEFAULT NULL,
  `haslo` varchar(255) NOT NULL,
  PRIMARY KEY (`Id_klienta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `klient` (`Id_klienta`, `Nazwisko`, `Imie`, `Nr_telefonu`, `Email`, `Miasto`, `Ulica`, `Wiek`, `Plec`, `haslo`) VALUES
(1, 'Kowalski', 'Jan', '501234567', 'jan.kowalski@budowlaniec.pl', 'Warszawa', 'Targowa 12', 38, 'M', '$2y$10$Y5sfri6D1j24YLQaZPA7QuHe2COz7FWxQcsNvOQVPCwmAzdiZPAMS'),
(2, 'Nowak', 'Anna', '602345678', 'anna.nowak@architekt.pl', 'Kraków', 'Floriańska 5', 31, 'K', '$2y$10$OyNPuDkSzKLqLjR1sYIVTe5QDRfMqXab4LF5AUHDiJIZesP9rc.sG');

-- 4. KOSZYK
CREATE TABLE `koszyk` (
  `Id_koszyka` bigint(20) NOT NULL AUTO_INCREMENT,
  `Id_klienta` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`Id_koszyka`),
  KEY `Id_klienta` (`Id_klienta`),
  CONSTRAINT `fk_koszyk_klient` FOREIGN KEY (`Id_klienta`) REFERENCES `klient` (`Id_klienta`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `koszyk` (`Id_koszyka`, `Id_klienta`) VALUES
(1, 1),
(2, 2);

-- 5. POZYCJE KOSZYKA (PRODUKTY STANDARDOWE)
CREATE TABLE `produkt_koszyk` (
  `Id_produktu` bigint(20) NOT NULL,
  `Id_koszyka` bigint(20) NOT NULL,
  `ilosc` mediumint(8) UNSIGNED NOT NULL,
  PRIMARY KEY (`Id_produktu`, `Id_koszyka`),
  KEY `Id_koszyka` (`Id_koszyka`),
  CONSTRAINT `fk_pk_produkt` FOREIGN KEY (`Id_produktu`) REFERENCES `produkt` (`Id_produktu`),
  CONSTRAINT `fk_pk_koszyk` FOREIGN KEY (`Id_koszyka`) REFERENCES `koszyk` (`Id_koszyka`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `produkt_koszyk` (`Id_produktu`, `Id_koszyka`, `ilosc`) VALUES
(1, 1, 2),
(2, 1, 1),
(3, 2, 10);

-- 6. KONFIGURATOR DOMEK NARZĘDZIOWY (REPREZENTANT DOMENY ZAMIAST 'GITARA')
CREATE TABLE `domek_narzedziowy` (
  `Id_domku` int(11) NOT NULL AUTO_INCREMENT,
  `Cena_calkowita` decimal(10,2) NOT NULL,
  `Id_scian` bigint(20) NOT NULL,
  `Id_dachu` bigint(20) NOT NULL,
  `Id_podlogi` bigint(20) NOT NULL,
  `Id_drzwi` bigint(20) NOT NULL,
  `Id_okna` bigint(20) NOT NULL,
  `Id_klienta` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`Id_domku`),
  KEY `Id_scian` (`Id_scian`),
  KEY `Id_dachu` (`Id_dachu`),
  KEY `Id_podlogi` (`Id_podlogi`),
  KEY `Id_drzwi` (`Id_drzwi`),
  KEY `Id_okna` (`Id_okna`),
  KEY `Id_klienta` (`Id_klienta`),
  CONSTRAINT `fk_domek_sciany` FOREIGN KEY (`Id_scian`) REFERENCES `produkt` (`Id_produktu`),
  CONSTRAINT `fk_domek_dach` FOREIGN KEY (`Id_dachu`) REFERENCES `produkt` (`Id_produktu`),
  CONSTRAINT `fk_domek_podloga` FOREIGN KEY (`Id_podlogi`) REFERENCES `produkt` (`Id_produktu`),
  CONSTRAINT `fk_domek_drzwi` FOREIGN KEY (`Id_drzwi`) REFERENCES `produkt` (`Id_produktu`),
  CONSTRAINT `fk_domek_okna` FOREIGN KEY (`Id_okna`) REFERENCES `produkt` (`Id_produktu`),
  CONSTRAINT `fk_domek_klient` FOREIGN KEY (`Id_klienta`) REFERENCES `klient` (`Id_klienta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 7. KOSZYK KONFIGURATORA
CREATE TABLE `domek_koszyk` (
  `Id_domku` int(11) NOT NULL,
  `Id_koszyka` bigint(20) NOT NULL,
  `Ilosc` mediumint(8) UNSIGNED NOT NULL,
  PRIMARY KEY (`Id_domku`, `Id_koszyka`),
  CONSTRAINT `fk_dk_domek` FOREIGN KEY (`Id_domku`) REFERENCES `domek_narzedziowy` (`Id_domku`) ON DELETE CASCADE,
  CONSTRAINT `fk_dk_koszyk` FOREIGN KEY (`Id_koszyka`) REFERENCES `koszyk` (`Id_koszyka`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 8. OPINIE
CREATE TABLE `opinia` (
  `Id_opinii` bigint(20) NOT NULL AUTO_INCREMENT,
  `Tresc_opinii` text NOT NULL,
  `Id_produktu` bigint(20) NOT NULL,
  `Id_klienta` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`Id_opinii`),
  KEY `Id_produktu` (`Id_produktu`),
  KEY `Id_klienta` (`Id_klienta`),
  CONSTRAINT `fk_opinia_produkt` FOREIGN KEY (`Id_produktu`) REFERENCES `produkt` (`Id_produktu`),
  CONSTRAINT `fk_opinia_klient` FOREIGN KEY (`Id_klienta`) REFERENCES `klient` (`Id_klienta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `opinia` (`Id_opinii`, `Tresc_opinii`, `Id_produktu`, `Id_klienta`) VALUES
(1, 'Świetny młotek, dobrze leży w dłoni. Wygodny trzonek.', 1, 1),
(2, 'Wkrętarka lekka, akumulator ładuje się w 45 minut.', 2, 2);

-- 9. ZAMÓWIENIA
CREATE TABLE `zamowienie` (
  `Id_zamowienia` bigint(20) NOT NULL AUTO_INCREMENT,
  `Id_klienta` bigint(20) NOT NULL,
  `Data_zlozenia` datetime NOT NULL DEFAULT current_timestamp(),
  `Data_zakonczenia` datetime DEFAULT NULL,
  `Id_koszyka` bigint(20) NOT NULL,
  `Cena_calkowita` decimal(10,2) NOT NULL,
  `Status` enum('Przyjete','Oplacone','W_trakcie','Wykonane','Anulowane') DEFAULT 'Przyjete',
  PRIMARY KEY (`Id_zamowienia`),
  KEY `Id_klienta` (`Id_klienta`),
  KEY `Id_koszyka` (`Id_koszyka`),
  CONSTRAINT `fk_zamowienie_klient` FOREIGN KEY (`Id_klienta`) REFERENCES `klient` (`Id_klienta`),
  CONSTRAINT `fk_zamowienie_koszyk` FOREIGN KEY (`Id_koszyka`) REFERENCES `koszyk` (`Id_koszyka`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
