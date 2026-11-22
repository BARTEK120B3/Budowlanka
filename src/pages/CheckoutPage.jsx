import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function CheckoutPage() {
  const { user } = useAuth()
  const { items, configuratorItems, totalPrice, clearCart } = useCart()

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: '',
    zip: '',
    payment: 'przelew',
  })
  const [errors, setErrors] = useState({})
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  if (!user) return <Navigate to="/login" />

  const configuratorTotal = configuratorItems.reduce((acc, c) => acc + (c.totalPrice || 0), 0)
  const grandTotal = totalPrice + configuratorTotal

  const isEmpty = items.length === 0 && configuratorItems.length === 0

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Podaj imię i nazwisko'
    if (!formData.email.trim()) newErrors.email = 'Podaj email'
    if (!formData.phone.trim()) newErrors.phone = 'Podaj numer telefonu'
    if (!formData.street.trim()) newErrors.street = 'Podaj ulicę'
    if (!formData.city.trim()) newErrors.city = 'Podaj miasto'
    if (!formData.zip.trim()) newErrors.zip = 'Podaj kod pocztowy'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    // generujemy losowy numer zamówienia
    const nr = 'BM-' + Math.floor(100000 + Math.random() * 900000)
    setOrderNumber(nr)
    setOrderPlaced(true)
    clearCart()
  }

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    // kasujemy błąd jak user zacznie pisać
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[field]
        return copy
      })
    }
  }

  // ekran po złożeniu zamówienia
  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="pt-28 pb-16 flex-1 flex items-center justify-center">
          <div className="max-w-xl mx-auto px-4 text-center">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-10 flex flex-col items-center gap-6">
              <span className="text-7xl">✅</span>
              <h1 className="text-3xl font-black text-gray-900" data-testid="order-success">
                Zamówienie złożone!
              </h1>
              <p className="text-gray-600">
                Twój numer zamówienia: <span className="font-bold text-orange-600" data-testid="order-number">{orderNumber}</span>
              </p>
              <p className="text-gray-500 text-sm">
                Na adres <strong>{formData.email}</strong> wysłaliśmy (na niby 😉) potwierdzenie zamówienia.
                Dziękujemy za zakupy w BudMaster!
              </p>
              <div className="flex gap-4 mt-4">
                <Link
                  to="/"
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-sm transition-all"
                >
                  Strona główna
                </Link>
                <Link
                  to="/store"
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
                >
                  Kontynuuj zakupy
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="pt-28 pb-16 flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <span className="text-orange-600 font-bold uppercase text-xs tracking-wider">
              Finalizacja
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1" data-testid="checkout-title">
              Podsumowanie zamówienia
            </h1>
          </header>

          {isEmpty ? (
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-10 text-center">
              <span className="text-5xl mb-3 block">🛒</span>
              <h3 className="text-lg font-bold text-gray-700">Koszyk jest pusty</h3>
              <p className="text-gray-400 text-sm mt-1">Nie masz nic do zamówienia. Wróć do sklepu.</p>
              <Link
                to="/store"
                className="mt-6 inline-flex px-6 py-2.5 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-sm text-sm"
              >
                Przejdź do sklepu
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* formularz dostawy */}
              <form onSubmit={handleSubmit} className="flex-1 w-full" data-testid="checkout-form">
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-col gap-5">
                  <h2 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-100">
                    Dane dostawy
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ch-name" className="block text-sm font-bold text-gray-700 mb-1">Imię i nazwisko:</label>
                      <input
                        id="ch-name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange('name')}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none text-sm"
                        data-testid="checkout-name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="ch-email" className="block text-sm font-bold text-gray-700 mb-1">E-mail:</label>
                      <input
                        id="ch-email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange('email')}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none text-sm"
                        data-testid="checkout-email"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="ch-phone" className="block text-sm font-bold text-gray-700 mb-1">Telefon:</label>
                    <input
                      id="ch-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange('phone')}
                      placeholder="+48 500 000 000"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none text-sm"
                      data-testid="checkout-phone"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ch-street" className="block text-sm font-bold text-gray-700 mb-1">Ulica i numer:</label>
                      <input
                        id="ch-street"
                        type="text"
                        value={formData.street}
                        onChange={handleChange('street')}
                        placeholder="Budowlana 15"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none text-sm"
                        data-testid="checkout-street"
                      />
                      {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                    </div>
                    <div>
                      <label htmlFor="ch-city" className="block text-sm font-bold text-gray-700 mb-1">Miasto:</label>
                      <input
                        id="ch-city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange('city')}
                        placeholder="Warszawa"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none text-sm"
                        data-testid="checkout-city"
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                  </div>

                  <div className="w-1/2 sm:w-1/3">
                    <label htmlFor="ch-zip" className="block text-sm font-bold text-gray-700 mb-1">Kod pocztowy:</label>
                    <input
                      id="ch-zip"
                      type="text"
                      value={formData.zip}
                      onChange={handleChange('zip')}
                      placeholder="00-001"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none text-sm"
                      data-testid="checkout-zip"
                    />
                    {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Metoda płatności:</h3>
                    <div className="flex flex-col gap-2">
                      {[
                        { value: 'przelew', label: '💳 Przelew bankowy' },
                        { value: 'blik', label: '📱 BLIK' },
                        { value: 'pobranie', label: '📦 Przy odbiorze (za pobraniem)' },
                      ].map((opt) => (
                        <label key={opt.value} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-orange-50 cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="payment"
                            value={opt.value}
                            checked={formData.payment === opt.value}
                            onChange={handleChange('payment')}
                          />
                          <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all text-base mt-2"
                    data-testid="place-order"
                  >
                    Złóż zamówienie 🛒
                  </button>
                </div>
              </form>

              {/* podsumowanie z boku */}
              <aside className="w-full lg:w-96 shrink-0 lg:sticky lg:top-28">
                <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-6 sm:p-8 flex flex-col gap-5">
                  <h3 className="text-xl font-black text-gray-900 pb-3 border-b border-gray-100">
                    Twoje zamówienie
                  </h3>

                  {items.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-gray-500">Produkty:</h4>
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-700">{item.quantity}x {item.name}</span>
                          <span className="font-semibold text-gray-900">{(item.price * item.quantity).toFixed(2)} zł</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {configuratorItems.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-gray-500">Konfiguracje:</h4>
                      {configuratorItems.map((config) => (
                        <div key={config.id} className="flex justify-between text-sm">
                          <span className="text-gray-700">🏠 Domek narzędziowy</span>
                          <span className="font-semibold text-gray-900">{config.totalPrice?.toFixed(2)} zł</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between text-sm text-emerald-600 font-medium">
                    <span>Dostawa paletowa:</span>
                    <span>GRATIS</span>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-baseline">
                      <span className="text-base font-bold text-gray-500">Razem:</span>
                      <span className="text-2xl font-black text-gray-900" data-testid="checkout-total">
                        {grandTotal.toFixed(2)} zł
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
