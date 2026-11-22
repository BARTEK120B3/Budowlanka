import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { configuratorCategories, configuratorProducts } from '../data/products'

export default function ConfiguratorPage() {
  const { addConfiguratorToCart } = useCart()
  const { user } = useAuth()
  const [selectedComponents, setSelectedComponents] = useState({})
  const [status, setStatus] = useState('')

  const handleAdd = (product) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [product.categoryId]: product,
    }))
  }

  const handleRemove = (categoryId) => {
    setSelectedComponents((prev) => {
      const updated = { ...prev }
      delete updated[categoryId]
      return updated
    })
  }

  const basePrice = 2000
  const componentsPrice = Object.values(selectedComponents).reduce((sum, p) => sum + p.price, 0)
  const totalPrice = basePrice + componentsPrice

  const handleSave = () => {
    if (!user) {
      setStatus('Zaloguj się, aby zapisać konfigurację')
      return
    }
    const requiredCount = configuratorCategories.length
    if (Object.keys(selectedComponents).length < requiredCount) {
      setStatus('Wybierz wszystkie komponenty przed zapisaniem!')
      return
    }
    addConfiguratorToCart({
      components: selectedComponents,
      totalPrice,
    })
    setSelectedComponents({})
    setStatus('Konfiguracja zapisana i dodana do koszyka!')
  }

  const selectedCount = Object.keys(selectedComponents).length

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero Header */}
      <header className="pt-28 pb-12 bg-gradient-to-r from-slate-900 via-stone-900 to-orange-950 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">
                Projektant modułowy
              </span>
              <h1 id="searchResult" className="text-4xl sm:text-5xl font-black tracking-tight mt-1">
                Konfigurator domku
              </h1>
              <p className="text-gray-400 mt-2 text-base max-w-2xl">
                Wybierz materiały konstrukcyjne, pokrycie dachowe i stolarkę. Cena bazowa konstrukcji szkieletowej: 2 000.00 zł.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-2xl backdrop-blur-sm border border-white/10">
              <span className="text-sm text-gray-300">Etap konfiguracji:</span>
              <span className="text-lg font-black text-orange-400">
                {selectedCount} / {configuratorCategories.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main selection area */}
          <main className="flex-1 w-full" id="creator">
            {status && (
              <div className={`p-4 rounded-2xl font-bold mb-8 text-center text-sm flex items-center justify-center gap-2 ${
                status.includes('zapisana')
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-orange-500 text-white shadow-sm'
              }`}>
                <span>🔔</span>
                <span>{status}</span>
              </div>
            )}

            <div className="space-y-12">
              {configuratorCategories.map((category) => {
                const catProducts = configuratorProducts.filter((p) => p.categoryId === category.id)
                const isSelected = selectedComponents[category.id]

                return (
                  <section
                    key={category.id}
                    className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-sm"
                  >
                    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-gray-100">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                          Krok {category.id - 100} z 5
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                          {category.name}
                        </h2>
                        <p className="text-sm text-gray-500 mt-0.5">{category.description}</p>
                      </div>

                      {isSelected ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          ✓ Wybrano: {isSelected.name}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                          Wybierz element
                        </span>
                      )}
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {catProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          showAddToConfigurator
                          onAddToConfigurator={handleAdd}
                        />
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>
          </main>

          {/* Sticky Summary Aside */}
          <aside className="w-full lg:w-96 shrink-0 lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl border border-gray-200/90 shadow-lg p-6 sm:p-8 flex flex-col gap-6">
              <header className="border-b border-gray-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Podsumowanie zestawu
                </span>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight mt-1">
                  Twój domek
                </h2>
              </header>

              {/* Graphic Shed Representation */}
              <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 border border-orange-200/60 p-4 flex flex-col items-center justify-center relative overflow-hidden">
                <span className="text-7xl drop-shadow-sm">🏠</span>
                <span className="mt-2 text-xs font-bold text-gray-600 bg-white/80 px-2.5 py-1 rounded-full shadow-sm">
                  {selectedCount === 5 ? 'Zestaw gotowy do montażu' : `Wybrano ${selectedCount} z 5 elementów`}
                </span>
              </div>

              <div>
                <h5 className="font-bold text-base text-gray-900 mb-3">Twój domek narzędziowy</h5>
                <ul className="divide-y divide-gray-100 text-sm">
                  <li className="py-2.5 flex justify-between text-gray-600">
                    <span>Konstrukcja bazowa (szkielet)</span>
                    <span className="font-semibold text-gray-900">2000.00 zł</span>
                  </li>
                  {Object.entries(selectedComponents).map(([catId, product]) => (
                    <li key={catId} className="py-2.5 flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">
                          {product.name} — {product.price.toFixed(2)} zł
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemove(Number(catId))}
                        className="text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md transition-colors"
                      >
                        Usuń
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200 flex flex-col gap-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-gray-500">Cena całkowita:</span>
                  <p className="text-2xl font-black text-gray-900">
                    Razem: {totalPrice.toFixed(2)} zł
                  </p>
                </div>

                <button
                  onClick={handleSave}
                  className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md hover:shadow-emerald-600/30 transition-all text-base flex items-center justify-center gap-2"
                  data-testid="save-configurator"
                >
                  <span>Zapisz i dodaj do koszyka</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}
