import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { products, categories, reviews as defaultReviews } from '../data/products'

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))
  const { addToCart } = useCart()
  const { user } = useAuth()
  const [count, setCount] = useState(1)
  const [reviewText, setReviewText] = useState('')
  const [localReviews, setLocalReviews] = useState(
    defaultReviews.filter((r) => r.productId === Number(id))
  )
  const [status, setStatus] = useState('')

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center pt-32">
          <span className="text-6xl mb-4">🔍</span>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Produkt nie znaleziony.</h2>
          <p className="text-gray-500 mb-6">Podany produkt nie istnieje lub został wycofany z oferty.</p>
          <Link to="/store" className="px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700">
            Wróć do sklepu
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const category = categories.find((c) => c.id === product.categoryId)
  const relatedProducts = products.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  )

  const handleAddToCart = () => {
    if (!user) {
      setStatus('Zaloguj się, aby dodać do koszyka')
      return
    }
    addToCart(product, count)
    setStatus('Dodano do koszyka!')
  }

  const handleReview = (e) => {
    e.preventDefault()
    if (!user) {
      setStatus('Zaloguj się, aby napisać opinię')
      return
    }
    if (!reviewText.trim()) {
      setStatus('Napisz treść opinii')
      return
    }
    setLocalReviews((prev) => [
      ...prev,
      { id: Date.now(), content: reviewText, productId: product.id, clientName: user.name },
    ])
    setReviewText('')
    setStatus('')
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="pt-28 pb-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-orange-600">Główna</Link>
            <span>/</span>
            <Link to="/store" className="hover:text-orange-600">Sklep</Link>
            <span>/</span>
            <Link to={`/store?category=${product.categoryId}`} className="hover:text-orange-600">
              {category?.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Szczegóły</span>
          </nav>

          {/* Product Hero Grid */}
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual Column */}
            <div className="aspect-square bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100 rounded-2xl border border-gray-200/80 flex flex-col items-center justify-center p-8 relative overflow-hidden">
              <span className="text-9xl drop-shadow-md select-none">🏗️</span>
              <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1 bg-white/90 rounded-full text-gray-700 shadow-sm">
                ID Produktu: #{product.id}
              </span>
              <span className="absolute bottom-4 right-4 text-xs font-semibold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Dostępny w magazynie centralnym
              </span>
            </div>

            {/* Information Column */}
            <header className="flex flex-col justify-between h-full">
              <div>
                <Link
                  to={`/store?category=${product.categoryId}`}
                  className="inline-block text-sm font-bold uppercase tracking-wider text-orange-600 hover:text-orange-700 mb-3"
                >
                  {category?.name}
                </Link>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                  {product.description}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-sm font-semibold text-gray-500">Cena jednostkowa brutto:</span>
                  <p className="text-3xl sm:text-4xl font-black text-gray-900">
                    {product.price.toFixed(2)} zł
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                  <label htmlFor="count" className="flex items-center justify-between sm:justify-start gap-3 bg-gray-100 px-4 py-3 rounded-xl border border-gray-200 font-semibold text-gray-700">
                    <span>Ilość:</span>
                    <input
                      type="number"
                      name="count"
                      id="count"
                      min="1"
                      max="10"
                      value={count}
                      onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
                      className="w-16 bg-white border border-gray-300 rounded-lg text-center font-bold text-gray-900 py-1"
                    />
                  </label>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-lg text-white bg-orange-600 hover:bg-orange-700 shadow-md hover:shadow-orange-600/30 transition-all"
                    data-testid="add-to-cart"
                  >
                    Dodaj do koszyka
                    <svg className="rtl:rotate-180 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </button>
                </div>

                {status && (
                  <div className="mt-4 p-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 text-sm font-semibold flex items-center gap-2">
                    <span>ℹ️</span> {status}
                  </div>
                )}
              </div>
            </header>
          </div>
        </div>
      </main>

      {/* Related Products Section */}
      <aside className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10 text-center sm:text-left">
            <span className="text-orange-600 font-bold uppercase text-xs tracking-wider">
              Podobny asortyment
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              Inne produkty z kategorii {category?.name}:
            </h3>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.length === 0 ? (
              <p className="text-gray-500 col-span-full py-8 text-center">
                Brak innych produktów w tej kategorii.
              </p>
            ) : (
              relatedProducts.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)
            )}
          </div>
        </div>
      </aside>

      {/* User Reviews Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-10">
            <h3 className="text-3xl font-black text-gray-900">Opinie użytkowników</h3>
            <p className="text-gray-500 text-sm mt-1">Podziel się swoją opinią o produkcie</p>
          </header>

          <form onSubmit={handleReview} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4 mb-10">
            <label htmlFor="review" className="text-lg font-bold text-gray-900">
              Napisz opinię:
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 transition-all text-gray-800"
              id="review"
              name="review"
              rows="3"
              placeholder="Opisz jakość, właściwości użytkowe, szybkość montażu..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              data-testid="review-textarea"
            />
            <button
              type="submit"
              className="self-end px-6 py-2.5 font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-all shadow-sm"
            >
              Opublikuj
            </button>
          </form>

          {/* Reviews List */}
          <div className="space-y-4">
            {localReviews.length === 0 ? (
              <p className="text-gray-400 text-center py-6">Brak opinii o tym produkcie. Bądź pierwszy!</p>
            ) : (
              localReviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900 text-base">{review.clientName}</h4>
                    <span className="text-xs text-gray-400">Zweryfikowana recenzja</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{review.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
