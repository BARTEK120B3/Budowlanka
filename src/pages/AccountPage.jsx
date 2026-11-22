import { Navigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function AccountPage() {
  const { user } = useAuth()
  const { items } = useCart()

  if (!user) return <Navigate to="/login" />

  const previewItems = items.slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="pt-28 pb-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* User Profile Header Card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black text-2xl flex items-center justify-center shadow-md">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight" data-testid="account-greeting">
                  Witaj, {user.name}
                </h1>
                <h2 className="text-base font-medium text-gray-500 mt-1">{user.email}</h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/store"
                className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold transition-all shadow-sm"
              >
                Przeglądaj sklep
              </Link>
            </div>
          </div>

          {/* Cart Preview Section */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <Link
                className="text-2xl font-black text-gray-900 hover:text-orange-600 transition-colors"
                to="/cart"
              >
                Twój koszyk
              </Link>
              <Link
                className="text-sm font-bold text-orange-600 hover:underline"
                to="/cart"
              >
                Zobacz więcej...
              </Link>
            </div>

            {previewItems.length === 0 ? (
              <div className="py-12 text-center">
                <span className="text-5xl mb-3 block">📦</span>
                <h3 className="text-lg font-bold text-gray-700">Koszyk jest pusty</h3>
                <p className="text-gray-400 text-sm mt-1">Dodaj pierwsze materiały budowlane do koszyka.</p>
                <Link
                  to="/store"
                  className="mt-6 inline-flex px-6 py-2.5 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-sm text-sm"
                >
                  Przejdź do katalogu
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {previewItems.map((item) => (
                  <ProductCard key={item.id} product={item} quantity={item.quantity} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
