import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { user, logout } = useAuth()
  const { totalCount } = useCart()

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white text-xl shadow-md group-hover:scale-105 transition-transform">
              🏗️
            </span>
            <span className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-orange-600 transition-colors">
              BudMaster
            </span>
          </Link>
        </div>

        <nav className="flex items-center">
          <ul className="flex items-center gap-1 sm:gap-2 font-semibold text-gray-700 text-base">
            <li>
              <Link
                to="/store"
                className="px-4 py-2 rounded-lg hover:text-orange-600 hover:bg-orange-50 transition-colors"
              >
                Sklep
              </Link>
            </li>
            <li>
              <Link
                to="/configurator"
                className="px-4 py-2 rounded-lg hover:text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-1"
              >
                <span>Konfigurator</span>
                <span className="text-xs uppercase px-1.5 py-0.5 bg-orange-100 text-orange-700 font-bold rounded">
                  3D
                </span>
              </Link>
            </li>

            {!user ? (
              <li>
                <Link
                  to="/login"
                  className="ml-2 px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-medium shadow-sm hover:shadow transition-all"
                >
                  Logowanie / Rejestracja
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/cart"
                    className="relative px-4 py-2 rounded-lg hover:text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-2"
                  >
                    <span>Koszyk</span>
                    {totalCount > 0 && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-orange-600 text-white rounded-full">
                        {totalCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account"
                    className="px-4 py-2 rounded-lg hover:text-orange-600 hover:bg-orange-50 transition-colors"
                  >
                    {user.name}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="px-4 py-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Wyloguj
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
