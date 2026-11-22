import { Link } from 'react-router-dom'
import { categoryIcons } from '../data/products'

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

          {showAddToConfigurator ? (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onAddToConfigurator(product)}
                className="w-full py-2.5 px-3 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 active:scale-[0.99] rounded-xl shadow-sm transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>➕</span>
                <span>Dodaj do konfiguratora</span>
              </button>
              <Link
                to={`/product/${product.id}`}
                className="w-full inline-flex items-center justify-center gap-1 py-1.5 text-xs font-semibold text-gray-500 hover:text-orange-600 hover:bg-orange-50/50 rounded-lg transition-all"
              >
                <span>Szczegóły</span>
                <svg className="rtl:rotate-180 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Link
                to={`/product/${product.id}`}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 border border-transparent hover:border-orange-200 rounded-xl transition-all"
              >
                Szczegóły
                <svg className="rtl:rotate-180 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

