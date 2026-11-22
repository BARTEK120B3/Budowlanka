import { Link } from 'react-router-dom'

const categoryIcons = {
  1: { icon: '🔨', bg: 'from-amber-100 to-orange-100', label: 'Narzędzia ręczne' },
  2: { icon: '⚡', bg: 'from-blue-100 to-indigo-100', label: 'Elektronarzędzia' },
  3: { icon: '🧱', bg: 'from-stone-100 to-amber-100', label: 'Materiały' },
  4: { icon: '🔧', bg: 'from-cyan-100 to-teal-100', label: 'Instalacje' },
  5: { icon: '🎨', bg: 'from-rose-100 to-pink-100', label: 'Farby' },
  6: { icon: '💡', bg: 'from-yellow-100 to-amber-100', label: 'Oświetlenie' },
  101: { icon: '🪵', bg: 'from-amber-100 to-yellow-100', label: 'Ściany' },
  102: { icon: '🏠', bg: 'from-slate-100 to-gray-200', label: 'Dach' },
  103: { icon: '🪵', bg: 'from-orange-100 to-amber-200', label: 'Podłoga' },
  104: { icon: '🚪', bg: 'from-stone-100 to-stone-200', label: 'Drzwi' },
  105: { icon: '🪟', bg: 'from-sky-100 to-blue-200', label: 'Okna' },
}

export default function ProductCard({ product, showAddToConfigurator, onAddToConfigurator, quantity }) {
  const mult = quantity ? `${quantity} x` : ''
  const catVisual = categoryIcons[product.categoryId] || { icon: '🏗️', bg: 'from-orange-50 to-amber-100', label: 'Budowlane' }

  return (
    <div
      className="group bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
      data-testid={`product-card-${product.id}`}
    >
      <Link
        to={`/product/${product.id}`}
        className={`h-48 w-full bg-gradient-to-br ${catVisual.bg} flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}
      >
        <span className="text-6xl drop-shadow-sm select-none">{catVisual.icon}</span>
        <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 shadow-sm">
          W magazynie
        </span>
      </Link>

      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <Link to={`/product/${product.id}`}>
            <h5 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h5>
          </Link>
          <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Dostępny od ręki
          </p>
        </div>

        <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-gray-500">Cena brutto:</span>
            <p className="text-xl text-gray-900 font-extrabold tracking-tight">
              {mult} {product.price.toFixed(2)} zł
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <Link
              to={`/product/${product.id}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 border border-transparent hover:border-orange-200 rounded-xl transition-all"
            >
              Szczegóły
              <svg className="rtl:rotate-180 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </Link>

            {showAddToConfigurator && (
              <button
                onClick={() => onAddToConfigurator(product)}
                className="flex-1 px-3 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-sm transition-all"
              >
                Dodaj do konfiguratora
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
