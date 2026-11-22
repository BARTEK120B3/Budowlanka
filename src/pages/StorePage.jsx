import { useState, useMemo } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [sorting, setSorting] = useState(null)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          categories.find((c) => c.id === p.categoryId)?.name.toLowerCase().includes(term)
      )
    }

    if (selectedCategory) {
      result = result.filter((p) => p.categoryId === selectedCategory)
    }

    if (sorting === 'ASC') {
      result.sort((a, b) => a.price - b.price)
    } else if (sorting === 'DESC') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [searchTerm, selectedCategory, sorting])

  const handleClear = () => {
    setSearchTerm('')
    setSelectedCategory(null)
    setSorting(null)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Modern Banner */}
      <header className="pt-28 pb-12 bg-gradient-to-r from-slate-900 via-slate-800 to-orange-950 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">
                Katalog materiałów i narzędzi
              </span>
              <h1 id="searchResult" className="text-4xl sm:text-5xl font-black tracking-tight mt-1">
                Sklep
              </h1>
              <p className="text-gray-400 mt-2 text-base max-w-xl">
                Wybieraj spośród tysięcy certyfikowanych produktów od sprawdzonych producentów.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-white/10 rounded-xl text-sm font-semibold border border-white/10">
                Znaleziono: {filteredProducts.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
            {/* Search Input Box */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                Szukaj produktu
              </label>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-2 rounded-xl border border-gray-300 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200 overflow-hidden px-3 py-2 bg-gray-50 transition-all"
              >
                <input
                  type="text"
                  placeholder="Szukaj produktów"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-800 text-sm placeholder:text-gray-400"
                  data-testid="search-input"
                />
                <button type="submit" className="text-gray-400 hover:text-orange-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-current">
                    <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Sorting Section */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <header className="mb-4">
                <h2 className="text-lg font-bold text-gray-900">Sortowanie</h2>
              </header>
              <ul className="flex flex-col gap-1.5">
                <li>
                  <button
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      sorting === 'ASC'
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                    onClick={() => setSorting('ASC')}
                  >
                    Cena - od najniższej
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      sorting === 'DESC'
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                    onClick={() => setSorting('DESC')}
                  >
                    Cena - od najwyższej
                  </button>
                </li>
              </ul>
            </div>

            {/* Categories Section */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <header className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Kategorie</h2>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-xs text-orange-600 hover:underline font-semibold"
                  >
                    Wszystkie
                  </button>
                )}
              </header>
              <ul className="flex flex-col gap-1">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id
                  return (
                    <li key={cat.id}>
                      <button
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-orange-600 text-white shadow-sm'
                            : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                        }`}
                        onClick={() => setSelectedCategory(cat.id)}
                      >
                        <span>{cat.name}</span>
                        <span className={`text-xs ${isSelected ? 'text-orange-200' : 'text-gray-400'}`}>
                          →
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="flex-1">
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Produkty
              </h2>

              <div className="flex items-center gap-3">
                {(searchTerm || selectedCategory || sorting) && (
                  <button
                    onClick={handleClear}
                    className="text-sm px-4 py-2 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-800 font-semibold transition-colors"
                  >
                    Wyczyść
                  </button>
                )}
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" id="products">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-gray-200 p-8">
                  <span className="text-6xl mb-4 block">🔍</span>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Nic nie znaleziono
                  </h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto">
                    Nie ma produktów pasujących do wybranego filtra lub frazy wyszukiwania. Spróbuj zmienić parametry.
                  </p>
                  <button
                    onClick={handleClear}
                    className="mt-6 px-6 py-2.5 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-sm"
                  >
                    Wyczyść filtry
                  </button>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
