import { Navigate, Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { user } = useAuth()
  const { items, configuratorItems, removeFromCart, removeConfiguratorFromCart, totalPrice } = useCart()
  const navigate = useNavigate()

  if (!user) return <Navigate to="/login" />

  const configuratorTotal = configuratorItems.reduce((acc, c) => acc + (c.totalPrice || 0), 0)
  const grandTotal = totalPrice + configuratorTotal
  const totalItemCount = items.length + configuratorItems.length

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="pt-28 pb-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <span className="text-orange-600 font-bold uppercase text-xs tracking-wider">
              Zamówienie
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1" data-testid="cart-title">
              Twój koszyk {totalItemCount > 0 && `(${totalItemCount})`}
            </h1>
          </header>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Products & Configurations column */}
            <div className="flex-1 w-full space-y-12">
              {/* Standard Products */}
              <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100 flex items-center justify-between">
                  <span>Materiały i narzędzia</span>
                  <span className="text-sm font-normal text-gray-500">{items.length} pozycji</span>
                </h2>

                {items.length === 0 ? (
                  <div className="py-12 text-center">
                    <span className="text-5xl mb-3 block">🛒</span>
                    <h3 className="text-lg font-bold text-gray-700">Koszyk jest pusty</h3>
                    <p className="text-gray-400 text-sm mt-1">Dodaj materiały ze sklepu lub skonfiguruj domek.</p>
                    <Link
                      to="/store"
                      className="mt-6 inline-flex px-6 py-2.5 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-sm text-sm"
                    >
                      Przejdź do sklepu
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex flex-col">
                        <ProductCard product={item} quantity={item.quantity} />
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-2 w-full px-3 py-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors flex items-center justify-center gap-1"
                          data-testid={`remove-${item.id}`}
                        >
                          <span>🗑️</span>
                          <span>Usuń</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Custom Configurations */}
              <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100 flex items-center justify-between">
                  <span>Twoje konfiguracje</span>
                  <span className="text-sm font-normal text-gray-500">{configuratorItems.length} projektów</span>
                </h2>

                {configuratorItems.length === 0 ? (
                  <div className="py-8 text-center text-gray-400 text-sm">
                    <h3 className="mb-4 text-lg text-bold text-gray-700">Brak konfiguracji</h3>
                    <Link to="/configurator" className="text-orange-600 font-bold hover:underline">
                      Przejdź do konfiguratora 3D →
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {configuratorItems.map((config) => (
                      <div key={config.id} className="bg-orange-50/50 border border-orange-200 rounded-2xl p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-3xl">🏠</span>
                            <h5 className="text-xl font-bold text-gray-900">Domek narzędziowy</h5>
                          </div>
                          <ul className="space-y-1.5 text-xs text-gray-600 border-t border-orange-100 pt-3">
                            {Object.entries(config.components || {}).map(([catId, comp]) => (
                              <li key={catId} className="flex justify-between">
                                <span className="text-gray-500">{comp.name}</span>
                                <span className="font-semibold text-gray-800">{comp.price.toFixed(2)} zł</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-4 mt-4 border-t border-orange-200 flex items-baseline justify-between">
                          <span className="text-xs font-semibold text-gray-500">Wartość zestawu:</span>
                          <p className="text-xl text-orange-950 font-black">{config.totalPrice?.toFixed(2)} zł</p>
                        </div>
                        <button
                          onClick={() => removeConfiguratorFromCart(config.id)}
                          className="mt-3 w-full px-3 py-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors flex items-center justify-center gap-1"
                          data-testid={`remove-config-${config.id}`}
                        >
                          <span>🗑️</span>
                          <span>Usuń konfigurację</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Summary Aside */}
            <aside className="w-full lg:w-96 shrink-0 lg:sticky lg:top-28">
              <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-6 sm:p-8 flex flex-col gap-6">
                <header className="border-b border-gray-100 pb-4">
                  <h3 className="text-xl font-black text-gray-900">Podsumowanie</h3>
                </header>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Materiały standardowe:</span>
                    <span className="font-semibold text-gray-900">{totalPrice.toFixed(2)} zł</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Konfiguracje modułowe:</span>
                    <span className="font-semibold text-gray-900">{configuratorTotal.toFixed(2)} zł</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Dostawa paletowa:</span>
                    <span>GRATIS</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-2xl font-black text-gray-900 flex justify-between items-baseline mb-6">
                    <span className="text-base font-bold text-gray-500">Do zapłaty:</span>
                    <span>Suma: {grandTotal.toFixed(2)} zł</span>
                  </h4>

                  <button
                    onClick={() => navigate('/checkout')}
                    disabled={items.length === 0 && configuratorItems.length === 0}
                    className="w-full py-4 px-6 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-md hover:shadow-orange-600/30 transition-all text-base"
                    data-testid="go-to-checkout"
                  >
                    Przejdź do kasy
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
